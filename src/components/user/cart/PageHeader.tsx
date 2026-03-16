import type { CartItem } from "@/types/user";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps{
      cartItems: CartItem[];
}

export default function PageHeader({ cartItems } : PageHeaderProps){
      const navigate = useNavigate();

      return(
            <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>

      {/* Description */}
      <p className="text-gray-600 mt-2">
            Review the snacks you've added to your cart before checkout. 
            You can update quantities, remove items, or proceed to place your order.
      </p>

      {/* Cart Count */}
      <p className="text-gray-500 mt-1">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
      </p>
</div>
      );
}