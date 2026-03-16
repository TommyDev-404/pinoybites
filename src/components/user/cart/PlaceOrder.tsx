import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogDescription
} from "@/components/ui/dialog"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue
} from "@/components/ui/select"
import {
      User,
      MapPin,
      CreditCard,
      Calendar,
      Clock
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType, OrderFormData, OrderInfo } from "@/types/user"
import toast from "react-hot-toast"
import { capitalizeWords  } from '@/utils/helper';
import { useNavigate } from "react-router-dom"
import PlaySound from "@/utils/PlaySound"
import type { Notification } from "@/types/user"
import { useUserContext } from "@/context/user/UserContext"
import { useAuth } from "@/context/user/AuthContext"


type Props = {
      cartItems: CartItemType[]
      open: boolean
      onClose: () => void
}

export default function PlaceOrderModal({ cartItems, open, onClose }: Props) {
      const { handlePlaceOrder } = useUserContext();
      const { user } = useAuth();
      const navigate = useNavigate();
      const [isSubmitting, setIsSubmitting] = useState(false)
      const {
            register,
            handleSubmit,
            setValue,
            watch,
            formState: { errors }
      } = useForm<OrderFormData>({
      defaultValues: {
            deliveryDate: new Date().toISOString().split("T")[0],
            deliveryTime: "06:00",
            paymentMethod: "cod",
            email: user?.email,
            customerName: user?.name
      }
      })
      const watchPaymentMethod = watch("paymentMethod")

      // totals
      const subtotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity!,
            0
            )

      const DELIVERY_FEE = 4.99
      const total = subtotal + DELIVERY_FEE

      
      const onSubmit = (data: OrderFormData) => {
            handlePlaceOrder(data, cartItems, setIsSubmitting, onClose, navigate);
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-xl">

                        <DialogHeader>
                              <DialogTitle>Place Your Order</DialogTitle>
                              <DialogDescription>
                                    Review your order and enter delivery details.
                              </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-auto px-1">

                              {/* CART SUMMARY */}
                              <div className="space-y-3 max-h-34 overflow-y-auto">

                                    {cartItems.map(item => (

                                    <div
                                    key={item.id}
                                    className="flex justify-between items-center border-b pb-2"
                                    >

                                    <div className="flex items-center gap-3">

                                          <img
                                          src={item.image}
                                          alt={item.name}
                                          className="w-12 h-12 rounded object-cover"
                                          />

                                          <div>
                                          <p className="font-semibold">{item.name}</p>
                                          <p className="text-sm text-gray-500">
                                          {item.quantity} × ₱{item.price.toFixed(2)}
                                          </p>
                                          </div>

                                    </div>

                                    <p className="font-semibold">
                                          ₱{(item.price * item.quantity!).toFixed(2)}
                                    </p>

                                    </div>

                                    ))}

                              </div>

                              {/* CUSTOMER DETAILS */}
                              <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                          <User size={18} className="text-amber-600" />Customer Details
                                    </h3>

                                    <div className="space-y-2">
                                          <Label>Full Name *</Label>
                                          <Input
                                                placeholder="Juan Dela Cruz"
                                                {...register("customerName")}
                                                readOnly={true}
                                          />
                                          {errors.customerName && (
                                                <p className="text-sm text-red-500">
                                                      {errors.customerName.message}
                                                </p>
                                          )}
                                    </div>

                                    <div className="space-y-2">
                                          <Input
                                                type="tel"
                                                placeholder="+63 917 123 4567"
                                                      {...register("phone", {
                                                      required: "Phone required",
                                                      minLength: { value: 11, message: "Must be at least 11 digits" },
                                                      maxLength: { value: 11, message: "Must be at most 11 digits" }
                                                })}
                                          />
                                          {errors.phone && (
                                          <p className="text-red-600 text-sm">{errors.phone.message}</p>
                                          )}
                                    </div>

                                    <div className="space-y-2">
                                          <Label>Email</Label>
                                          <Input
                                                type="email"
                                                placeholder="juan@email.com"
                                                {...register("email")}
                                                readOnly={true}
                                          />
                                    </div>

                              </div>

                              {/* DELIVERY DETAILS */}
                              <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                          <MapPin size={18} className="text-amber-600" />
                                          Delivery Details
                                    </h3>

                                    <div className="space-y-2">
                                          <Label>Address *</Label>
                                          <Textarea
                                                placeholder="Enter delivery address"
                                                {...register("address", {
                                                      required: "Address required",
                                                      onChange: (e) => setValue("address", capitalizeWords(e.target.value))
                                                      }
                                                )}
                                          />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                                <Label>
                                                      <Calendar className="inline mr-1" size={14} />
                                                      Delivery Date
                                                </Label>

                                                <Input
                                                      type="date"
                                                      min={new Date().toISOString().split("T")[0]}
                                                      {...register("deliveryDate")}
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <Label>
                                                      <Clock className="inline mr-1" size={14} />
                                                      Delivery Time
                                                </Label>

                                                <Select
                                                      onValueChange={(v) => setValue("deliveryTime", v)}
                                                      defaultValue="06:00"
                                                >
                                                      <SelectTrigger>
                                                            <SelectValue />
                                                      </SelectTrigger>

                                                      <SelectContent>
                                                            <SelectItem value="06:00">6:00 AM - 8:00 AM</SelectItem>
                                                            <SelectItem value="08:00">8:00 AM - 10:00 AM</SelectItem>
                                                            <SelectItem value="10:00">10:00 AM - 12:00 PM</SelectItem>
                                                            <SelectItem value="14:00">2:00 PM - 4:00 PM</SelectItem>
                                                            <SelectItem value="16:00">4:00 PM - 6:00 PM</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <Label>Special Instructions</Label>
                                          <Textarea
                                                placeholder="Ring doorbell..."
                                                {...register("notes")}
                                          />
                                    </div>

                              </div>

                              {/* PAYMENT METHOD */}
                              <div className="space-y-4">

                                    <h3 className="flex items-center gap-2 font-semibold">
                                          <CreditCard size={18} className="text-amber-600" />
                                          Payment Method
                                    </h3>

                                    <RadioGroup
                                          defaultValue="cod"
                                          onValueChange={(v) => setValue("paymentMethod", v)}
                                    >

                                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                          <RadioGroupItem value="cod" id="cod" />
                                          <Label htmlFor="cod">Cash on Delivery</Label>
                                    </div>

                                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                          <RadioGroupItem value="gcash" id="gcash" />
                                          <Label htmlFor="gcash">GCash</Label>
                                    </div>

                                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                          <RadioGroupItem value="bank" id="bank" />
                                          <Label htmlFor="bank">Bank Transfer</Label>
                                    </div>

                                    </RadioGroup>

                                    {watchPaymentMethod === "gcash" && (
                                          <div className="p-4 bg-blue-50 border rounded">
                                                <p className="font-semibold">GCash Number</p>
                                                <p>+63 917 123 4567</p>
                                          </div>
                                    )}

                                    {watchPaymentMethod === "bank" && (
                                          <div className="p-4 bg-blue-50 border rounded">
                                                <p className="font-semibold">Bank Details</p>
                                                <p>BDO - 123456789</p>
                                                <p>Pinoy Bites</p>
                                          </div>
                                    )}

                              </div>

                              {/* TOTAL */}
                              <div className="flex justify-between font-semibold text-lg">
                                    <span>Total:</span>
                                    <span>₱{total.toFixed(2)}</span>
                              </div>

                              {/* ACTION BUTTONS */}
                              <DialogFooter className="flex gap-3">

                                    <Button
                                          type="submit"
                                          disabled={isSubmitting}
                                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                                    >
                                          {isSubmitting
                                                ? "Placing Order..."
                                                : `Place Order - ₱${total.toFixed(2)}`
                                          }
                                    </Button>

                              </DialogFooter>

                        </form>

                  </DialogContent>
            </Dialog>
      )
}