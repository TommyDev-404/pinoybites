import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

// USER PAGES
const Home = lazy(() => import('@/pages/user/Home'))
const Products = lazy(() => import('@/pages/user/Products'))
const Contact = lazy(() => import('@/pages/user/Contact'))
const Cart = lazy(() => import('@/pages/user/Cart'))
const Orders = lazy(() => import('@/pages/user/Orders'))
const OrderSuccess = lazy(() => import('@/pages/user/OrderSuccess'))
const AccountSettings = lazy(() => import('@/pages/user/Account'))
import ForgotPasswordPage from "@/pages/user/ForgotPassword"
import SiteLayout from "@/layout/SIteLayout"
import ResetPassword from "@/pages/user/ResetPassword"
import Login from "@/pages/user/Login"
import RegisterPage from "@/pages/user/Register"
import NotificationsPage from "@/pages/user/Notifications"

export default function UserRoutes() {
      return (
            <Routes>
                  <Route path="/auth">
                        <Route path="login" element={<Login/>}/>
                        <Route path="create-account" element={<RegisterPage/>}/>
                        <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="reset-password" element={<ResetPassword/>}/>
                  </Route>
                  
                  <Route path="/" element={<SiteLayout/>}>
                        <Route path="home" element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="order-success" element={<OrderSuccess />} />
                        <Route path="account" element={<AccountSettings />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                  </Route>
            </Routes>
      )
}