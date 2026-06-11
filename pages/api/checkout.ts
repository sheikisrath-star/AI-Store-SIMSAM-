import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { items, total, email, name } = req.body

  // In production: create Stripe PaymentIntent here
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  // const intent = await stripe.paymentIntents.create({ amount: Math.round(total * 100), currency: 'usd', receipt_email: email })

  // Log to Supabase if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (supabaseUrl && serviceKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          customer_email: email,
          customer_name: name,
          items,
          total,
          status: 'paid',
        }),
      })
    } catch {}
  }

  return res.status(200).json({ success: true, message: 'Order confirmed' })
}
