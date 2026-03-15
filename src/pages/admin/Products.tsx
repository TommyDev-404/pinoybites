import ProductTableCard from "@/components/admin/products/ProductTableCard";
import { mockProducts } from "@/utils/SampleData";

export default function Products(){
      return (
            <ProductTableCard products={mockProducts}/>
      );
}