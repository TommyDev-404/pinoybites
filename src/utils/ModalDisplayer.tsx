import ReactDOM from "react-dom";
import { Suspense } from "react";
import { useModal } from "@/context/user/ModalContext";

import LoginForm from "@/components/user/authentication/LoginModal";
import AddToCartModal from "@/components/user/products/AddToCartModal";
import PlaceOrderModal from '@/components/user/cart/PlaceOrder';
import OverlaySpinner from "@/components/shared/OverlaySpinner";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import ProductInfoModal from "@/components/user/products/ProductInfoModal";
import NotifOrderDetailsModal from "@/components/user/notification/NotifOrderDetails";

export default function ModalDisplayer() {
      const { modalOpen, setModalOpen } = useModal();
      
      const modals = {
            login: (
                  <LoginForm 
                        open={modalOpen.modalToOpen === "login"} 
                        onClose={() => setModalOpen({ modalToOpen : null })} 
                  />
            ),
            addToCart: (
                  <AddToCartModal 
                        product={modalOpen?.productPayload!} 
                        open={modalOpen.modalToOpen === "addToCart"} 
                        onClose={() => setModalOpen({ modalToOpen: null })}
                  />
            ),
            placeOrder: (
                  <PlaceOrderModal 
                        open={modalOpen.modalToOpen === "placeOrder"} 
                        onClose={() => setModalOpen({ modalToOpen : null })} 
                        cartItems={modalOpen?.placeOrderPayload!}
                  />
            ),
            loginLoading: (
                  <OverlaySpinner message={'Logging in...'}/>
            ),
            logoutLoading: (
                  <OverlaySpinner message={'Logging out...'}/>
            ),
            logoutConfirmation: (
                  <ConfirmationModal 
                        message={modalOpen.message!} 
                        modalType={modalOpen.modalType!}
                        actionName={modalOpen.actionName!}
                        open={modalOpen.modalToOpen === "logoutConfirmation"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                        execFunc={modalOpen.function}
                  />
            ),
            removeConfirmation: (
                  <ConfirmationModal 
                        message={modalOpen.message!} 
                        modalType={modalOpen.modalType!}
                        actionName={modalOpen.actionName!}
                        open={modalOpen.modalToOpen === "removeConfirmation"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                        execFunc={modalOpen.function}
                  />
            ),
            viewProductInfo: (
                  <ProductInfoModal
                        product={modalOpen?.productInfo!}
                        open={modalOpen.modalToOpen === "viewProductInfo"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                  />
            ), 
            notifInfo: (
                  <NotifOrderDetailsModal
                        order={modalOpen?.orderInfo!}
                        open={modalOpen.modalToOpen === "notifInfo"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                  />
            )
      };

      const portalRoot = document.getElementById("modal-root");

      if (!portalRoot) return null;


      return ReactDOM.createPortal(
            <Suspense fallback={null}>
                  {modalOpen.modalToOpen ? modals[modalOpen.modalToOpen] : null}
            </Suspense>,
            portalRoot
      );
}