import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlantShopService } from './services/plant-shop.service';
import { PlantItem, CategoryFilter } from './models/plant.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly shopService = inject(PlantShopService);

  // Component local state
  readonly isCheckoutSuccessModalOpen = signal<boolean>(false);
  readonly selectedPotSizeInModal = signal<string>('8" Raw Terracotta');

  // Direct Image Upload State
  readonly isDragging = signal<boolean>(false);
  readonly isScanning = signal<boolean>(false);
  readonly isBrowseLoading = signal<boolean>(false);
  readonly uploadedImageSrc = signal<string | null>(null);
  readonly diagnosedSpecies = signal<string>('Monstera Deliciosa (Liebm.)');
  readonly fenestrationHealth = signal<number>(96.4);
  readonly hydrationIndex = signal<number>(88.1);

  // Toast Notification State
  readonly toastMessage = signal<string>('');
  readonly isToastVisible = signal<boolean>(false);
  private toastTimer: any = null;

  // Filter Categories
  readonly categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Plants' },
    { id: 'rare', label: 'Rare Cultivars' },
    { id: 'aroid', label: 'Aroids & Vines' },
    { id: 'architectural', label: 'Architectural' },
    { id: 'pet-friendly', label: 'Pet-Friendly' }
  ];

  // Pot size options for modal
  readonly potOptions: string[] = [
    '6" Studio Pot',
    '8" Raw Terracotta Planter',
    '10" Architectural Vessel'
  ];

  // Helper methods
  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    this.isToastVisible.set(true);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.isToastVisible.set(false);
    }, 2800);
  }

  // Cart operations
  handleAddToCart(plant: PlantItem, potSize?: string) {
    this.shopService.addToCart(plant, potSize);
    this.showToast(`🌿 Added "${plant.name}" to your cart`);
  }

  handleOpenPlantModal(plant: PlantItem) {
    this.selectedPotSizeInModal.set(plant.potSize);
    this.shopService.openPlantModal(plant);
  }

  handleModalAddToCart() {
    const plant = this.shopService.selectedPlantForModal();
    if (plant) {
      this.shopService.addToCart(plant, this.selectedPotSizeInModal());
      this.showToast(`🌿 Added "${plant.name}" (${this.selectedPotSizeInModal()}) to cart`);
      this.shopService.closePlantModal();
    }
  }

  // Upload & Drag-and-Drop operations
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  triggerBrowse(fileInput: HTMLInputElement) {
    this.isBrowseLoading.set(true);
    setTimeout(() => {
      this.isBrowseLoading.set(false);
      fileInput.click();
    }, 300);
  }

  processFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.showToast('Please upload a valid plant photo (JPEG, PNG, RAW, TIFF)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      this.runSpecimenScan(src, file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  }

  triggerSampleScan(sampleSrc: string, sampleName: string) {
    this.runSpecimenScan(sampleSrc, sampleName);
  }

  runSpecimenScan(imgSrc: string, name: string) {
    this.uploadedImageSrc.set(imgSrc);
    this.diagnosedSpecies.set(name);
    this.isScanning.set(true);
    this.showToast(`Specimen intake initiated: ${name}`);

    const fenHealth = +(94 + Math.random() * 5).toFixed(1);
    const hydIndex = +(85 + Math.random() * 10).toFixed(1);
    this.fenestrationHealth.set(fenHealth);
    this.hydrationIndex.set(hydIndex);
  }

  resetUpload() {
    this.uploadedImageSrc.set(null);
    this.isScanning.set(false);
  }

  addDiagnosedPlantToShop() {
    const plants = this.shopService.filteredPlants();
    const matched = plants[0] || null;
    if (matched) {
      this.shopService.addToCart(matched);
      this.showToast(`🌿 Catalogued specimen added to cart: ${matched.name}`);
      this.shopService.toggleCart(true);
    }
  }

  // Checkout Simulation
  proceedToCheckout() {
    this.shopService.toggleCart(false);
    this.isCheckoutSuccessModalOpen.set(true);
  }

  closeCheckoutSuccess() {
    this.isCheckoutSuccessModalOpen.set(false);
    this.shopService.clearCart();
  }
}
