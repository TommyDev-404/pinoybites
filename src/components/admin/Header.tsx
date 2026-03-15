import type { MenuItemsType } from "@/types/admin";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageHeader } from "@/context/admin/AdminHeaderContext";

interface HeaderProps {
      menuItems: MenuItemsType[];
}

export default function Header({ menuItems } : HeaderProps){
      const { header } = usePageHeader();

      return (
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                  <div>
                        <h1 className="text-xl font-bold text-gray-900">
                              {menuItems.find(item => item.id === header)?.label}
                        </h1>
                        <p className="text-xs text-gray-500">
                              {header === 'dashboard' && 'Overview of your business'}
                              {header === 'orders' && 'Manage customer orders'}
                              {header === 'products' && 'Manage product catalog'}
                              {header === 'customers' && 'View customer information'}
                              {header === 'analytics' && 'Business insights and reports'}
                        </p>
                  </div>
                  <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative">
                              <Bell size={20} />
                              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>
                        <Button variant="ghost" size="icon">
                              <Settings size={20} />
                        </Button>
                  </div>
            </header>
      );
}