import { prisma } from '../lib/prisma';

export interface PricingConfig {
  cv: number;
  portfolio: number;
  bundle: number;
  hostingRenewal: number;
  currency: string;
}

const DEFAULTS: PricingConfig = {
  cv: 119,
  portfolio: 159,
  bundle: 249,
  hostingRenewal: 79,
  currency: 'SAR',
};

export async function getPricing(): Promise<PricingConfig> {
  const settings = await prisma.setting.findMany({
    where: { key: { in: ['price_cv', 'price_portfolio', 'price_bundle', 'hosting_renewal_price', 'currency'] } },
  });

  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return {
    cv: map['price_cv'] ? parseFloat(map['price_cv']) : DEFAULTS.cv,
    portfolio: map['price_portfolio'] ? parseFloat(map['price_portfolio']) : DEFAULTS.portfolio,
    bundle: map['price_bundle'] ? parseFloat(map['price_bundle']) : DEFAULTS.bundle,
    hostingRenewal: map['hosting_renewal_price'] ? parseFloat(map['hosting_renewal_price']) : DEFAULTS.hostingRenewal,
    currency: map['currency'] || DEFAULTS.currency,
  };
}
