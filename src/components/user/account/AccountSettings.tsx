import { useState } from "react";
import { User, Lock, MapPin, Package, Bell } from "lucide-react";
import { useAuth } from "@/context/user/AuthContext";

import ProfileTab from "@/components/user/account/ProfileTab";
import SecurityTab from "@/components/user/account/SecurityTab";
import AddressesTab from "@/components/user/account/AddressTab";
import { motion } from "framer-motion";

// --- Types ---
type TabId = "profile" | "security" | "addresses" | "orders" | "notifications";

interface MenuItem {
      id: TabId;
      label: string;
      icon: React.ElementType;
}

export default function AccountSettings() {
      const { user } = useAuth();
      const [tab, setTab] = useState<TabId>("profile");

      const menu: MenuItem[] = [
            { id: "profile", label: "Profile", icon: User },
            { id: "security", label: "Security", icon: Lock },
            { id: "addresses", label: "Addresses", icon: MapPin }
      ];

      const renderContent = () => {
            switch (tab) {
                  case "profile": return <ProfileTab user={user} />;
                  case "security": return <SecurityTab />;
                  case "addresses": return <AddressesTab />;
                  case "orders": return <OrdersTab />;
                  case "notifications": return <NotificationsTab />;
                  default: return null;
            }
      };

      return (
            <div className="max-w-6xl mx-auto px-4 py-20 h-190">
                  <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
                  <div className="grid md:grid-cols-[240px_1fr] gap-8">
                        {/* Sidebar */}
                        <div className="border rounded-xl p-3 bg-white h-fit shadow-sm">
                              {menu.map((item) => {
                              const Icon = item.icon;
                              return (
                              <motion.button
                                    key={item.id}
                                    onClick={() => setTab(item.id)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm transition
                                          ${tab === item.id
                                          ? "bg-amber-50 text-amber-600 font-medium"
                                          : "hover:bg-gray-50 text-gray-700"
                                          }`}
                              >
                                    <Icon size={18} />
                                    {item.label}
                              </motion.button>
                              );
                              })}
                        </div>

                        {/* Content */}
                        <div className="border rounded-xl p-6 bg-white shadow-sm min-h-100 overflow-auto">
                              <motion.div
                                    key={tab} // key ensures animation triggers on tab change
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                              >
                                    {renderContent()}
                              </motion.div>
                        </div>
                  </div>
            </div>
      );
}