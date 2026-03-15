import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loading from "@/components/shared/Loading"
import AdminLayout from "@/layout/AdminLayout"
import Products from "@/pages/admin/Products"
import Customers from "@/pages/admin/Customers"
import Analytics from "@/pages/admin/Analytics"

const AdminLogin = lazy(() => import("@/components/admin/AdminLogin"))
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const AllOrders = lazy(() => import("@/pages/admin/AllOrders"))

export default function AdminRoutes() {
      return (
            <Suspense fallback={<Loading/>}>
                  <Routes>
                  
                        {/* redirect /admin -> /admin/login */}
                        <Route index element={<Navigate to="login" replace />} />
                        <Route path="login" element={<AdminLogin />} />

                        <Route path="/" element={<AdminLayout/>}>
                              <Route path="dashboard" element={<Dashboard />} />
                              <Route path="orders" element={<AllOrders />} />
                              <Route path="products" element={<Products />} />
                              <Route path="customers" element={<Customers />} />
                              <Route path="analytics" element={<Analytics />} />
                        </Route>

                  </Routes>
            </Suspense> 
      )
}