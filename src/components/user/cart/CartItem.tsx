import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CartItem as CartItemType } from '@/types/user';

interface CartItemProps {
      item: CartItemType;
      onUpdateQuantity: (id: number, quantity: number) => void;
      onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
      return (
            <div className="flex gap-4 py-6 border-b border-gray-200">
                  <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                        <div>
                              <div className="flex justify-between items-start gap-4">
                                    <div>
                                          <h3 className="font-semibold text-lg">{item.name}</h3>
                                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
                                          {item.category}
                                          </span>
                                    </div>
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => onRemove(item.id)}
                                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                          <Trash2 className="w-5 h-5" />
                                    </Button>
                              </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity! - 1))}
                                          className="h-9 w-9"
                                    >
                                          <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                          <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => onUpdateQuantity(item.id, item.quantity! + 1)}
                                          className="h-9 w-9"
                                    >
                                          <Plus className="w-4 h-4" />
                                    </Button>
                              </div>
                              
                              <div className="text-right">
                                    <p className="text-xl font-bold">₱{(item.price * item.quantity!).toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">₱{item.price.toFixed(2)} each</p>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
