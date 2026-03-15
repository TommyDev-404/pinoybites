
//export type category = 'All' | 

export type SortOption = 'recommended' | 'price-low' | 'price-high' | 'new' | 'rating';

export interface Product {
      id: number;
      name: string,
      description: string;
      price: number;
      rating: number;
      reviews: number;
      category: string;
      isNew: boolean;
      isFavorite: boolean;
      image: string
}

export interface Notification {
      id: number;
      message: string;
      type: "success" | "error" | "info";
      date: string;
      link?: string;
}

export interface CartItem {
      id: number;
      name: string;
      description: string;
      price: number;
      quantity?: number;
      image: string;
      category: string;
}

type OrderItem = {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
};

export interface OrderInfo {
      id: number;
      date: string;
      deliveryFee: number;
      status: "Pending" | "Completed" | "Cancelled";
      total: number;
      items: OrderItem[]
}

export interface Cart {
      items: CartItem[];
      subtotal: number;
      deliveryFee: number;
      total: number;
}

