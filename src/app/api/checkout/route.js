import Stripe from "stripe";
import { products } from "@/app/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { productId } = body;

  const product = products.find((p) => p.id === productId);
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            images: [imageUrl],
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?productId=${productId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return Response.json({ url: session.url });
}
