
import CustomersContent from "@/components/admin/customers/CustomersContent";
import { mockCustomers } from "@/utils/SampleData";

export default function Customers(){
      return (
            <CustomersContent customers={mockCustomers}/>
      );
}