export const dynamic = 'force-dynamic'

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret =
  "whsec_07e30f80d4d83daa8b1bd2dbdee409e55ee38c88bdc75bfb1787eca541c4ddae";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Only allow POST methods", {
      status: 405,
    });
  }

  const sig = request.headers.get("stripe-signature") as string;
  if (!request.body) {
    return new Response("Invalid request, body is missing", { status: 400 });
  }
  let event;

  try {
    const bodyBuffer = await request.arrayBuffer();
    const bodyString = Buffer.from(bodyBuffer).toString('utf8');
    event = stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event && event.type === "payment_intent.succeeded") {
    const paymentIntentSucceeded = event.data.object;
    console.log(paymentIntentSucceeded.receipt_email);
  }

  return new Response("Event is accepted, but no need to update anything");
}
