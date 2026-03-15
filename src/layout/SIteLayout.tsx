import Header from '@/components/user/Header'
import Footer from '@/components/user/Footer'
import { Outlet } from 'react-router-dom'

export default function SiteLayout() {
      return (
            <div className="min-h-screen bg-gray-50 overflow-x-hidden">
                  <Header />
                        <main>
                              <Outlet/>
                        </main>
                  <Footer />
            </div>
      )
}