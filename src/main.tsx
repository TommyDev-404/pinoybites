import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import 'leaflet/dist/leaflet.css';
import { ModalProvider } from '@/context/user/ModalContext';
import ModalDisplayer from '@/utils/ModalDisplayer.tsx';
import { AuthProvider } from '@/context/user/AuthContext';
import { Toaster } from "react-hot-toast";
import { PageHeaderProvider } from '@/context/admin/AdminHeaderContext'
import { UserContextProvider } from './context/user/UserContext'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<PageHeaderProvider>
				<ModalProvider>
					<UserContextProvider>
						<AuthProvider>
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
						</AuthProvider>
					</UserContextProvider>
				</ModalProvider>
			</PageHeaderProvider>
		</BrowserRouter>
	</StrictMode>
)

