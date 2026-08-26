import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { sendHostingExpiryWarningEmail } from '../services/email';

async function sendExpiryWarnings(daysAhead: number) {
  const now = new Date();
  const from = new Date(now.getTime() + (daysAhead - 1) * 86400000);
  const to = new Date(now.getTime() + daysAhead * 86400000);

  const subscriptions = await prisma.hostingSubscription.findMany({
    where: {
      status: 'ACTIVE',
      expiryDate: { gte: from, lt: to },
    },
    include: {
      portfolio: {
        select: {
          id: true,
          title: true,
          user: { select: { email: true, name: true } },
        },
      },
    },
  });

  for (const sub of subscriptions) {
    const { portfolio } = sub;
    await sendHostingExpiryWarningEmail(
      portfolio.user.email,
      portfolio.user.name || portfolio.user.email,
      portfolio.title,
      sub.expiryDate,
      portfolio.id,
    ).catch(() => {});
  }
}

async function expireOverdueSubscriptions() {
  await prisma.hostingSubscription.updateMany({
    where: { status: 'ACTIVE', expiryDate: { lt: new Date() } },
    data: { status: 'EXPIRED' },
  });
}

export function startHostingExpiryJob() {
  // Run daily at 08:00 UTC
  cron.schedule('0 8 * * *', async () => {
    try {
      await expireOverdueSubscriptions();
      await sendExpiryWarnings(30);
      await sendExpiryWarnings(7);
      await sendExpiryWarnings(1);
    } catch (err) {
      console.error('[hosting-expiry-job] error:', err);
    }
  });
}
