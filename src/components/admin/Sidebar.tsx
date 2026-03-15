import { useState } from "react";
import Logo from "../user/Logo";
import PinoyBitesLogo from '@/assets/PinoyBitesLogo.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
      LogOut,
      ChevronRight,
      type LucideIcon
} from 'lucide-react';
import toast from "react-hot-toast";
import type { Page, MenuItemsType } from "@/types/admin";
import { NavLink, useNavigate } from "react-router-dom";
import { usePageHeader } from "@/context/AdminHeaderContext";

interface SidebarProps{
      menuItems: MenuItemsType[];
}

export default function Sidebar({ menuItems } : SidebarProps){
      const { handleSetHeader } = usePageHeader();
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const navigate = useNavigate();
      
      const adminUser = localStorage.getItem('adminUser') || 'Admin';
      
      const handleLogout = () => {
            localStorage.removeItem('adminAuth');
            localStorage.removeItem('adminUser');
            toast.success('Logged out successfully');

            navigate('/admin/login');
      };

      return (
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
                  {/* Logo Section */}
                  <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 relative">
                        {sidebarOpen ? (
                              <Logo size="sm" />
                        ) : (
                              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mx-auto">
                                    <img src={PinoyBitesLogo} width={60} height={60}/>
                              </div>
                        )}
                        
                        {/* Toggle Button */}
                        <button
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              className="absolute -right-3  w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                        >
                              <ChevronRight size={14} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
                        </button>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                              const Icon = item.icon;
                              
                              return (
                                    <NavLink
                                          key={item.id}
                                          to={item.path}
                                          className={({ isActive }) =>
                                                `w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                                                      isActive
                                                      ? "bg-amber-50 text-amber-600 font-semibold"
                                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`
                                          }
                                          
                                          onClick={() => handleSetHeader(item.id)} // only set header when clicked
                                    >
                                          <Icon size={20} className="shrink-0" />

                                          {sidebarOpen && (
                                                <>
                                                      <span className="flex-1 text-left">{item.label}</span>

                                                      {item.badge !== undefined && item.badge > 0 && (
                                                      <Badge className="bg-red-500 text-white">
                                                      {item.badge}
                                                      </Badge>
                                                      )}
                                                </>
                                          )}
                                    </NavLink>
                              );
                        })}
                  </nav>

                  {/* User Section */}
                  <div className="border-t border-gray-200 p-4">
                        {sidebarOpen ? (
                              <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {adminUser.charAt(0).toUpperCase()}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{adminUser}</p>
                                                <p className="text-xs text-gray-500">Administrator</p>
                                          </div>
                                    </div>
                                    <Button 
                                          variant="outline" 
                                          onClick={handleLogout}
                                          className="w-full justify-start"
                                          size="sm"
                                    >
                                          <LogOut size={16} className="mr-2" />
                                          Logout
                                    </Button>
                              </div>
                        ) : (
                              <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleLogout}
                                    className="w-full"
                              >
                                    <LogOut size={20} />
                              </Button>
                        )}
                  </div>
            </aside>

      );    
}