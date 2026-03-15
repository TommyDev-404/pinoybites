import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "@/assets/google.png";
import facebook from "@/assets/facebook.webp";
import type{ SubmitHandler, UseFormRegister, FieldErrors } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";

interface LoginFormFields {
      email: string;
      password: string;
}

interface LoginFormProps {
      formUsage: 'modal' | 'page';
      onSubmit: SubmitHandler<LoginFormFields>;
      handleSubmit: (fn: SubmitHandler<LoginFormFields>) => (e?: React.BaseSyntheticEvent) => Promise<void> | void;
      register: UseFormRegister<LoginFormFields>;
      errors: FieldErrors<LoginFormFields>;
      showPassword: boolean;
      setShowPassword: (show: boolean) => void;
      loadingState: "idle" | "validating";
      navigate?: NavigateFunction;
      handleGoogleLogin: () => void;
      handleFacebookLogin: () => void;
}

export default function LoginForm({
      formUsage,
      onSubmit,
      handleSubmit,
      register,
      errors,
      showPassword,
      setShowPassword,
      loadingState,
      navigate,
      handleGoogleLogin,
      handleFacebookLogin,
}: LoginFormProps) {

      return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div className="flex flex-col space-y-2">
                        <Input
                              type="email"
                              placeholder="Email"
                              className="py-5"
                              {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                        <div className="relative w-full">
                              <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="pr-10 py-5"
                                    {...register("password", { required: "Password is required" })}
                              />
                              {errors.password && (
                                    <span className="text-red-500 text-sm absolute -bottom-5 left-0">{errors.password.message}</span>
                              )}

                              <Button
                                    type="button"
                                    variant="ghost"
                                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                              >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </Button>
                        </div>
                  </div>

                  <div className="flex justify-end">
                        <p
                              onClick={() => {
                                    if (formUsage === 'page') {
                                          navigate?.("/auth/forgot-password");
                                    } else {
                                          window.location.href = "/auth/forgot-password";
                                    }
                              }}
                              className="text-xs text-stone-600 hover:underline cursor-pointer"
                        >
                              Forgot Password?
                        </p>
                  </div>

                  <Button
                        type="submit"
                        className={`w-full py-5 ${
                        loadingState === "validating" ? "bg-amber-600 pointer-events-none" : "bg-amber-500 hover:bg-amber-600"}`}
                  >
                        {loadingState === "idle" && "Login"}
                        {loadingState === "validating" && (
                              <>
                                    <Loader2Icon className="w-4 h-4 animate-spin text-white mr-2" />
                                    Validating...
                              </>
                        )}
                  </Button>

                  <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400">or</span>
                  </div>

                  <div className="flex flex-col space-y-2 mt-2">
                        <Button
                              variant="outline"
                              onClick={handleGoogleLogin}
                              className="w-full flex items-center justify-between gap-2 py-5"
                        >
                              <img src={google} alt="Google" className="w-5 h-5" />
                              Continue with Google
                              <div />
                        </Button>
                        <Button
                              variant="outline"
                              onClick={handleFacebookLogin}
                              className="w-full flex items-center justify-between gap-2 py-5"
                        >
                              <img src={facebook} alt="Facebook" className="w-5 h-5" />
                              Continue with Facebook
                              <div />
                        </Button>
                  </div>

                  <div className="text-center mt-4 text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <button
                              type="button"
                              className="text-amber-600 hover:underline font-medium"
                              onClick={() => {
                                    if (formUsage === 'page') {
                                          navigate?.("/auth/create-account");
                                    } else {
                                          window.location.href = "/auth/create-account";
                                    }
                              }}
                        >
                              Create account
                        </button>
                  </div>
            </form>
      );
}