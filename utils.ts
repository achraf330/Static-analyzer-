import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const cryptoOptions = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "ADA", label: "Cardano (ADA)" },
  { value: "DOT", label: "Polkadot (DOT)" },
  { value: "AVAX", label: "Avalanche (AVAX)" },
  { value: "MATIC", label: "Polygon (MATIC)" },
  { value: "LINK", label: "Chainlink (LINK)" },
  { value: "XRP", label: "XRP (XRP)" },
  { value: "USDT", label: "Tether (USDT)" },
  { value: "USDC", label: "USD Coin (USDC)" },
  { value: "OTHER", label: "Other (specify)" }
];

export const timeframeOptions = [
  { value: "short", label: "Short-term (< 1 year)" },
  { value: "medium", label: "Medium-term (1-3 years)" },
  { value: "long", label: "Long-term (3-10 years)" },
  { value: "very-long", label: "Very long-term (10+ years)" }
];

export const riskAppetiteOptions = [
  { value: "conservative", label: "Conservative" },
  { value: "moderate", label: "Moderate" },
  { value: "aggressive", label: "Aggressive" },
  { value: "very-aggressive", label: "Very Aggressive" }
];

export const investmentGoalsOptions = [
  { value: "growth", label: "Long-term Growth" },
  { value: "income", label: "Regular Income" },
  { value: "preservation", label: "Capital Preservation" },
  { value: "speculation", label: "Short-term Gains" }
];

export const faqItems = [
  {
    question: "What type of analysis will I receive?",
    answer: "Our comprehensive analysis includes a detailed portfolio review, asset allocation recommendations, risk assessment, market trend analysis, and specific entry/exit strategies for each holding. The report is delivered as a PDF document to your email."
  },
  {
    question: "How long does it take to receive my analysis?",
    answer: "You will receive your analysis within 24 hours of confirmed payment. For complex portfolios or during high-demand periods, it may take up to 48 hours. We'll notify you via email when your report is ready."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-level encryption to protect your data. We never ask for private keys, passwords, or seed phrases. We only need to know what assets you hold and in what quantities to provide our analysis. All data is deleted after report delivery."
  },
  {
    question: "Why do you only accept USDT via TRC20?",
    answer: "We use TRC20 USDT for its low transaction fees and fast confirmation times. This allows us to keep our service affordable and efficient. If you have difficulties with TRC20 payments, please contact our support for alternative arrangements."
  },
  {
    question: "Can I request revisions to my analysis?",
    answer: "Yes, we offer one free revision within 7 days of receiving your initial report. If you need clarification or have additional questions about specific recommendations, we're happy to address them at no extra cost."
  }
];

export const TRON_WALLET_ADDRESS = "TBNwZnv9rU28cpJhJyw9D55kiPqE7qWdFd";
