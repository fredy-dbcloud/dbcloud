// Stripe Product and Price Configuration
// These IDs will be updated once the user creates the products in Stripe Dashboard

export const STRIPE_PRODUCTS = {
  starter: {
    name: "Starter Consulting",
    product_id: "prod_PLACEHOLDER_STARTER", // TODO: Update with actual product ID
    monthly: {
      price_id: "price_PLACEHOLDER_STARTER_MONTHLY", // TODO: Update with actual price ID
      price: 299,
    },
    yearly: {
      price_id: "price_PLACEHOLDER_STARTER_YEARLY", // TODO: Update with actual price ID  
      price: 249, // ~17% discount
    },
  },
  growth: {
    name: "Growth Consulting",
    product_id: "prod_PLACEHOLDER_GROWTH", // TODO: Update with actual product ID
    monthly: {
      price_id: "price_PLACEHOLDER_GROWTH_MONTHLY", // TODO: Update with actual price ID
      price: 899,
    },
    yearly: {
      price_id: "price_PLACEHOLDER_GROWTH_YEARLY", // TODO: Update with actual price ID
      price: 699, // ~22% discount
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
