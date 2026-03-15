import type { LucideIcon } from "lucide-react";

type Location = {
      lat: number
      lng: number
      address: string
}

export type Page = 'dashboard' | 'orders' | 'products' | 'customers' | 'analytics';

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled"

export type MenuItemsType = {
      id: Page;
      label: string;
      icon: LucideIcon;
      path: string;
      badge?: number;
}

export type Product = {
      id: number
      name: string
      price: number
      stock: number
      category: string
      sold: number
}

export type Order = {
      id: string
      customer: string
      phone: string
      items: string
      total: number
      status: OrderStatus
      date: string
      time: string
      address: string
      location: Location
}

export interface Customer {
      id: number;
      name: string;
      email: string;
      phone: string;
      orders: number;
      totalSpent: number;
}

export type Notification = {
      message: string;
      date: string;
      type: 'success' | 'error';
};