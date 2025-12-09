interface OrderActionsProps {
	guestId: string;
	formattedDate: string;
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Done' | 'Cancelled';
	isChange: boolean;
	doneChange: () => Promise<void>;
	changeOrder: () => void;
	cancellOrder: () => Promise<void>;
}

function OrderActions({
	guestId,
	formattedDate,
	status,
	isChange,
	doneChange,
	changeOrder,
	cancellOrder,
}: OrderActionsProps) {
	return (
		<article className="Confirmation__info">
			<section className="Confirmation__info-top">
				<p>guestId: {guestId}</p>
				<p>{formattedDate}</p>
			</section>

			<section className="Confirmation__info-bottom">
				<div className="Confirmation__info-left">
					{status === 'Pending' && (
						<button
							className="Confirmation__btn Confirmation__btn-change"
							onClick={isChange ? doneChange : changeOrder}
						>
							{isChange ? 'Bekräfta' : 'Ändra beställning'}
						</button>
					)}
				</div>

				<div className="Confirmation__info-right">
					{isChange ? (
						<button
							className="Confirmation__btn Confirmation__btn-cancell"
							onClick={cancellOrder}
						>
							Avbryt Beställning
						</button>
					) : (
						<div className="Confirmation__status">
							<p>Status</p>
							<p>{status}</p>
						</div>
					)}
				</div>
			</section>
		</article>
	);
}

export { OrderActions };
