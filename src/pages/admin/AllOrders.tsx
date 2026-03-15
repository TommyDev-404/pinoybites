import OrdersTable from "@/components/admin/orders/OrdersTable";
import { mockOrders } from "@/utils/SampleData";

export default function AllOrders(){
      return (
            <OrdersTable ordersData={mockOrders} />
      );
}