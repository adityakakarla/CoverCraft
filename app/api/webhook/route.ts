import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { increaseUserCredits } from "@/utils/mongo/mongo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const customerEmail = checkoutSessionCompleted.customer_details?.email as string;
      try {
        await increaseUserCredits(customerEmail);
      } catch (err) {
        return new Response(`Data fetching error: ${err}`, {
          status: 400
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}