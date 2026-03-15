import { Loader2 } from "lucide-react";

type OverlaySpinnerProps = {
      message: String;
};

export default function OverlaySpinner({ message } : OverlaySpinnerProps) {
      
      return (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="flex flex-col items-center space-y-4 bg-white dark:bg-stone-800 px-8 py-6 rounded-2xl shadow-xl">
                        
                        <div className="flex space-x-2">
                              <Loader2 className="animate-spin text-amber-600 w-10 h-10"/>
                        </div>
            
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 tracking-wide">
                              {message}
                        </p>
            
                  </div>
            </div>
      );
}