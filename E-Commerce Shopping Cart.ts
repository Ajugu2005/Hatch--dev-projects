/**
 * Shopping Cart System
 */

// Types

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


// ShoppingCart Class

export class ShoppingCart {
  private items: Map<string, CartItem> = new Map();

  // Add a product to the cart.
   
  addToCart(product: Product, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    const existing = this.items.get(product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(product.id, { product, quantity });
    }
  }

  // Remove a product from the cart.
   
  removeFromCart(productId: string, quantity?: number): void {
    const existing = this.items.get(productId);

    if (!existing) {
      throw new Error(`Product with id "${productId}" not found in cart.`);
    }

    if (quantity === undefined || quantity >= existing.quantity) {
      this.items.delete(productId);
    } else {
      existing.quantity -= quantity;
    }
  }

  // Get the total price of all items currently in the cart.
   
  getTotalPrice(): number {
    let total = 0;

    for (const { product, quantity } of this.items.values()) {
      total += product.price * quantity;
    }

    
    return Math.round(total * 100) / 100;
  }
  sortByPrice(order: "asc" | "desc" = "asc"): CartItem[] {
    const cartItems = this.getItems();

    return cartItems.sort((a, b) =>
      order === "asc"
        ? a.product.price - b.product.price
        : b.product.price - a.product.price
    );
  }

  // Search for items in the cart by product name.
   
  searchByName(name: string): CartItem[] {
    const query = name.trim().toLowerCase();

    if (!query) return this.getItems();

    return this.getItems().filter((item) =>
      item.product.name.toLowerCase().includes(query)
    );
  }

  // Get all items currently in the cart as an array.
  
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  // Get the total number of individual units in the cart.

  getItemCount(): number {
    let count = 0;
    for (const { quantity } of this.items.values()) {
      count += quantity;
    }
    return count;
  }

  // Clear all items from the cart.
  clearCart(): void {
    this.items.clear();
  }
}

const cart = new ShoppingCart();

const laptop: Product = { id: "p1", name: "Laptop", price: 850000 };
const mouse: Product = { id: "p2", name: "Wireless Mouse", price: 12000 };
const keyboard: Product = { id: "p3", name: "Mechanical Keyboard", price: 45000 };

cart.addToCart(laptop, 1);
cart.addToCart(mouse, 2);
cart.addToCart(keyboard);

console.log("Total:", cart.getTotalPrice());          // getTotalPrice()
console.log("Sorted (asc):", cart.sortByPrice());      // sortByPrice()
console.log("Search 'mouse':", cart.searchByName("mouse")); // searchByName()

cart.removeFromCart("p2", 1); // remove 1 mouse
console.log("After partial removal:", cart.getItems());

cart.removeFromCart("p3"); // remove keyboard entirely
console.log("After full removal:", cart.getItems());
