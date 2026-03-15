import { Bell } from "lucide-react";

export default function NotificationsTab() {
  const notifications = [
    { id: 1, message: "Your order #PB1023 has been delivered.", type: "success", date: "Oct 24, 2023" },
    { id: 2, message: "Your payment for order #PB1022 is confirmed.", type: "success", date: "Oct 21, 2023" },
    { id: 3, message: "Your order #PB1021 was cancelled.", type: "error", date: "Oct 18, 2023" },
  ];

  const typeColors: Record<string, string> = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    error: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">Recent updates about your account and orders.</p>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center gap-3 p-4 border rounded-xl ${typeColors[n.type]}`}>
            <Bell size={20} />
            <div>
              <p className="text-sm font-medium">{n.message}</p>
              <p className="text-xs text-gray-500">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}