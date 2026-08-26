import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('[email] SMTP not configured — emails will be skipped');
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

const FROM = process.env.EMAIL_FROM || '"EcoTrove" <noreply@ecotrove.sa>';
const APP_URL = process.env.CLIENT_URL || 'https://ecotrove.sa';

async function send(options: nodemailer.SendMailOptions) {
  const t = getTransporter();
  if (!t) return;
  try {
    await t.sendMail({ from: FROM, ...options });
  } catch (err) {
    console.error('[email] send failed:', err);
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  await send({
    to,
    subject: 'Welcome to EcoTrove! 🎉',
    html: `
      <div dir="ltr" style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Welcome, ${name}!</h2>
        <p>We're thrilled to have you on EcoTrove — the professional platform for Saudi jobseekers.</p>
        <p>You can now:</p>
        <ul>
          <li>Build stunning CVs with 80+ professional templates</li>
          <li>Create a personal portfolio website</li>
          <li>Import your CV data directly into your portfolio</li>
        </ul>
        <p><a href="${APP_URL}/dashboard" style="background:#22c55e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Go to Dashboard</a></p>
        <p style="color:#888;font-size:12px;">EcoTrove · Saudi Arabia</p>
      </div>
    `,
  });
}

export async function sendPurchaseConfirmationEmail(
  to: string,
  name: string,
  orderNumber: string,
  productType: string,
  amount: number,
  currency: string,
) {
  const productLabels: Record<string, string> = {
    CV: 'CV Builder Access',
    PORTFOLIO: 'Portfolio Builder Access',
    BUNDLE: 'CV + Portfolio Bundle',
    HOSTING_RENEWAL: 'Hosting Renewal (1 Year)',
  };
  const label = productLabels[productType] || productType;

  await send({
    to,
    subject: `Order Confirmed — ${orderNumber}`,
    html: `
      <div dir="ltr" style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Thank you for your purchase, ${name}!</h2>
        <p>Your payment has been confirmed.</p>
        <table style="border-collapse:collapse;width:100%;margin:16px 0;">
          <tr style="background:#f3f4f6;">
            <td style="padding:10px;font-weight:600;">Order Number</td>
            <td style="padding:10px;">${orderNumber}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:600;">Product</td>
            <td style="padding:10px;">${label}</td>
          </tr>
          <tr style="background:#f3f4f6;">
            <td style="padding:10px;font-weight:600;">Amount Paid</td>
            <td style="padding:10px;">${amount} ${currency}</td>
          </tr>
        </table>
        <p><a href="${APP_URL}/dashboard" style="background:#22c55e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Go to Dashboard</a></p>
        <p style="color:#888;font-size:12px;">EcoTrove · Saudi Arabia</p>
      </div>
    `,
  });
}

export async function sendHostingExpiryWarningEmail(
  to: string,
  name: string,
  portfolioTitle: string,
  expiryDate: Date,
  portfolioId: string,
) {
  const formatted = expiryDate.toLocaleDateString('en-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  await send({
    to,
    subject: `Your portfolio hosting expires on ${formatted}`,
    html: `
      <div dir="ltr" style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Hosting Renewal Reminder</h2>
        <p>Hi ${name},</p>
        <p>Your portfolio "<strong>${portfolioTitle}</strong>" hosting subscription will expire on <strong>${formatted}</strong>.</p>
        <p>Renew now to keep your portfolio online and avoid any downtime.</p>
        <p><a href="${APP_URL}/dashboard/portfolios" style="background:#f59e0b;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Renew Hosting</a></p>
        <p style="color:#888;font-size:12px;">Portfolio ID: ${portfolioId}</p>
        <p style="color:#888;font-size:12px;">EcoTrove · Saudi Arabia</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${resetToken}`;

  await send({
    to,
    subject: 'Reset your EcoTrove password',
    html: `
      <div dir="ltr" style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Password Reset</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to choose a new one.</p>
        <p><a href="${resetUrl}" style="background:#3b82f6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Reset Password</a></p>
        <p>This link expires in 1 hour. If you didn't request a reset, you can safely ignore this email.</p>
        <p style="color:#888;font-size:12px;">EcoTrove · Saudi Arabia</p>
      </div>
    `,
  });
}

export async function sendEmailVerificationEmail(to: string, name: string, token: string) {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  await send({
    to,
    subject: 'Verify your EcoTrove email address',
    html: `
      <div dir="ltr" style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2>Verify your email</h2>
        <p>Hi ${name},</p>
        <p>Please verify your email address to activate your account.</p>
        <p><a href="${verifyUrl}" style="background:#22c55e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">Verify Email</a></p>
        <p>If you didn't create an account, you can ignore this email.</p>
        <p style="color:#888;font-size:12px;">EcoTrove · Saudi Arabia</p>
      </div>
    `,
  });
}
