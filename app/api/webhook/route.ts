export const dynamic = 'force-dynamic'

import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: NextApiRequest) {
  if (request.method !== "POST") {
    return new Response("Only allow POST methods", {
      status: 405,
    });
  }

  const sig = request.headers["stripe-signature"] as string;
  if (!request.body) {
    return new Response("Invalid request, body is missing", { status: 400 });
  }
  let event;

  try {
    const body = await buffer(request)
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event && event.type === "payment_intent.succeeded") {
    const paymentIntentSucceeded = event.data.object;
    console.log(paymentIntentSucceeded.receipt_email);
  }

  return new Response("Event is accepted, but no need to update anything");
}

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    })

    req.on('end', () => {
      resolve(Buffer.concat(chunks))
    })

    req.on('error', reject)
  })
}