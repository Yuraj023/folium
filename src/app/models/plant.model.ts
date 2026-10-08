export interface PlantItem {
  id: string;
  name: string;
  binomial: string;
  category: 'aroid' | 'architectural' | 'pet-friendly' | 'rare';
  price: number;
  originalPrice?: number;
  image: string;
  stockStatus: 'in-stock' | 'low-stock' | 'rare-batch';
  stockCount: number;
  potSize: string;
  lightRequirement: string;
  wateringSchedule: string;
  humidity: string;
  substrate: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  purificationRating?: string;
}

export interface CartItem {
  plant: PlantItem;
  quantity: number;
  selectedPotSize: string;
}

export type CategoryFilter = 'all' | 'rare' | 'aroid' | 'architectural' | 'pet-friendly';
export type SortOption = 'curated' | 'price-low' | 'price-high' | 'rating' | 'rarity';
