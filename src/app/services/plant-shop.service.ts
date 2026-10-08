import { Injectable, signal, computed } from '@angular/core';
import { PlantItem, CartItem, CategoryFilter, SortOption } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantShopService {

  // Catalog of listed living specimens
  private readonly plants = signal<PlantItem[]>([
    {
      id: 'monstera-deliciosa',
      name: 'Monstera Deliciosa',
      binomial: 'Monstera deliciosa Liebm.',
      category: 'aroid',
      price: 84,
      originalPrice: 96,
      image: 'assets/monstera_deliciosa.jpg',
      stockStatus: 'in-stock',
      stockCount: 8,
      potSize: '8" Raw Terracotta',
      lightRequirement: 'Bright Indirect • 1,800 - 2,400 Lux',
      wateringSchedule: 'Allow top 50% soil to dry (7-10 days)',
      humidity: '65% - 85% RH',
      substrate: 'Chunky Aroid Mix (Orchid bark, pumice, charcoal)',
      rating: 4.9,
      reviewsCount: 38,
      description: 'Mature specimen with double fenestrations and natural leaf perforations. Acclimatized for interior light with established root system in organic pine bark blend.',
      badge: 'Curator’s Choice',
      purificationRating: 'High'
    },
    {
      id: 'alocasia-frydek',
      name: 'Alocasia Frydek',
      binomial: 'Alocasia micholitziana "Frydek"',
      category: 'rare',
      price: 128,
      image: 'assets/rare_alocasia.jpg',
      stockStatus: 'low-stock',
      stockCount: 3,
      potSize: '6" Matte Oat Ceramic',
      lightRequirement: 'Filtered Dappled • 1,200 - 1,800 Lux',
      wateringSchedule: 'Evenly moist, distilled or rainwater',
      humidity: '70% - 90% RH',
      substrate: 'Porous Tree Fern & Pumice Medium',
      rating: 5.0,
      reviewsCount: 22,
      description: 'Coveted Green Velvet variety featuring dark emerald matte foliage with stark, luminescent white-mint venation. Strictly hand-selected from specialized European propagation.',
      badge: 'Rare Velvet Cultivar',
      purificationRating: 'Moderate'
    },
    {
      id: 'anthurium-crystallinum',
      name: 'Anthurium Crystallinum',
      binomial: 'Anthurium crystallinum Linden & André',
      category: 'rare',
      price: 145,
      image: 'assets/anthurium_crystallinum.jpg',
      stockStatus: 'rare-batch',
      stockCount: 2,
      potSize: '7" Terracotta Planter',
      lightRequirement: 'Gentle Understory • 1,000 - 1,600 Lux',
      wateringSchedule: 'Water when top 2" dries, excellent aeration',
      humidity: '75% - 85% RH',
      substrate: 'Coarse Epiphytic Orchid Blend',
      rating: 4.95,
      reviewsCount: 17,
      description: 'Neotropical evergreen with heart-shaped velvet leaves patterned with crystalline silver-white veins that shimmer under ambient light. Potted with terracotta saucer included.',
      badge: 'Limited Harvest',
      purificationRating: 'Moderate'
    },
    {
      id: 'sansevieria-trifasciata',
      name: 'Sansevieria Trifasciata',
      binomial: 'Dracaena trifasciata "Laurentii"',
      category: 'architectural',
      price: 58,
      image: 'assets/hero_plants.jpg',
      stockStatus: 'in-stock',
      stockCount: 14,
      potSize: '8" Terracotta Pot',
      lightRequirement: 'Low to High Indirect • Adaptable',
      wateringSchedule: 'Allow soil to dry completely (14-21 days)',
      humidity: '35% - 60% RH (Ambient)',
      substrate: 'Mineral Cactus & Succulent Gravel Blend',
      rating: 4.88,
      reviewsCount: 46,
      description: 'Vertical architectural sword leaves with golden margin banding. Renowned for nocturnal CAM oxygen production and NASA Class-A air purification.',
      badge: 'Air Purifier Class A',
      purificationRating: 'Maximum (98.4%)'
    },
    {
      id: 'epipremnum-pothos',
      name: 'Trailing Golden Pothos',
      binomial: 'Epipremnum aureum',
      category: 'aroid',
      price: 42,
      image: 'assets/hero_plants.jpg',
      stockStatus: 'in-stock',
      stockCount: 19,
      potSize: '6" Hanging Terracotta Vessel',
      lightRequirement: 'Medium Indirect • 800 - 1,500 Lux',
      wateringSchedule: 'Water when top 1" dry (weekly)',
      humidity: '40% - 70% RH',
      substrate: 'Peat-Free Organic Potting Compost',
      rating: 4.92,
      reviewsCount: 64,
      description: 'Lush cascading vines with marbled chartreuse variegation. Hardy, resilient, and perfect for shelves, credenzas, and trailing botanical walls.',
      badge: 'Beginner Friendly',
      purificationRating: 'High'
    },
    {
      id: 'monstera-albo',
      name: 'Monstera Albo Borsigiana',
      binomial: 'Monstera deliciosa var. borsigiana albo',
      category: 'rare',
      price: 195,
      originalPrice: 220,
      image: 'assets/monstera_deliciosa.jpg',
      stockStatus: 'low-stock',
      stockCount: 1,
      potSize: '6" Clear Aroid Nursery Pot',
      lightRequirement: 'High Indirect • 2,000 - 3,000 Lux',
      wateringSchedule: 'Allow top 60% substrate to dry',
      humidity: '70% - 85% RH',
      substrate: 'Chunky Perlite, Coco Husk & Charcoal',
      rating: 5.0,
      reviewsCount: 11,
      description: 'Ultra-rare sectoral white variegated specimen with high genetic stability. Each leaf boasts unique marble sectoral pigmentation.',
      badge: 'Collector Holy Grail',
      purificationRating: 'High'
    },
    {
      id: 'calathea-orbifolia',
      name: 'Calathea Orbifolia',
      binomial: 'Goeppertia orbifolia',
      category: 'pet-friendly',
      price: 62,
      image: 'assets/rare_alocasia.jpg',
      stockStatus: 'in-stock',
      stockCount: 9,
      potSize: '7" Oat Glaze Ceramic',
      lightRequirement: 'Medium Filtered • 1,000 - 1,400 Lux',
      wateringSchedule: 'Keep evenly moist with distilled water',
      humidity: '65% - 80% RH',
      substrate: 'Rich Moisture-Retentive Organic Mix',
      rating: 4.84,
      reviewsCount: 29,
      description: 'Expansive round leaves adorned with graphic silver and matcha stripes. 100% non-toxic, pet-safe, and responsive to circadian leaf prayer movement.',
      badge: '100% Pet-Safe',
      purificationRating: 'Moderate'
    },
    {
      id: 'sansevieria-cylindrica',
      name: 'Sansevieria Cylindrica',
      binomial: 'Dracaena angolensis',
      category: 'architectural',
      price: 68,
      image: 'assets/hero_plants.jpg',
      stockStatus: 'in-stock',
      stockCount: 7,
      potSize: '8" Deep Terracotta Cylinder',
      lightRequirement: 'Low to Full Sun • Highly Resilient',
      wateringSchedule: 'Water monthly or when bone dry',
      humidity: '30% - 50% RH',
      substrate: 'Coarse Sand, Pumice & Terracotta Shards',
      rating: 4.9,
      reviewsCount: 19,
      description: 'Sublime geometric spear tubes offering sculptural presence in minimalist spaces. Requires virtually zero maintenance while purifying indoor air.',
      badge: 'Drought Tolerant',
      purificationRating: 'High'
    }
  ]);

  // Shopping Cart Signal
  private readonly cart = signal<CartItem[]>([]);

  // Filter & Search Signals
  readonly activeCategory = signal<CategoryFilter>('all');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<SortOption>('curated');
  readonly isCartOpen = signal<boolean>(false);
  readonly selectedPlantForModal = signal<PlantItem | null>(null);

  // Computed Cart Metrics
  readonly cartItems = computed(() => this.cart());
  readonly cartCount = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  readonly cartSubtotal = computed(() => this.cart().reduce((sum, item) => sum + (item.plant.price * item.quantity), 0));
  readonly isShippingFree = computed(() => this.cartSubtotal() >= 75);

  // Filtered and Sorted Plants Computed Signal
  readonly filteredPlants = computed(() => {
    let list = this.plants();
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();
    const sort = this.sortBy();

    // Category filter
    if (cat !== 'all') {
      list = list.filter(p => p.category === cat);
    }

    // Search query filter
    if (query) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.binomial.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'rarity':
          return (b.category === 'rare' ? 1 : 0) - (a.category === 'rare' ? 1 : 0);
        case 'curated':
        default:
          return 0;
      }
    });
  });

  // Cart Actions
  addToCart(plant: PlantItem, potSize?: string) {
    const size = potSize || plant.potSize;
    const current = this.cart();
    const existingIndex = current.findIndex(item => item.plant.id === plant.id && item.selectedPotSize === size);

    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex].quantity += 1;
      this.cart.set(updated);
    } else {
      this.cart.set([...current, { plant, quantity: 1, selectedPotSize: size }]);
    }
  }

  removeFromCart(index: number) {
    const updated = [...this.cart()];
    updated.splice(index, 1);
    this.cart.set(updated);
  }

  updateQuantity(index: number, delta: number) {
    const updated = [...this.cart()];
    const item = updated[index];
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        this.removeFromCart(index);
      } else {
        item.quantity = newQty;
        this.cart.set(updated);
      }
    }
  }

  clearCart() {
    this.cart.set([]);
  }

  toggleCart(open?: boolean) {
    if (open !== undefined) {
      this.isCartOpen.set(open);
    } else {
      this.isCartOpen.set(!this.isCartOpen());
    }
  }

  openPlantModal(plant: PlantItem) {
    this.selectedPlantForModal.set(plant);
  }

  closePlantModal() {
    this.selectedPlantForModal.set(null);
  }

  setCategory(category: CategoryFilter) {
    this.activeCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  setSortBy(sort: SortOption) {
    this.sortBy.set(sort);
  }
}
