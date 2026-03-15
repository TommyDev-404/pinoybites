import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import PlaySound from "@/utils/PlaySound";
import toast from "react-hot-toast";
import LoginForm from "@/components/user/authentication/LoginForm";

type LoginForm = {
      email: string;
      password: string;
};

type LoadingState = "idle" | "validating";

export default function Login() {
      const { login } = useAuth();
      const { setModalOpen } = useModal();
      const navigate = useNavigate();

      const [showPassword, setShowPassword] = useState(false);
      const [loadingState, setLoadingState] = useState<LoadingState>("idle");

      // Use useForm
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<LoginForm>();

      const onSubmit: SubmitHandler<LoginForm> = async (data) => {
            setLoadingState("validating");

            setTimeout(() => {
                  const success = login({
                        email: data.email,
                        password: data.password,
                        name: "", // optional
                  });

                  setLoadingState("idle");

                  if (success) {
                        setModalOpen({ modalToOpen: "loginLoading" });

                        setTimeout(() => {
                              toast.success("Welcome back!");
                              PlaySound();
                              setModalOpen({ modalToOpen: null });
                              navigate("/products");
                        }, 700);
                  } else {
                        toast.error("Invalid email or password!");
                        PlaySound();
                  }
            }, 500);
      };

      const handleGoogleLogin = () => {
            alert("Google login clicked");
      };

      const handleFacebookLogin = () => {
            alert("Facebook login clicked");
      };

      return (
            <AuthLayout>
                  <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Login Account</CardTitle>
                        <CardDescription>
                              Welcome back! Login your account and enjoy ordering.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        <LoginForm
                              formUsage={"page"}
                              onSubmit={onSubmit}
                              handleSubmit={handleSubmit} 
                              register={register}
                              errors={errors}
                              showPassword={showPassword}
                              setShowPassword={setShowPassword}
                              loadingState={loadingState}
                              navigate={navigate}
                              handleGoogleLogin={handleGoogleLogin}
                              handleFacebookLogin={handleFacebookLogin}
                        />
                  </CardContent>
            </AuthLayout>
      );
}