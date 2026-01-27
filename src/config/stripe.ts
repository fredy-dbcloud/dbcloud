// Stripe Product and Price Configuration
// These IDs will be updated once the user creates the products in Stripe Dashboard

export const STRIPE_PRODUCTS = {
  starter: {
    name: "Starter Consulting",
    product_id: "prod_PLACEHOLDER_STARTER", // TODO: Update with actual product ID
    monthly: {
      price_id: "price_PLACEHOLDER_STARTER_MONTHLY", // TODO: Update with actual price ID
      price: 499,
    },
    yearly: {
      price_id: "price_PLACEHOLDER_STARTER_YEARLY", // TODO: Update with actual price ID  
      price: 399, // 20% discount
    },
  },
  growth: {
    name: "Growth Consulting",
    product_id: "prod_PLACEHOLDER_GROWTH", // TODO: Update with actual product ID
    monthly: {
      price_id: "price_PLACEHOLDER_GROWTH_MONTHLY", // TODO: Update with actual price ID
      price: 1499,
    },
    yearly: {
      price_id: "price_PLACEHOLDER_GROWTH_YEARLY", // TODO: Update with actual price ID
      price: 1199, // 20% discount
    },
  },
  enterprise: {
    name: "Enterprise",
    product_id: null, // Contact sales
    monthly: {
      price_id: null,
      price: null,
    },
    yearly: {
      price_id: null,
      price: null,
    },
  },
} as const;

export type TierKey = keyof typeof STRIPE_PRODUCTS;
