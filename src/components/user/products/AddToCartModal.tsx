import { useState } from "react"
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogDescription,
} from "@/components/ui/dialog"
import type { CartItem as CartItemType  } from "@/types/user"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useModal } from "@/context/user/ModalContext"
import { useUserContext } from "@/context/user/UserContext"

type Props = {
      product: CartItemType
      open: boolean,
      onClose: () => void
};

export default function AddToCartModal({ product, open, onClose }: Props) {
      const { addToCart } = useUserContext();
      const { setModalOpen } = useModal();
      const [quantity, setQuantity] = useState(1)

      const increase = () => setQuantity((prev) => prev + 1)
      const decrease = () => {
            if (quantity > 1) setQuantity((prev) => prev - 1)
      }
      
      const handleAddToCart = () => {
            // Add it to the context (handles existing items automatically)
            addToCart(product, quantity);

            // Close modal
            setModalOpen({ modalToOpen: null });
      };

      return (
            <Dialog
                  open={open}
                  onOpenChange={onClose}
            >
                  <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                              <DialogTitle>Add {product.name} to Cart</DialogTitle>
                              <DialogDescription>
                                    Select the quantity of {product.name} you want to add to your cart.
                              </DialogDescription>
                        </DialogHeader>
                  
                        <div className="flex items-center gap-4 py-4">
                              <Button variant="outline" onClick={decrease}>
                                    -
                              </Button>
                        
                              <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-20 text-center"
                              />
                        
                              <Button variant="outline" onClick={increase}>
                                    +
                              </Button>
                        </div>
                  
                        <DialogFooter>
                              <Button  onClick={handleAddToCart}>Add {quantity} to Cart</Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      )
}