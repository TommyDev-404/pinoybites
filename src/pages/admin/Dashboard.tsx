import RecentActivity from '@/components/admin/dashboard/RecentActivity';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import TopPerformingProducts from '@/components/admin/dashboard/TopPerformingProducts';
import { mockProducts, mockOrders} from '@/utils/SampleData';

export default function Dashboard(){
      // Calculate stats
      const totalOrders = mockOrders.length;
      const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
      const totalRevenue = mockOrders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
      const todayOrders = mockOrders.filter(o => o.date === '2026-03-08').length;

      return (
            <div className="space-y-6">
                  {/* Stats Grid */}
                  <StatsGrid 
                        totalOrders={totalOrders}
                        todayOrders={todayOrders}
                        pendingOrders={pendingOrders}
                        totalRevenue={totalRevenue}
                  />
            
                  {/* Recent Activity */}
                  <RecentActivity
                        products={mockProducts}
                        orders={mockOrders}
                  />
            
                  {/* Top Performers */}
                  <TopPerformingProducts products={mockProducts}/>
            </div>
      );    
}
