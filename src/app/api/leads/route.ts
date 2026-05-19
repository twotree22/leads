import { NextRequest, NextResponse } from "next/server";

type CoverageInterest =
  | "Final expense"
  | "Burial insurance"
  | "Life insurance"
  | "Not sure";

type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  age: string;
  coverageInterest: CoverageInterest;
  contactTime: string;
  consent: boolean;
};

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;
const LEAD_SMS_TO = process.env.LEAD_SMS_TO;
const LEAD_CALL_TO = process.env.LEAD_CALL_TO || LEAD_SMS_TO;

const coverageOptions: CoverageInterest[] = [
  "Final expense",
  "Burial insurance",
  "Life insurance",
  "Not sure",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCoverageInterest(value: unknown): value is CoverageInterest {
  return (
    typeof value === "string" &&
    coverageOptions.includes(value as CoverageInterest)
  );
}

function readStringField(
  payload: Record<string, unknown>,
  field: keyof Omit<LeadPayload, "coverageInterest" | "consent">,
) {
  const value = payload[field];
  return typeof value === "string" ? value.trim() : "";
}

function parseLeadPayload(payload: unknown): LeadPayload | null {
  if (!isRecord(payload)) {
    return null;
  }

  const lead: LeadPayload = {
    fullName: readStringField(payload, "fullName"),
    phone: readStringField(payload, "phone"),
    email: readStringField(payload, "email"),
    state: readStringField(payload, "state"),
    age: readStringField(payload, "age"),
    coverageInterest: isCoverageInterest(payload.coverageInterest)
      ? payload.coverageInterest
      : "Not sure",
    contactTime: readStringField(payload, "contactTime"),
    consent: payload.consent === true,
  };

  const requiredFields: Array<keyof Omit<LeadPayload, "coverageInterest" | "consent">> = [
    "fullName",
    "phone",
    "state",
    "age",
    "contactTime",
  ];

  const hasMissingField = requiredFields.some((field) => lead[field] === "");

  return hasMissingField || !lead.consent ? null : lead;
}

function hasSmsConfig() {
  return Boolean(
    TWILIO_ACCOUNT_SID &&
      TWILIO_AUTH_TOKEN &&
      TWILIO_FROM_NUMBER &&
      LEAD_SMS_TO,
  );
}

function hasCallConfig() {
  return Boolean(
    TWILIO_ACCOUNT_SID &&
      TWILIO_AUTH_TOKEN &&
      TWILIO_FROM_NUMBER &&
      LEAD_CALL_TO,
  );
}

function buildLeadSms(lead: LeadPayload) {
  return [
    "New life insurance lead",
    lead.fullName,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "Not provided"}`,
    `State: ${lead.state}`,
    `Age: ${lead.age}`,
    `Interest: ${lead.coverageInterest}`,
    `Best time: ${lead.contactTime}`,
  ].join("\n");
}

function escapeTwiml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildLeadCallTwiml(lead: LeadPayload) {
  const message = [
    "New life insurance lead.",
    `Name: ${lead.fullName}.`,
    `Phone number: ${lead.phone}.`,
    `Email: ${lead.email || "Not provided"}.`,
    `State: ${lead.state}.`,
    `Age: ${lead.age}.`,
    `Coverage interest: ${lead.coverageInterest}.`,
    `Best contact time: ${lead.contactTime}.`,
  ].join(" ");

  return `<Response><Say voice="alice">${escapeTwiml(
    message,
  )}</Say><Pause length="1"/><Say voice="alice">Please follow up as soon as possible.</Say></Response>`;
}

async function sendLeadSms(lead: LeadPayload) {
  if (!hasSmsConfig()) {
    return;
  }

  const credentials = Buffer.from(
    `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`,
  ).toString("base64");

  const body = new URLSearchParams({
    To: LEAD_SMS_TO as string,
    From: TWILIO_FROM_NUMBER as string,
    Body: buildLeadSms(lead),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Twilio SMS request failed: ${responseText}`);
  }
}

async function sendLeadCall(lead: LeadPayload) {
  if (!hasCallConfig()) {
    return;
  }

  const credentials = Buffer.from(
    `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`,
  ).toString("base64");

  const body = new URLSearchParams({
    To: LEAD_CALL_TO as string,
    From: TWILIO_FROM_NUMBER as string,
    Twiml: buildLeadCallTwiml(lead),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Calls.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Twilio call request failed: ${responseText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const lead = parseLeadPayload(payload);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Missing required lead fields." },
        { status: 400 },
      );
    }

    if (CRM_WEBHOOK_URL) {
      const response = await fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        return NextResponse.json(
          { success: false, error: "CRM webhook request failed." },
          { status: 502 },
        );
      }
    } else {
      console.log("Lead submission received:", lead);
    }

    try {
      await sendLeadSms(lead);
    } catch (error) {
      console.error("Lead SMS notification error:", error);
    }

    try {
      await sendLeadCall(lead);
    } catch (error) {
      console.error("Lead call notification error:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to process lead." },
      { status: 500 },
    );
  }
}
