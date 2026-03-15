
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

export interface Product {
      id: number;
      name: string;
      category: string;
      price: number;
      stock: number;
      sold: number;
}

interface ProductTableCardProps {
      products: Product[];
}

export default function ProductTableCard({ products } : ProductTableCardProps) {
      return (
            <Card>
                  <CardHeader>
                        <div className="flex items-center justify-between">
                              <div>
                                    <CardTitle>Products Management</CardTitle>
                                    <CardDescription>Manage your product catalog</CardDescription>
                              </div>
                              <Button
                                    className="bg-amber-600 hover:bg-amber-700"
                              >
                                    <Plus size={18} className="mr-2" />
                                    Add Product
                              </Button>
                        </div>
                  </CardHeader>

                  <CardContent>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Sold</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                              </TableHeader>

                              <TableBody>
                                    {products.map((product) => (
                                    <TableRow key={product.id}>
                                          <TableCell className="font-medium">{product.name}</TableCell>
                                          <TableCell>
                                                <Badge variant="outline">{product.category}</Badge>
                                          </TableCell>
                                          <TableCell className="font-semibold">₱{product.price}</TableCell>
                                          <TableCell>
                                                <span className={product.stock < 70 ? 'text-orange-600 font-semibold' : ''}>
                                                {product.stock} units
                                                </span>
                                          </TableCell>
                                          <TableCell>{product.sold} units</TableCell>
                                          <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                >
                                                <Edit size={16} />
                                                </Button>
                                                <Button 
                                                variant="ghost" 
                                                size="icon" 
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
                  </CardContent>
            </Card>
      );
};

//melvin gwapo ahahahah u suya lang hahahhahahhaah