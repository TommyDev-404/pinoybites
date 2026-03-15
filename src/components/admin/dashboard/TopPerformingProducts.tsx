import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types/admin';

interface TopPerformingProducts{
      products: Product[];
}

export default function TopPerformingProducts({ products }: TopPerformingProducts){
      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Top Performing Products</CardTitle>
                        <CardDescription>Best selling items this month</CardDescription>
                  </CardHeader>

                  <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {products
                              .sort((a: any, b: any) => b.sold - a.sold)
                              .slice(0, 3)
                              .map((product: any, index: number) => (
                                    <div key={product.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                          <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                      {index + 1}
                                                </div>
                                                <div>
                                                      <p className="font-semibold">{product.name}</p>
                                                      <p className="text-xs text-gray-500">{product.category}</p>
                                                </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                                <div>
                                                      <p className="text-xs text-gray-600">Units Sold</p>
                                                      <p className="text-lg font-bold text-amber-600">{product.sold}</p>
                                                </div>
                                                <div className="text-right">
                                                      <p className="text-xs text-gray-600">Revenue</p>
                                                      <p className="text-lg font-bold text-gray-900">₱{(product.price * product.sold).toLocaleString()}</p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </CardContent>
            </Card>
      );
}