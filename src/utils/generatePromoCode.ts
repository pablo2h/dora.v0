import { availablePromoCodes } from '@/data/promoCodes';

export function generatePromoCode(): string {
  const randomIndex = Math.floor(Math.random() * availablePromoCodes.length);
  return availablePromoCodes[randomIndex];
}