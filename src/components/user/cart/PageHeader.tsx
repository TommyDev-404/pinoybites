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
                  <div className="mb-6">
                        <button
                              onClick={() => { navigate('/products') }}
                              className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline transition group cursor-pointer"
                        >
                              <ArrowLeftCircle className="w-5 transition-transform group-hover:-translate-x-1" />
                              Continue Shopping
                        </button>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
                  <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
            </div>
      );
}