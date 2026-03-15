import { CartItem } from '@/components/user/cart/CartItem';
import { CartSummary } from '@/components/user/cart/CartSummary';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import TrustIndicator from '@/components/shared/TrustIndicators';
import { useAuth } from '@/context/AuthContext';
import EmptyCart from '@/components/user/cart/EmptyCart';
import PageHeader from '@/components/user/cart/PageHeader';

const DELIVERY_FEE = 4.99;

export default function CartPage() {
      const { user } = useAuth();
      const { setModalOpen } = useModal();
      const { cartItems, updateQuantity, removeFromCart } = useCart();

      const handleUpdateQuantity = (id: number, quantity: number) => {
            updateQuantity(id, quantity);
      };

      const handleRemoveItem = (id: number) => {      
            setModalOpen({ 
                  modalToOpen: 'removeConfirmation',
                  message: 'Are you sure you want to remove this item? It will be permanently remove after this.',
                  modalType: 'remove cart',
                  actionName: 'Remove',
                  function: () => removeFromCart(id)
            });
      };

      const handleCheckout = () => {
            user ? 
                  setModalOpen({ 
                        modalToOpen: 'placeOrder',
                        placeOrderPayload: cartItems
                  })
            : 
                  setModalOpen({ modalToOpen: 'login' })
      };

      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity!, 0);
      const total = subtotal + DELIVERY_FEE;

      if (cartItems.length === 0) return <EmptyCart/>;

      return (
            <div className="min-h-screen bg-stone-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        {/* Header */}
                        <PageHeader cartItems={cartItems}/>

                        {/* Cart Content */}
                        <div className="grid lg:grid-cols-3 gap-8">
                              {/* Cart Items */}
                              <div className="lg:col-span-2">
                                    <motion.div
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true, amount: 0.3 }}
                                          transition={{ duration: 0.30 }}
                                          className="bg-white rounded-lg border border-gray-200 p-6 h-105 overflow-y-auto"
                                    >
                                          {cartItems.map((item, index) => (
                                                <motion.div
                                                      key={item.id}
                                                      initial={{ opacity: 0, y: 30 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
                                                      transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
                                                >
                                                      <CartItem
                                                            key={item.id}
                                                            item={item}
                                                            onUpdateQuantity={handleUpdateQuantity}
                                                            onRemove={handleRemoveItem}
                                                      />
                                                </motion.div>
                                          ))}
                                    </motion.div>
                              </div>

                              {/* Order Summary */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.25 }}
                                    className="lg:col-span-1"
                              >
                                    <CartSummary
                                          subtotal={subtotal}
                                          deliveryFee={DELIVERY_FEE}
                                          total={total}
                                          onCheckout={handleCheckout}
                                    />
                              </motion.div>
                        </div>

                        <TrustIndicator/>
                  </div>
            </div>
      );
}
