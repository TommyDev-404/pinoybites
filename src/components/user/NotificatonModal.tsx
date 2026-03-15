import { Bell, Inbox, X } from "lucide-react";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog"; // shadcn dialog
import type { Notification } from "@/types/admin";

interface NotificationsModalProps {
      open: boolean;
      onClose: (open: boolean) => void;
}

export default function NotificationsModal({ open, onClose }: NotificationsModalProps) {
      const typeColors: Record<string, string> = {
            success: "bg-emerald-50 border-emerald-200 text-emerald-700",
            error: "bg-red-50 border-red-200 text-red-700",
      };

      const savedNotification = localStorage.getItem('notifications');
      const notifications: Notification[] = savedNotification ? JSON.parse(savedNotification) : [];

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="w-100 p-0">
                        <DialogHeader className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                                    <Bell size={20} /> Notifications
                              </DialogTitle>
                              <DialogDescription>
                                    View all recent notifications.
                              </DialogDescription>
                        </DialogHeader>

                        <div className="max-h-100 overflow-y-auto">
                              {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 h-80">
                                          <Inbox size={36} className="opacity-60" />
                                          <span className="text-sm">No notifications</span>
                                    </div>
                              ) : (
                                    <div className="space-y-2 pb-4 px-4">
                                          {notifications.map((n, index) => (
                                                <div
                                                      key={index}
                                                      className={`flex items-start gap-3 p-3 border rounded-lg ${typeColors[n.type]}`}
                                                >
                                                      <Bell size={20} className="mt-1" />
                                                      <div>
                                                            <p className="text-sm font-medium">{n.message}</p>
                                                            <p className="text-xs text-gray-500">{n.date}</p>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </div>
                  </DialogContent>
            </Dialog>
      );
}