import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Customer } from "@/types/admin";


// Define props for the component
interface CustomersContentProps {
      customers: Customer[];
}

export default function CustomersContent({ customers }: CustomersContentProps) {
      return (
            <Card>
                  <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage customer information</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <Table>
                  <TableHeader>
                        <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                        {customers.map((customer) => (
                        <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                              <p className="text-sm">{customer.email}</p>
                              <p className="text-xs text-gray-500">{customer.phone}</p>
                        </TableCell>
                        <TableCell>{customer.orders} orders</TableCell>
                        <TableCell className="font-semibold">
                              ₱{customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                              <Eye size={16} />
                              </Button>
                        </TableCell>
                        </TableRow>
                        ))}
                  </TableBody>
                  </Table>
                  </CardContent>
            </Card>
      );
}