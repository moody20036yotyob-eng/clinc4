/**
 * Payment abstraction layer.
 * Switch providers by changing PAYMENT_PROVIDER env var.
 * Supported: moyasar | tap | hyperpay
 */

interface PaymentIntentInput {
  orderId: string;
  amount: number;
  currency: string;
  callbackUrl: string;
  customerEmail: string;
}

interface PaymentIntentResult {
  provider: string;
  transactionId: string;
  redirectUrl?: string;
  clientSecret?: string;
  raw: unknown;
}

interface PaymentVerifyResult {
  success: boolean;
  orderId?: string;
  transactionId?: string;
  raw: unknown;
}

export async function createPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  const provider = process.env.PAYMENT_PROVIDER || 'moyasar';

  switch (provider) {
    case 'moyasar':
      return createMoyasarPayment(input);
    case 'tap':
      return createTapPayment(input);
    case 'hyperpay':
      return createHyperPayPayment(input);
    default:
      throw new Error(`Unsupported payment provider: ${provider}`);
  }
}

export async function verifyPayment(
  body: unknown,
  headers: unknown,
): Promise<PaymentVerifyResult> {
  const provider = process.env.PAYMENT_PROVIDER || 'moyasar';

  switch (provider) {
    case 'moyasar':
      return verifyMoyasarPayment(body, headers);
    case 'tap':
      return verifyTapPayment(body, headers);
    case 'hyperpay':
      return verifyHyperPayPayment(body, headers);
    default:
      return { success: false, raw: body };
  }
}

// ─── Moyasar ─────────────────────────────────────────────────────────────────

async function createMoyasarPayment(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  const apiKey = process.env.MOYASAR_API_KEY;
  if (!apiKey) throw new Error('MOYASAR_API_KEY not configured');

  const response = await fetch('https://api.moyasar.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    },
    body: JSON.stringify({
      amount: Math.round(input.amount * 100), // Moyasar uses halalas
      currency: input.currency,
      description: `EcoTrove Order ${input.orderId}`,
      callback_url: input.callbackUrl,
      source: { type: 'creditcard' },
      metadata: { order_id: input.orderId },
    }),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Moyasar error: ${JSON.stringify(data)}`);

  return {
    provider: 'moyasar',
    transactionId: data['id'] as string,
    redirectUrl: (data['source'] as Record<string, unknown>)?.['transaction_url'] as string,
    raw: data,
  };
}

async function verifyMoyasarPayment(body: unknown, _headers: unknown): Promise<PaymentVerifyResult> {
  const payload = body as Record<string, unknown>;
  const id = payload['id'] as string;
  const apiKey = process.env.MOYASAR_API_KEY;

  if (!apiKey || !id) return { success: false, raw: body };

  const response = await fetch(`https://api.moyasar.com/v1/payments/${id}`, {
    headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}` },
  });
  const data = await response.json() as Record<string, unknown>;
  const metadata = data['metadata'] as Record<string, string> | undefined;

  return {
    success: data['status'] === 'paid',
    orderId: metadata?.['order_id'],
    transactionId: id,
    raw: data,
  };
}

// ─── Tap ─────────────────────────────────────────────────────────────────────

async function createTapPayment(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  const apiKey = process.env.TAP_API_KEY;
  if (!apiKey) throw new Error('TAP_API_KEY not configured');

  const response = await fetch('https://api.tap.company/v2/charges', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      customer: { email: input.customerEmail },
      redirect: { url: input.callbackUrl },
      metadata: { order_id: input.orderId },
    }),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Tap error: ${JSON.stringify(data)}`);

  const transaction = data['transaction'] as Record<string, string> | undefined;
  return {
    provider: 'tap',
    transactionId: data['id'] as string,
    redirectUrl: transaction?.['url'],
    raw: data,
  };
}

async function verifyTapPayment(body: unknown, _headers: unknown): Promise<PaymentVerifyResult> {
  const payload = body as Record<string, unknown>;
  const id = payload['id'] as string;
  const apiKey = process.env.TAP_API_KEY;

  if (!apiKey || !id) return { success: false, raw: body };

  const response = await fetch(`https://api.tap.company/v2/charges/${id}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await response.json() as Record<string, unknown>;
  const metadata = data['metadata'] as Record<string, string> | undefined;

  return {
    success: data['status'] === 'CAPTURED',
    orderId: metadata?.['order_id'],
    transactionId: id,
    raw: data,
  };
}

// ─── HyperPay ────────────────────────────────────────────────────────────────

async function createHyperPayPayment(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  const token = process.env.HYPERPAY_ACCESS_TOKEN;
  if (!token) throw new Error('HYPERPAY_ACCESS_TOKEN not configured');

  const params = new URLSearchParams({
    amount: input.amount.toFixed(2),
    currency: input.currency,
    paymentType: 'DB',
    merchantTransactionId: input.orderId,
  });

  const response = await fetch('https://eu-test.oppwa.com/v1/checkouts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json() as Record<string, unknown>;
  return {
    provider: 'hyperpay',
    transactionId: data['id'] as string,
    raw: data,
  };
}

async function verifyHyperPayPayment(body: unknown, _headers: unknown): Promise<PaymentVerifyResult> {
  const payload = body as Record<string, unknown>;
  const result = payload['result'] as Record<string, string> | undefined;
  const code = result?.['code'] || '';
  const success = /^(000\.000\.|000\.100\.1|000\.[36])/.test(code);

  return {
    success,
    orderId: payload['merchantTransactionId'] as string | undefined,
    transactionId: payload['id'] as string | undefined,
    raw: body,
  };
}
