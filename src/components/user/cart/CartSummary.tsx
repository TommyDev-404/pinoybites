import { useState } from 'react';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartSummaryProps {
      subtotal: number;
      deliveryFee: number;
      total: number;
      onCheckout: () => void;
}

export function CartSummary({ subtotal, deliveryFee, total, onCheckout }: CartSummaryProps) {
      const [promoCode, setPromoCode] = useState('');
      const [promoApplied, setPromoApplied] = useState(false);

      const handleApplyPromo = () => {
            if (promoCode.trim()) {
                  setPromoApplied(true);
            }
      };

      return (
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                              <span className="text-gray-600">Delivery Fee</span>
                              <span className="font-medium">₱{deliveryFee.toFixed(2)}</span>
                        </div>

                        {promoApplied && (
                              <div className="flex justify-between text-green-600">
                                    <span>Promo Discount</span>
                                    <span>-$5.00</span>
                              </div>
                        )}

                        <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                              <span className="text-lg font-bold">Total</span>
                              <span className="text-2xl font-bold">
                                    ₱{(promoApplied ? total - 5 : total).toFixed(2)}
                              </span>
                        </div>
                  </div>

                  <div className="mb-4">
                        <div className="flex gap-2">
                              <div className="relative flex-1">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                          type="text"
                                          placeholder="Promo code"
                                          value={promoCode}
                                          onChange={(e) => setPromoCode(e.target.value)}
                                          className="pl-10"
                                          disabled={promoApplied}
                                    />
                              </div>
                              <Button
                                    variant="outline"
                                    onClick={handleApplyPromo}
                                    disabled={promoApplied}
                              >
                                    {promoApplied ? 'Applied' : 'Apply'}
                              </Button>
                        </div>
                        {promoApplied && (
                              <p className="text-sm text-green-600 mt-2">
                                    ✓ Promo code applied successfully!
                              </p>
                        )}
                  </div>

                  <Button
                        className="w-full h-12 text-lg"
                        onClick={onCheckout}
                  >
                        Proceed to Checkout
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">Taxes calculated at checkout</p>
            </div>
      );
}
