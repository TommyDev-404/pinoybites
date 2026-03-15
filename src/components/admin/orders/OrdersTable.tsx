
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Clock, Trash2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import type { Order, OrderStatus } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ViewLocationMap } from '../ViewLocation';
import toast from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';


interface OrdersTableProps{
      ordersData: Order[];
}

export default function OrdersTable({ ordersData } : OrdersTableProps){
      const [orders, setOrders] = useState<Order[]>(ordersData);
      const [searchQuery, setSearchQuery] = useState('');
      const [statusFilter, setStatusFilter] = useState('all');

      const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
            setOrders(orders.map(order => 
                  order.id === orderId ? { ...order, status: newStatus } : order
            ));
            toast.success(`Order ${orderId} status updated to ${newStatus}`);
      };

      const deleteOrder = (orderId: string) => {
            setOrders(orders.filter(order => order.id !== orderId));
            toast.success(`Order ${orderId} deleted`);
      };

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
            <Card>
                  <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                    <CardTitle>Orders Management</CardTitle>
                                    <CardDescription>View and manage customer orders</CardDescription>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                          <Input
                                                placeholder="Search orders..."
                                                className="pl-10 w-full sm:w-64"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                          />
                                    </div>

                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                          <SelectTrigger className="w-full sm:w-40">
                                                <Filter size={16} className="mr-2" />
                                                <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                    </Select>
                              </div>
                        </div>
                  </CardHeader>

                  <CardContent>
                        <div className="overflow-x-auto">
                              <Table>
                                    <TableHeader>
                                          <TableRow>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Items</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                          {orders.map((order: any) => (
                                                <TableRow key={order.id}>
                                                      <TableCell className="font-medium">{order.id}</TableCell>
                                                      <TableCell>
                                                      <div>
                                                            <p className="font-medium">{order.customer}</p>
                                                            <p className="text-xs text-gray-500">{order.phone}</p>
                                                      </div>
                                                      </TableCell>
                                                      <TableCell className="max-w-[200px]">
                                                      <p className="text-sm truncate">{order.items}</p>
                                                      </TableCell>
                                                      <TableCell className="font-semibold">₱{order.total}</TableCell>
                                                      <TableCell>
                                                      <p className="text-sm">{order.date}</p>
                                                      <p className="text-xs text-gray-500">{order.time}</p>
                                                      </TableCell>
                                                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                      <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                  <Dialog>
                                                                  <DialogTrigger asChild>
                                                                  <Button variant="ghost" size="icon">
                                                                        <Eye size={16} />
                                                                  </Button>
                                                                  </DialogTrigger>
                                                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                                                  <DialogHeader>
                                                                        <DialogTitle>Order Details - {order.id}</DialogTitle>
                                                                        <DialogDescription>Complete order information and delivery location</DialogDescription>
                                                                  </DialogHeader>
                                                                  <div className="space-y-6">
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                        <Label className="text-gray-600">Customer Name</Label>
                                                                        <p className="font-medium text-lg">{order.customer}</p>
                                                                        </div>
                                                                        <div>
                                                                        <Label className="text-gray-600">Phone Number</Label>
                                                                        <p className="font-medium">{order.phone}</p>
                                                                        </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                        <Label className="text-gray-600">Order Date & Time</Label>
                                                                        <p className="font-medium">{order.date} at {order.time}</p>
                                                                        </div>
                                                                        <div>
                                                                        <Label className="text-gray-600">Status</Label>
                                                                        <div className="mt-1">{getStatusBadge(order.status)}</div>
                                                                        </div>
                                                                        </div>
                                                                        <div>
                                                                        <Label className="text-gray-600">Items Ordered</Label>
                                                                        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                                                        <p className="font-medium">{order.items}</p>
                                                                        </div>
                                                                        </div>
                                                                        <div>
                                                                        <Label className="text-gray-600">Order Total</Label>
                                                                        <p className="text-2xl font-bold text-amber-600">₱{order.total}</p>
                                                                        </div>
                                                                        <div>
                                                                        <Label className="text-gray-600 mb-2 block">Delivery Location</Label>
                                                                        <ViewLocationMap 
                                                                        location={order.location} 
                                                                        customerName={order.customer}
                                                                        />
                                                                        </div>
                                                                  </div>
                                                                  </DialogContent>
                                                                  </Dialog>
                                                                  
                                                                  <Select
                                                                        value={order.status}
                                                                        onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                                                                  >
                                                                        <SelectTrigger className="w-32">
                                                                              <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="pending">Pending</SelectItem>
                                                                              <SelectItem value="confirmed">Confirmed</SelectItem>
                                                                              <SelectItem value="delivered">Delivered</SelectItem>
                                                                              <SelectItem value="cancelled">Cancelled</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                          
                                                                  <Button 
                                                                        variant="ghost" 
                                                                        size="icon"
                                                                        onClick={() => deleteOrder(order.id)}
                                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                  >
                                                                        <Trash2 size={16} />
                                                                  </Button>
                                                            </div>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </div>
                  </CardContent>
            </Card>
      );
}