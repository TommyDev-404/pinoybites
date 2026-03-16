
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
      image: string;
      ingredients: string[];
      steps: string[];
}

export interface Notification {
      id: number;
      message: string;
      type: "success" | "error" | "info";
      read: boolean;
      orders: OrderInfo;
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

export interface OrderInfo {
      id: number;
      date: string;
      deliveryFee: number;
      status: "Pending" | "Completed" | "Cancelled";
      total: number;
      items: CartItem[]
}

export interface Cart {
      items: CartItem[];
      subtotal: number;
      deliveryFee: number;
      total: number;
}


export interface OrderFormData {
      customerName: string
      phone: string
      email: string
      address: string
      deliveryDate: string
      deliveryTime: string
      paymentMethod: string
      notes: string
}


