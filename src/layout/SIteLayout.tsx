import Header from '@/components/user/Header'
import Footer from '@/components/user/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/context/user/AuthContext';

export default function SiteLayout() {
      const { user } = useAuth();

      return (
            <div className="min-h-screen overflow-x-hidden">
                  <Header />
                        <main>
                              <Outlet/>
                        </main>
                  {!user && <Footer />}
            </div>
      )
}