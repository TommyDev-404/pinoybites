import { createContext, useContext, useState  } from "react";
import type { CartItem as CartItemType, OrderInfo, Product } from "@/types/user";

type ModalOption = 
      'login' |
      'addToCart' | 
      'placeOrder' | 
      'loginLoading' |
      'logoutLoading' |
      'notifInfo' |
      'logoutConfirmation' |
      'removeConfirmation' |
      'viewProductInfo' |
      null;

type ModalData = {
      modalToOpen: ModalOption,
      productPayload?: CartItemType,
      productInfo?: Product,
      placeOrderPayload?: CartItemType[],
      orderInfo?:OrderInfo;
      message?: string;
      actionName?: string;
      modalType?: string;
      function?: (id?: number) => void;
}

type ModalContextType = {
      modalOpen: ModalData;
      setModalOpen: React.Dispatch<React.SetStateAction<ModalData>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
      const [ modalOpen, setModalOpen ] = useState<ModalData>({ modalToOpen : null });

      return(
            <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
                  {children}
            </ModalContext.Provider>
      );

}

export const useModal = () => {
      const context = useContext(ModalContext);
      if (!context) {
            throw new Error("useAuthModal must be used within an AuthModalProvider");
      }
      return context;
};