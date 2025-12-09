import type { orderDetailInterface } from '@nattugglan/orderconfirmationpage';

interface OrderHistoryListProps {
	orders: orderDetailInterface[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
	if (!orders || orders.length === 0) {
		return <p>Hittade ingen historik</p>;
	}

	const handleReorder = (orderId: string) => {
		console.log(`Vill återbeställa order: ${orderId}`);
		//här ska logik för att lägga till i varukorgen hamna
	};

	return (
		<div className="order__historyContainer">
			<h3>Tidigare Beställningar ({orders.length}) st</h3>

			{orders.map((order) => (
				<div key={order.orderNumber} className="order__card">
					<h4>Beställning #{order.orderNumber}</h4>
					<p>Datum: {new Date(order.createdAt).toLocaleDateString()}</p>
					<p>Totalt: {order.totalPrice} kr</p>

					<ul>
						{order.items.map((item, index) => (
							<li key={index}>
								{item.quantity} x {item.name}
							</li>
						))}
					</ul>

					<button
						onClick={() => handleReorder(order.orderNumber)}
						className="reorder-button"
					>
						Återbeställ denna order
					</button>
				</div>
			))}
		</div>
	);
}

export default OrderHistoryList;
