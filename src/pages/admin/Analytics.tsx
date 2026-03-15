import AnalyticsContent from "@/components/admin/analytics/AnalyticsContent";
import { mockOrders, mockProducts,  mockCustomers} from "@/utils/SampleData";


export default function Analytics(){
      return (
            <AnalyticsContent orders={mockOrders}  products={mockProducts} customers={mockCustomers} />
      );
}