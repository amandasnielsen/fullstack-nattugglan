import './OrderHistoryList.css';
import type { orderDetailInterface } from '@nattugglan/orderconfirmationpage';
import type { CartItem } from '@nattugglan/core';
import { useCartStore } from '@nattugglan/core';
import { useNavigate } from 'react-router-dom';

interface OrderHistoryListProps {
	orders: orderDetailInterface[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
	const { addItem } = useCartStore();
	const navigate = useNavigate();
	if (!orders || orders.length === 0) {
		return <p>Hittade ingen historik</p>;
	}

	const handleReorder = (orderId: string, itemsToReorder: CartItem[]) => {
		itemsToReorder.forEach((item) => {
			addItem(item);
		});
		console.log(`Vill återbeställa order: ${orderId}.`);
	};

	return (
		<div className="orderHistory__cardContainer">
			{orders.map((order) => (
				<div key={order.orderNumber} className="orderHistory__card">
					<div className="orderHistory__card-top">
						<h4>#{order.orderNumber}</h4>
						<p>{new Date(order.createdAt).toLocaleDateString()}</p>
					</div>

					<ul className="orderHistory__cardList">
						{order.items.map((item, index) => (
							<li key={index} className="orderHistory__cardListItem">
								<p>
									{item.quantity} x {item.name}
								</p>
								<p>{item.price} :-</p>
							</li>
						))}
					</ul>
					<div className="orderHistory__card-bottom">
						<p>Totalt: {order.totalPrice} kr</p>
						<button
							onClick={() => handleReorder(order.orderNumber, order.items)}
							className="reorder-button"
						>
							Beställ igen!
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default OrderHistoryList;
