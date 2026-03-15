import ReactDOM from "react-dom";
import { Suspense } from "react";
import { useModal } from "@/context/ModalContext";

import LoginForm from "@/components/user/authentication/LoginModal";
import AddToCartModal from "@/components/user/products/AddToCartModal";
import PlaceOrderModal from '@/components/user/cart/PlaceOrder';
import OverlaySpinner from "@/components/shared/OverlaySpinner";
import NotificationsModal from "@/components/user/NotificatonModal";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

export default function ModalDisplayer() {
      const { modalOpen, setModalOpen } = useModal();
      
      console.log(modalOpen.modalToOpen);
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
            notifications: (
                  <NotificationsModal 
                        open={modalOpen.modalToOpen === "notifications"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                  />
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