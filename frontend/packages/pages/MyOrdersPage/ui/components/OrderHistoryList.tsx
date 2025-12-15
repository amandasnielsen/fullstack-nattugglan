import './OrderHistoryList.css';
import type { orderDetailInterface } from '@nattugglan/orderconfirmationpage';
import type { CartItem } from '@nattugglan/core';
import { useCartStore } from '@nattugglan/core';
import { Link } from 'react-router-dom';

interface OrderHistoryListProps {
	orders: orderDetailInterface[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
	// const [ message, setMessage ] = useState("")
	const { addItem } = useCartStore();
	if (!orders || orders.length === 0) {
		return <p>Hittade ingen historik</p>;
	}

	// const setCancellationMessage = () => {
	// 	setMessage()
	// }

	const handleReorder = (itemsToReorder: CartItem[]) => {
		itemsToReorder.forEach((item) => {
			for(let i = 0; i < item.quantity; i++) {
				addItem(item);
			}
		});
	};

	console.log(orders)

	return (
		<div className="orderHistory__cardContainer">
			{orders.map((order) => (
				<div key={order.orderNumber} className="orderHistory__card">
					<div className="orderHistory__card-top">
						<Link
							className="orderHistory__card-link"
							to={`/order/${order.orderNumber}`}
						>
							<h4>#{order.orderNumber}</h4>
						</Link>
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
						<div className="orderHistory__card-bottom-text">
						{order.cancellationReason && (
							<p className="orderHistory__cancellationReason">
								<b>Avbokad:</b> {order.cancellationReason}
							</p>
						)}
						<p><b>Totalt:</b> {order.totalPrice} kr</p>
						</div>
						<button
							onClick={() => handleReorder(order.items)}
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
