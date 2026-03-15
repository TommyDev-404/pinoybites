import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import 'leaflet/dist/leaflet.css';
import { ModalProvider } from '@/context/ModalContext.tsx';
import ModalDisplayer from '@/utils/ModalDisplayer.tsx';
import { AuthProvider } from '@/context/AuthContext.tsx';
import { CartProvider } from '@/context/CartContext.tsx';
import { Toaster } from "react-hot-toast";
import { PageHeaderProvider } from '@/context/AdminHeaderContext.tsx'
import { ProfileImageProvider } from '@/context/ProfileImageContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<PageHeaderProvider>
				<ModalProvider>
					<AuthProvider>
						<ProfileImageProvider>
							<CartProvider>
								<Toaster
									position="top-right" // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
									reverseOrder={false}  // newest on top or bottom
									toastOptions={{
										duration: 1500,       // default duration in ms
										style: {
											borderRadius: '8px',
											padding: '12px 16px',
											fontWeight: '500',
											fontSize: '17px'
										}
									}}
								/>
								<App />
								<ModalDisplayer />
							</CartProvider>
						</ProfileImageProvider>
					</AuthProvider>
				</ModalProvider>
			</PageHeaderProvider>
		</BrowserRouter>
	</StrictMode>
)

