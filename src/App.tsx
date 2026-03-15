import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Loading from "./components/shared/Loading"
import ScrollToTop from "./hooks/useOnTopView"

// USER SECTION
const UserRoutes = lazy(() => import('@/routes/UserRoutes'))

// ADMIN SECTION
const AdminRoutes = lazy(() => import('@/routes/AdminRoutes'))

export default function App() {
	return (
		<Suspense fallback={<Loading />}>
			<ScrollToTop />
			
			<Routes>
				{/* USER ROUTES */}
				<Route path="/*" element={<UserRoutes/>}/>

				{/* ADMIN ROUTES */}
				<Route path="/admin/*" element={<AdminRoutes />} />
			</Routes>
		</Suspense>
	)
}