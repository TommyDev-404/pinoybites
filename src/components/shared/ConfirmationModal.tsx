import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface LogoutModalProps {
      message: string;
      modalType: string;
      actionName: string;
      open: boolean;
      onClose: () => void;
      execFunc?: () => void;
}

export default function ConfirmationModal({ message, modalType, actionName, open, onClose, execFunc }: LogoutModalProps) {
      const { setModalOpen } = useModal();

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-sm">
                        <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                              {modalType !== 'logout' ? 
                                    <Trash2 size={20} className="text-red-600" />
                              :
                                    <LogOut size={20} className="text-red-600" /> 
                              }
                              {actionName}
                        </DialogTitle>
                        </DialogHeader>

                        <p className="text-sm text-gray-700 mt-2">{message}</p>

                        <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                              Cancel
                        </Button>
                        <Button 
                              variant="destructive" 
                              onClick={() => { 
                                    if (modalType === 'logout') {
                                          execFunc?.(); // call the logout function
                                          setModalOpen({ modalToOpen: 'logoutLoading' }); // show loading modal
                                    } else {
                                          execFunc?.(); // call other action
                                          onClose(); // close the modal
                                    }
                              }}
                        >
                              {actionName}
                        </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}