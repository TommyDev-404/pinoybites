import { ShieldCheck } from "lucide-react";

export default function SecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Update your password and security preferences.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"/>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"/>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"/>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security</p>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          Update Password
        </button>
      </div>
    </div>
  );
}