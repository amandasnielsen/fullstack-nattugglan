interface OrderTotalProps {
	totalPrice: number;
}

function OrderTotal({ totalPrice }: OrderTotalProps) {
	return (
		<div className="item__bottom">
			<p className="item__totalprice">Totalt: {totalPrice}:-</p>
		</div>
	);
}

export { OrderTotal };
