import { Package } from "lucide-react";

export default function OrdersTab() {
  const orders = [
    { id: "PB1023", date: "Oct 24, 2023", items: "Pandesal, Turon", quantity: 2, total: 240, status: "Delivered" },
    { id: "PB1022", date: "Oct 20, 2023", items: "Coffee Beans (1kg)", quantity: 1, total: 650, status: "In Transit" },
    { id: "PB1021", date: "Oct 18, 2023", items: "Banana Cue", quantity: 3, total: 180, status: "Cancelled" },
  ];

  const statusColors: Record<string, string> = {
    Delivered: "bg-emerald-100 text-emerald-800",
    "In Transit": "bg-amber-100 text-amber-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <p className="text-sm text-gray-500 mt-1">Track your recent purchases.</p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Order #{order.id}</span>
              <span className="text-xs font-medium text-gray-500">{order.date}</span>
            </div>
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <Package size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.items}</p>
                  <p className="text-xs text-gray-500">{order.quantity} items</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <div className="text-right">
                  <p className="font-bold text-gray-900">₱{order.total}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}