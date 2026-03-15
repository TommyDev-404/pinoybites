import { User, LogOut, Moon, Bell } from 'lucide-react';
import {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch"; // assuming you have a switch component
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useModal } from '@/context/user/ModalContext';
import { useAuth } from '@/context/user/AuthContext';
import { useUserContext } from '@/context/user/UserContext';


export default function UserMenu() {
      const { user, logout } = useAuth();
      const { profileImage } = useUserContext();
      const { setModalOpen } = useModal();
      const [darkMode, setDarkMode] = useState(false);

      const toggleDarkMode = () => setDarkMode(!darkMode);

      const stored = localStorage.getItem('notifications');
      const notifications: Notification[] = stored ? JSON.parse(stored) : [];

      const notifCount = notifications.length;

      const avatarName = user?.name!
            .split(" ")
            .slice(0, 2)
            .map(word => word[0])
            .join("")
            .toUpperCase();

      const handleLogout = () => {
            setModalOpen({ 
                  modalToOpen: 'logoutConfirmation',
                  message: 'Are you sure you want to logout? You will be signed out after this.',
                  modalType: 'logout',
                  actionName: 'Logout',
                  function: logout
            });
      };

      return (
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer relative group">
                              {profileImage ? (
                                    <img
                                          src={profileImage}
                                          alt="Avatar Preview"
                                          className="w-full h-full object-cover"
                                    />
                              ) : (
                                    <span className="uppercase">{avatarName}</span>
                              )}
                        </div>
                  </DropdownMenuTrigger>
            

                  <DropdownMenuContent  align="end" className="w-52">
                        {/* Account Section */}

                        <p className="px-4 py-1 text-xs text-stone-400">Personal</p>

                        <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <NavLink to="/account" className="flex items-center w-full justify-between">
                                    <div className="flex items-center">
                                          <User className="w-4 h-4 mr-4" /> Account
                                    </div>
                              </NavLink>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />

                        {/* Preferences Section */}
                        <p className="px-4 py-1 text-xs text-stone-400">Preferences</p>
                        
                        <DropdownMenuItem onClick={() => setModalOpen({ modalToOpen: 'notifications' })} className="cursor-pointer flex items-center justify-between py-3">
                              <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                          <Bell className="w-4 h-4 mr-4" />
                                          Notifications
                                    </div>

                                    {/* Perfect circle badge */}
                                    {notifCount > 0 && (
                                          <span className="ml-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                                                {notifCount}
                                          </span>
                                    )}
                              </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='py-3'>
                              <div onClick={(e) => e.stopPropagation()} className='w-full cursor-pointer flex items-center justify-between'>
                                    <div  className="flex items-center">
                                          <Moon className="w-4 h-4 mr-4" />
                                          Dark Mode
                                    </div>
                                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                              </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Logout */}
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 py-3">
                              <LogOut className="w-4 h-4 mr-4" /> Logout
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      );
}