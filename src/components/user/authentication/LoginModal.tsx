import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import type { SubmitHandler } from "react-hook-form";
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
} from "@/components/ui/dialog";

import toast from "react-hot-toast";
import PlaySound from "@/utils/PlaySound";
import LoginForm from "@/components/user/authentication/LoginForm";

type LoginProps = {
      open: boolean,
      onClose: () => void
};

type LoginForm = {
      email: string,
      password: string
};    

type LoadingState = 'idle' | 'validating'

export default function LoginModal({ open, onClose } : LoginProps) {
      const { login } = useAuth();
      const { setModalOpen } = useModal();

      const [ showPassword, setShowPassword ] = useState<boolean>(false);
      const [ loadingState, setLoadingState ] = useState<LoadingState>('idle');

      // Use useForm
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<LoginForm>();


      const handleGoogleLogin = () => {
            // Replace this with Google OAuth logic
            alert("Google login clicked");
      };

      const handleFacebookLogin = () => {
            // Replace this with Facebook OAuth logic
            alert("Facebook login clicked");
      };
      
      const onSubmit : SubmitHandler<LoginForm> = (data) => {
            // Start validating
            setLoadingState('validating');
      
            setTimeout(() => {
                  const success = login({
                        email: data.email,
                        password: data.password
                  });

                // Done validating
                  setLoadingState('idle');
            
                  if (success) {
                        // Show the login loading modal for a short moment
                        setModalOpen({ modalToOpen: 'loginLoading' });
                        
                        // Then show success toast and play sound
                        toast.success("Welcome back!");
                        PlaySound();
                        
                        setTimeout(() => {
                              // Close the login loading modal and main modal
                              setModalOpen({ modalToOpen: null });
                              window.location.href = '/products';
                              onClose();
                        }, 700); // keeps the loading modal for 700ms
                  } else {
                        toast.error("Invalid email or password!");
                        PlaySound();
                  }
            }, 500); // simulates validating delay
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                              <DialogTitle className="text-center text-xl">Login Account</DialogTitle>
                              <DialogDescription className="text-center">
                                    Enter your credentials or continue with Google/Facebook
                              </DialogDescription>
                        </DialogHeader>

                        <LoginForm
                              formUsage={'modal'}
                              onSubmit={onSubmit}
                              handleSubmit={handleSubmit} 
                              register={register}
                              errors={errors}
                              showPassword={showPassword}
                              setShowPassword={setShowPassword}
                              loadingState={loadingState}
                              handleGoogleLogin={handleGoogleLogin}
                              handleFacebookLogin={handleFacebookLogin}
                        />
                  </DialogContent>
            </Dialog>
      );
}