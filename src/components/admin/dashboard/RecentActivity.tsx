import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import type { Order, Product } from '@/types/admin';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface RecentActivityProps{
      products: Product[];
      orders: Order[];
}

export default function RecentActivity({ products, orders }: RecentActivityProps){
      
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                        <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                              {orders.slice(0, 5).map((order: any) => (
                              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                    <p className="font-medium">{order.customer}</p>
                                    <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                              </div>
                              <div className="text-right">
                                    <p className="font-semibold">₱{order.total}</p>
                                    {getStatusBadge(order.status)}
                              </div>
                              </div>
                              ))}
                        </div>
                        </CardContent>
                  </Card>
      
                  <Card>
                        <CardHeader>
                              <CardTitle>Low Stock Alert</CardTitle>
                              <CardDescription>Products that need restocking</CardDescription>
                        </CardHeader>

                        <CardContent>
                              <div className="space-y-4">
                                    {products
                                    .filter((p: any) => p.stock < 90)
                                    .sort((a: any, b: any) => a.stock - b.stock)
                                    .map((product: any) => (
                                          <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                                                <div>
                                                      <p className="font-medium">{product.name}</p>
                                                      <p className="text-sm text-gray-500">{product.category}</p>
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