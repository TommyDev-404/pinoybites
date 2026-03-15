import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/user/Logo';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
      username: string;
      password: string;
}

export default function AdminLogin() {
      const [showPassword, setShowPassword] = useState(false);
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();

      const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

      const onSubmit = async (data: LoginFormData) => {
            setIsLoading(true);
            setError('');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Demo credentials
            if (data.username === 'admin' && data.password === 'admin123') {
                  localStorage.setItem('adminAuth', 'true');
                  localStorage.setItem('adminUser', data.username);
                  navigate('/admin/dashboard');
            } else {
                  setError('Invalid username or password');
            }

            setIsLoading(false);
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
                  <div className="w-full max-w-md">
                  {/* Logo */}
                  <div className="flex justify-center mb-8">
                        <Logo/>
                  </div>

                  <Card className="shadow-2xl border-2 border-amber-200">
                        <CardHeader className="text-center space-y-2">
                              <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                                          <Lock className="text-white" size={32} />
                                    </div>
                              </div>
                              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                              <CardDescription>
                                    Enter your credentials to access the admin dashboard
                              </CardDescription>
                        </CardHeader>

                        <CardContent>
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {error && (
                                          <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                          </Alert>
                                    )}

                                    <div className="space-y-2">
                                          <Label htmlFor="username">Username</Label>
                                          <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                      id="username"
                                                      type="text"
                                                      placeholder="Enter username"
                                                      className="pl-10"
                                                      {...register('username', { required: 'Username is required' })}
                                                />
                                          </div>
                                          {errors.username && (
                                                <p className="text-sm text-red-600">{errors.username.message}</p>
                                          )}
                                    </div>

                                    <div className="space-y-2">
                                          <Label htmlFor="password">Password</Label>
                                          <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                      id="password"
                                                      type={showPassword ? 'text' : 'password'}
                                                      placeholder="Enter password"
                                                      className="pl-10 pr-10"
                                                      {...register('password', { required: 'Password is required' })}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                          </div>
                                          {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password.message}</p>
                                          )}
                                    </div>

                                    <Button
                                          type="submit"
                                          className="w-full bg-amber-600 hover:bg-amber-700"
                                          disabled={isLoading}
                                    >
                                          {isLoading ? 'Logging in...' : 'Login'}
                                    </Button>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                                          <p className="text-xs text-blue-900 font-semibold mb-1">Demo Credentials:</p>
                                          <p className="text-xs text-blue-700">Username: <code className="bg-blue-100 px-1 rounded">admin</code></p>
                                          <p className="text-xs text-blue-700">Password: <code className="bg-blue-100 px-1 rounded">admin123</code></p>
                                    </div>
                              </form>
                        </CardContent>
                  </Card>

                  <p className="text-center text-sm text-gray-600 mt-6">
                        © 2026 Pinoy Bites. All rights reserved.
                  </p>
                  </div>
            </div>
      );
}
