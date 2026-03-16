import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import type { OrderInfo } from "@/types/user";

type OrderDetailsModalProps = {
	open: boolean;
	onClose: () => void;
	order: OrderInfo;
};

export default function NotifOrderDetailsModal({
	open,
	onClose,
	order,
}: OrderDetailsModalProps) {
	if (!order) return null;

	const statusColors: Record<string, string> = {
		Delivered: "bg-emerald-100 text-emerald-800",
		"In Transit": "bg-amber-100 text-amber-800",
		Cancelled: "bg-red-100 text-red-800",
		Pending: "bg-blue-100 text-blue-800",
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
			<DialogHeader>
				<DialogTitle>Order Details</DialogTitle>
			</DialogHeader>

			{/* Product Info */}
			<div className="mt-4 space-y-4">
				{order.items.map((item) => (
				<div key={item.id} className="flex gap-4 items-center">
				<img
					src={item.image}
					alt={item.name}
					className="w-20 h-20 object-cover rounded-lg"
				/>
				<div>
					<h3 className="font-bold">{item.name}</h3>
					<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
					<p className="text-sm text-gray-700 font-semibold">
					₱{(item.price * item.quantity!).toFixed(2)}
					</p>
				</div>
				</div>
				))}
			</div>

			{/* Order Info */}
			<div className="mt-4 space-y-2 text-sm">
				<p>
				<span className="font-medium">Order Date:</span> {order.date}
				</p>
				<p className="flex items-center gap-2">
				<span className="font-medium">Status:</span>
				<span
				className={`px-2 py-1 rounded-md text-xs ${
					statusColors[order.status] || "bg-gray-100 text-gray-800"
				}`}
				>
				{order.status}
				</span>
				</p>
				<p>
				<span className="font-medium">Total to Pay:</span>{" "}
				<span className="text-gray-800 font-semibold">
				₱{order.total.toFixed(2)}
				</span>
				</p>
			</div>
			</DialogContent>
		</Dialog>
	);
}