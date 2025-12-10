import { type CartItem } from '@nattugglan/core';

interface GroupedItems {
	[category: string]: CartItem[];
}

interface OrderItemsListProps {
	sortedCategories: string[];
	itemsByCategory: GroupedItems;
	isChange: boolean;
	updateLocalQuantity: (id: string, newQty: number) => void;
}

function OrderItemsList({
	sortedCategories,
	itemsByCategory,
	isChange,
	updateLocalQuantity,
}: OrderItemsListProps) {
	return (
		<section className="Confirmation__itemList">
			{sortedCategories.map((categoryName) => (
				<div key={categoryName} className="item__cards">
					<h3 className="item__categoryName">{categoryName}</h3>

					{itemsByCategory[categoryName].map((item, index) => (
						<div key={index} className="item__items">
							<p>{item.name}</p>

							{!isChange && (
								<p>
									{item.quantity}st {item.price}:-
								</p>
							)}

							{/* Visa ändringar när man är i ändringsläge */}
							{isChange && (
								<div className="change__container">
									<p>{item.price}:-</p>

									<div className="change__button-container">
										<button
											className="quantity__button"
											onClick={() =>
												updateLocalQuantity(item._id, item.quantity - 1)
											}
										>
											-
										</button>

										<span>{item.quantity}</span>

										<button
											className="quantity__button"
											onClick={() =>
												updateLocalQuantity(item._id, item.quantity + 1)
											}
										>
											+
										</button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			))}
		</section>
	);
}

export { OrderItemsList };
