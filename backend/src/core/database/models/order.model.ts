import { model, Schema, Document } from 'mongoose';

export interface CartItem {
	_id: string;
	name: string;
	ingredients: string[];
	price: number;
	category: string;
	available: boolean;
	quantity: number;
}

const cartItemSchema = new Schema<CartItem>({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	ingredients: { type: [String], required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	available: { type: Boolean, required: true },
	quantity: { type: Number, required: true },
});

export interface OrderInterface extends Document {
	orderNumber: string;
	guestId: string;
	items: CartItem[];
	totalPrice: number;
	createdAt: Date;
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Delivered' | 'Cancelled';
}

const OrderSchema: Schema = new Schema({
	orderNumber: { type: String, required: true, unique: true },
	guestId: { type: String, required: true },
	items: { type: [cartItemSchema], required: true },
	totalPrice: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: ['Pending', 'Confirmed', 'Ready', 'Delivered', 'Cancelled'],
		default: 'Pending',
	},
});

export const OrderModel = model<OrderInterface>('Order', OrderSchema);
