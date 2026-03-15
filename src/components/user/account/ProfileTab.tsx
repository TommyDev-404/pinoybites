import { useRef, useState } from "react";
import { Camera, Edit2 } from "lucide-react";
import { useUserContext } from "@/context/user/UserContext";


export default function ProfileTab({ user }: { user: any }) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { profileImage, handleSetProfileImage } = useUserContext();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];
		if (!file) return;
		
		// Preview image
		const reader = new FileReader();
		reader.onloadend = () => handleSetProfileImage(reader.result as string);
		reader.readAsDataURL(file);

	};

	const handleClick = () => {
	fileInputRef.current?.click();
	};
	
	const initials = user?.name
		?.split(" ")
		.map((n: string) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className="space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
					<p className="text-sm text-gray-500 mt-1">Manage your personal details.</p>
				</div>
				<button className="text-sm text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
					<Edit2 size={14} /> Edit Avatar
				</button>
			</div>

			<div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
				{/* Avatar */}
				<div
					className="relative group cursor-pointer"
					onClick={handleClick}
				>
					<div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold text-2xl shadow-md overflow-hidden">
						{profileImage ? (
							<img
								src={profileImage}
								alt="Avatar Preview"
								className="w-full h-full object-cover"
							/>
						) : (
							initials
						)}
					</div>

					{/* Camera Icon */}
					<div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-gray-200 group-hover:scale-110 transition-transform">
						<Camera size={14} className="text-gray-600" />
					</div>

					{/* Hidden File Input */}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
				</div>

				<div className="flex-1">
				<p className="text-sm font-medium text-gray-900">Profile Picture</p>
				<p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 800K</p>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
			<div className="space-y-2">
			<label className="text-sm font-medium text-gray-700">Full Name</label>
			<input defaultValue={user?.name} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"/>
			</div>
			<div className="space-y-2">
			<label className="text-sm font-medium text-gray-700">Email Address</label>
			<input defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"/>
			</div>
			<div className="md:col-span-2 space-y-2">
			<label className="text-sm font-medium text-gray-700">Bio</label>
			<textarea rows={3} placeholder="Tell us a little about yourself..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"/>
			</div>
			</div>
		</div>
	);
}