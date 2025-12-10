interface OrderTotalProps {
	name: string;
	totalPrice: number;
}

function OrderTotal({ name, totalPrice }: OrderTotalProps) {
	return (
		<div className="item__bottom">
			<p className="item__name">{name}</p>
			<p className="item__totalprice">Totalt: {totalPrice}:-</p>
		</div>
	);
}

export { OrderTotal };
