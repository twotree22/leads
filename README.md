# Leads

A Next.js App Router landing page for inbound final expense life insurance calls.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Docker

Build the image:

```bash
docker build -t leads .
```

Run the container:

```bash
docker run --rm -p 3000:3000 --name leads leads
```

To forward lead form submissions to your CRM, set `CRM_WEBHOOK_URL` before
starting the app. Without it, submissions are logged and return success.

Example:

```bash
CRM_WEBHOOK_URL=PASTE_YOUR_CRM_WEBHOOK_URL_HERE
```

## SMS Lead Alerts

To text lead submissions to your cell phone, set these environment variables
with your Twilio account values:

```bash
TWILIO_ACCOUNT_SID=PASTE_YOUR_TWILIO_ACCOUNT_SID_HERE
TWILIO_AUTH_TOKEN=PASTE_YOUR_TWILIO_AUTH_TOKEN_HERE
TWILIO_FROM_NUMBER=+15555555555
LEAD_SMS_TO=+18509779719
LEAD_CALL_TO=+18509779719
```

`LEAD_CALL_TO` is optional and falls back to `LEAD_SMS_TO`. If these are not
set, the app will still accept leads and log them.

SMS from U.S. toll-free numbers must be verified in Twilio before delivery.
Unverified toll-free messaging can be accepted by Twilio and still show as
`undelivered` with error `30032`.
