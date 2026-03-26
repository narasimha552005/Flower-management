import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5100/api/bookings';
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();
  
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  constructor(private http: HttpClient) {}

  submitBooking(items: string): Observable<any> {
    const booking = {
      Email: localStorage.getItem('userEmail') || 'guest@rangaflowers.com',
      Items: items
    };
    return this.http.post(this.apiUrl, booking);
  }
  togglePanel() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  openPanel() {
    this.isOpenSubject.next(true);
  }

  closePanel() {
    this.isOpenSubject.next(false);
  }

  addItem(name: string, icon: string) {
    const currentItems = this.itemsSubject.value;
    const newItem: CartItem = { id: Date.now(), name, icon };
    this.itemsSubject.next([...currentItems, newItem]);
    
    // Auto-open panel on add (optional UX improvement)
    this.openPanel();
  }

  removeItem(id: number) {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next(currentItems.filter(item => item.id !== id));
  }
}
