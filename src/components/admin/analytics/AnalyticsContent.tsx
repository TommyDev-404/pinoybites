import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from 'lucide-react';

// Define types
interface Product {
      id: string | number;
      name: string;
      sold: number;
      price: number;
      stock: number;
      category: string;
}

interface Order {
      id: string | number;
      status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

interface Customer {
      id: string | number;
      name: string;
      orders: number;
      totalSpent: number;
}

interface AnalyticsContentProps {
      products: Product[];
      orders: Order[];
      customers: Customer[];
}

// Default function component
export default function AnalyticsContent({
      orders,
      products,
      customers
}: AnalyticsContentProps) {

      const getStatusBadge = (status: string) => {
		const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: any }> = {
			pending: { variant: 'outline', icon: Clock },
			confirmed: { variant: 'default', icon: CheckCircle },
			delivered: { variant: 'secondary', icon: CheckCircle },
			cancelled: { variant: 'destructive', icon: XCircle },
		};

		const config = variants[status] || variants.pending;
		const Icon = config.icon;

		return (
			<Badge variant={config.variant} className="flex items-center gap-1 w-fit">
				<Icon size={12} />
				{status}
			</Badge>
		);
      };

      return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Selling Products */}
                  <Card>
                  <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing items</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                        {products
                        .sort((a, b) => b.sold - a.sold)
                        .slice(0, 5)
                        .map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                              </div>
                              <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.sold} units sold</p>
                              </div>
                              </div>
                              <p className="font-semibold">₱{(product.price * product.sold).toLocaleString()}</p>
                        </div>
                        ))}
                  </div>
                  </CardContent>
                  </Card>

                  {/* Order Status Distribution */}
                  <Card>
                  <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current order statuses</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                        {(['pending', 'confirmed', 'delivered', 'cancelled'] as Order['status'][]).map((status) => {
                        const count = orders.filter(o => o.status === status).length;
                        const percentage = ((count / orders.length) * 100).toFixed(0);
                        return (
                        <div key={status}>
                              <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                              {getStatusBadge(status)}
                              <span className="text-sm text-gray-600">{count} orders</span>
                              </div>
                              <span className="text-sm font-semibold">{percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                              className="bg-amber-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                              />
                              </div>
                        </div>
                        );
                        })}
                  </div>
                  </CardContent>
                  </Card>

                  {/* Top Customers */}
                  <Card>
                  <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Most valuable customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                        {customers
                        .sort((a, b) => b.totalSpent - a.totalSpent)
                        .slice(0, 5)
                        .map((customer, index) => (
                        <div key={customer.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                              </div>
                              <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.orders} orders</p>
                              </div>
                              </div>
                              <p className="font-semibold">₱{customer.totalSpent.toLocaleString()}</p>
                        </div>
                        ))}
                  </div>
                  </CardContent>
                  </Card>

                  {/* Inventory Alerts */}
                  <Card>
                  <CardHeader>
                  <CardTitle>Inventory Alerts</CardTitle>
                  <CardDescription>Low stock products</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                        {products
                        .filter(p => p.stock < 90)
                        .sort((a, b) => a.stock - b.stock)
                        .map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">Category: {product.category}</p>
                              </div>
                              <Badge variant="outline" className="border-orange-600 text-orange-600">
                              {product.stock} left
                              </Badge>
                        </div>
                        ))}
                  </div>
                  </CardContent>
                  </Card>
            </div>
      );
}