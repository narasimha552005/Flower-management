import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  @Input() categoryId: string | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}

  galleryData: any = {
    car: {
      title: '🚗 Car Decoration',
      sub: 'Premium Wedding Car Styling · Amalapuram',
      tag: '✦ Car Decoration · Heritage Collection',
      heroTitle: 'Prestigious',
      heroDesc: 'Elevate your wedding procession with traditional Konaseema floral craftsmanship tailored for your vehicle.',
      products: [
        { name: 'Royal Rose Decor', image: '/car1.png', emoji: '🚗🌹', badge: 'Heritage Design', label: 'Traditional', desc: 'A rich tapestry of pure red and white roses woven into classic garlands for a grand entry.' },
        { name: 'Exotic Jasmine', image: '/car2.png', emoji: '🚙🌼', badge: 'Trending', badgeClass: 'trending', label: 'Konaseema Fragrance', desc: 'Fresh jasmine strands beautifully draped with striking marigold and lily accents for a fragrant journey.' },
        { name: 'Orchid Elegance', image: '/car3.png', emoji: '🚘🌺', badge: 'Modern', label: 'Contemporary', desc: 'A sleek, modern design using striking purple orchids and delicate foliage for a sophisticated look.' }
      ]
    },
    stage: {
      title: '🏛️ Stage Decoration',
      sub: 'Grand Marriage Stage & Mandapams set in Konaseema Tradition',
      tag: '✦ Stage Decoration · Heritage Collection',
      heroTitle: 'Majestic',
      heroDesc: 'Create unforgettable memories with our breathtaking stage decorations tailored for grand weddings and events.',
      products: [
        { name: 'Classic Tirupati Mandapam', image: '/stage1.png', emoji: '🏛️🌿', badge: 'Heritage Design', label: 'Traditional', desc: 'Inspired by traditional temple architecture, heavily adorned with sweet-scented jasmine and vibrant marigold.', },
        { name: 'Floral Canopy', image: '/stage2.png', emoji: '✨💮', badge: 'Bestseller', label: 'Elegance', desc: 'A dense overhead canopy of mixed roses, orchids, and cascading greens creating a magical floral sky.' },
        { name: 'Golden Drapes & Lilies', image: '/stage3.png', emoji: '🎭🏵️', badge: 'Premium', label: 'Luxurious', desc: 'Rich golden drapes combined with grand arrangements of white lilies and carnations for a regal backdrop.' }
      ]
    },
    braid: {
      title: '💐 Braid Hair Styling',
      sub: 'Traditional Poola Jada & Bridal Floral Hair Attachments',
      tag: '✦ Braid Floral · Heritage Collection',
      heroTitle: 'Elegant',
      heroDesc: 'Adorn your hair with exquisite floral braids crafted specially for the traditional South Indian bride.',
      products: [
        { name: 'Classic Jasmine Jada', image: '/hair1.png', emoji: '👱‍♀️🌼', badge: 'Heritage Design', label: 'Traditional', desc: 'The quintessential South Indian bridal look featuring thick chains of fresh jasmine and rose petals.' },
        { name: 'Rose & Gold Motif', image: '/hair2.png', emoji: '🎀🌹', badge: 'Bestseller', label: 'Bridal Special', desc: 'Intricate patterns formed with fragrant red roses and gold hair ornaments woven into a traditional braid.' },
        { name: 'Orchid Net (Veni)', image: '/hair3.png', emoji: '🌸✨', badge: 'Modern Twist', label: 'Contemporary', desc: 'A beautiful lightweight floral net crafted with vibrant orchids to drape elegantly over the braid.' }
      ]
    },
    bouquet: {
      title: '🌹 Wedding Bouquets',
      sub: 'Handcrafted Bridal Bouquets & Floral Arrangements',
      tag: '✦ Bouquets · Heritage Collection',
      heroTitle: 'Charming',
      heroDesc: 'Complete your bridal ensemble with our bespoke, freshly arranged floral bouquets offering a touch of grace.',
      products: [
        { name: 'Crimson Rose Cascade', image: '/bouquet1.png', emoji: '🌹🌿', badge: 'Classic', label: 'Traditional', desc: 'A stunning cascade of deep red roses and lush green foliage, perfect for a striking bridal entrance.' },
        { name: 'White Lily Harmony', image: '/bouquet2.png', emoji: '💮🤍', badge: 'Elegant', label: 'Premium', desc: 'Pure white lilies arranged beautifully with baby\'s breath for a pristine, angelic look.' },
        { name: 'Pastel Meadow Mix', image: '/bouquet3.png', emoji: '💐🌷', badge: 'Trending', badgeClass: 'trending', label: 'Contemporary', desc: 'A charming assortment of soft pastel flowers including pink carnations, peach roses, and delicate daisies.' }
      ]
    }
  };

  get currentData() {
    return this.categoryId ? this.galleryData[this.categoryId] || this.galleryData['car'] : null;
  }

  onClose() {
    this.close.emit();
  }

  addToCart(product: any) {
    this.cartService.addItem(product.name, product.emoji);
  }
}
