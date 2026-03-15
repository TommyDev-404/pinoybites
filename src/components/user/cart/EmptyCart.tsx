import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function EmptyCart(){
      return (
            <div className="h-screen bg-white flex justify-center items-center">
                  <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="flex flex-col items-center justify-center py-20">
                              <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
                              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                              <p className="text-gray-600 mb-8">Add some delicious food to get started!</p>
                              <NavLink 
                                    to={'/products'}
                                    className={'flex items-center justify-center bg-amber-600 hover:bg-amber-700 py-3 px-6 text-sm text-white rounded-full'}
                              >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Continue Shopping
                              </NavLink>
                        </div>
                  </div>
            </div>
      );
}