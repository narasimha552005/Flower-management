import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from './cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  isOpen$: Observable<boolean>;
  
  constructor(public cartService: CartService) {
    this.items$ = this.cartService.items$;
    this.isOpen$ = this.cartService.isOpen$;
  }

  ngOnInit(): void {}

  closePanel() {
    this.cartService.closePanel();
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  checkout(items: CartItem[]) {
    const names = items.map(i => i.name).join(', ');
    
    // 1. Submit to Backend / MongoDB
    this.cartService.submitBooking(names).subscribe({
      next: (res) => {
        console.log('Booking recorded efficiently into MongoDB!', res);
      },
      error: (err) => console.error('Error saving booking via backend.', err)
    });

    // 2. Open WhatsApp Context Handover
    const msg = encodeURIComponent(
      'Hello RANGA Flowers! I want to book: ' + (names || 'a service') + '. Please confirm availability.'
    );
    window.open('https://wa.me/919246755589?text=' + msg, '_blank');
  }
}
