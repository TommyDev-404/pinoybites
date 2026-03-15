import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import PlaySound from "@/utils/PlaySound";
import { useAuth } from "@/context/AuthContext";
import { capitalizeWords } from "@/utils/helper";
import google from '@/assets/google.png';
import facebook from '@/assets/facebook.webp';
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import {
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";

type RegisterForm = {
      name: string;
      email: string;
      password: string;
};    

export default function RegisterPage() {
      const { register } = useAuth();
      const navigate = useNavigate();

      const [ showPassword, setShowPassword ] = useState<boolean>(false);
      const [ loading, setLoading ] = useState<boolean>(false);
      const [ formData, setFormData ] = useState<RegisterForm>({
            name: '',
            email: '',
            password: ''
      });

      const handleGoogleLogin = () => {
            // Replace this with Google OAuth logic
            alert("Google login clicked");
      };

      const handleFacebookLogin = () => {
            // Replace this with Facebook OAuth logic
            alert("Facebook login clicked");
      };

      const handleSubmit = (e: React.SyntheticEvent) => {
            e.preventDefault();
            setLoading(true);

            setTimeout(() => {
                  // Save user via AuthContext
                  register({
                        email: formData.email,
                        password: formData.password,
                        name: formData.name
                  });
                  toast.success('Account created successfully!');
                  setLoading(false);
                  PlaySound();

                  // Navigate to login page after signup
                  navigate("/auth/login");
            }, 1500); 
      };

      return (
            <AuthLayout>
                  <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                              Create Your Account
                        </CardTitle>

                        <CardDescription>
                        Fill in your details to register and remember it.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                  
                        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                              <Input 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({ ...formData, name: capitalizeWords(e.target.value) })}
                                    type="text" 
                                    placeholder="Full Name" 
                                    required 
                                    style={{ textTransform: 'capitalize'}}
                                    className="py-5"
                              />
                              <Input 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    className="py-5"
                              />
                              <div className="relative w-full">
                                    <Input
                                          value={formData.password} 
                                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                          type={showPassword ? "text" : "password"}
                                          placeholder="Password"
                                          required
                                          className="pr-10 py-5" // extra padding for the icon
                                    />
                                          <Button
                                                type="button"
                                                variant="ghost"
                                                className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                                                onClick={() => setShowPassword(!showPassword)}
                                          >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                          </Button>
                              </div>

                              <Button 
                                    type="submit" 
                                    className="w-full py-5 mt-4"
                              >
                                    {loading ? 
                                          <>
                                                <Loader2Icon className="w-4 h-4 text-white animate-spin"/>
                                                Creating...
                                          </>
                                    :
                                          'Sign Up'
                                    }
                              </Button>
                              
                              <div className="flex items-center justify-center gap-2 ">
                                    <span className="text-gray-400">or</span>
                              </div>

                              <div className="flex flex-col space-y-2 mt-2">
                                    <Button variant="outline" onClick={handleGoogleLogin} className="w-full  flex items-center justify-between gap-2 py-5">
                                          <img src={google} alt="Google" className="w-5 h-5" />
                                          Continue with Google
                                          <div/>
                                    </Button>
                                    <Button variant="outline" onClick={handleFacebookLogin} className="w-full flex items-center justify-between gap-2 py-5">
                                          <img src={facebook} alt="Facebook" className="w-5 h-5" />
                                          Continue with Facebook
                                          <div/>
                                    </Button>
                              </div>

                              {/* Switch to Login */}
                              <div className="text-center mt-4 text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <button type="button" className="text-amber-600 hover:underline font-medium" onClick={() => { navigate('/auth/login')}}>
                                    Login
                                    </button>
                              </div>
                        </form>
                  </CardContent>  
            </AuthLayout>
      );
}