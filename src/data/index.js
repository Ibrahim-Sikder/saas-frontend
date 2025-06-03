
export const subscriptionPlans = [
  {
    id: "Monthly",
    name: "Monthly Plan",
    price: "$29",
    period: "per month",
    duration: 1, // months
    features: [
      "Up to 3 users",
      "Basic inventory management",
      "Customer database",
      "Service scheduling",
      "Email support",
    ],
    recommended: false,
  },
  {
    id: "HalfYearly",
    name: "Half Yearly Plan",
    price: "$149",
    period: "per 6 months",
    duration: 6, // months
    features: [
      "Up to 10 users",
      "Advanced inventory management",
      "Customer relationship tools",
      "Service scheduling & reminders",
      "Online booking portal",
      "Priority email & phone support",
    ],
    recommended: true,
  },
  {
    id: "Yearly",
    name: "Yearly Plan",
    price: "$299",
    period: "per year",
    duration: 12, // months
    features: [
      "Unlimited users",
      "Complete inventory management",
      "Advanced analytics & reporting",
      "Customer portal & mobile app",
      "Multi-location support",
      "24/7 dedicated support",
      "Custom integrations",
    ],
    recommended: false,
  },
]