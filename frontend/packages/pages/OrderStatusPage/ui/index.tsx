import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import { ContentContainer } from "@nattugglan/contentcontainer";
import { Button } from "@nattugglan/button";
import { useNavigate } from "react-router-dom";
import OwlChef from './assets/owl-chef.png';

interface OrderResponse {
  orderNumber: string;
  status: "Pending" | "Confirmed" | "Ready" | "Cancelled";
}

export function OrderStatusPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderNumber) {
      setError("Ingen order angiven.");
      return;
    }

    fetch(`http://localhost:3000/api/order/${orderNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order hittades inte");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setError(null);
      })
      .catch(() => {
        setError("Kunde inte hitta någon order.");
      });
  }, [orderNumber]);

  const steps = [
    { key: "Pending", label: "Din beställning väntar på att bli bekräftad" },
    { key: "Confirmed", label: "Vi lagar din mat" },
    { key: "Ready", label: "Din mat är redo för upphämtning!" },
  ];

    // === NO ORDER FOUND ===
    if (error || !order) {
      return (
        <>
          <NavBar />
          <Footer />
    
          <h1 className="status__title">
            Orderstatus
          </h1>
    
          <ContentContainer>
            <p className="status-cancelled">
              Du har inte gjort någon order än.</p>
              <p className="status-cancelled"> Gå in på menyn och välj något gott!
            </p>
            
          </ContentContainer>
          <div className="button__checkout-wrapper">
						<Button
							variant="secondary"
							fullWidth={true}
							className="button__checkout"
							onClick={() => navigate("/menu")}>
							Meny
					</Button>
				</div>
        </>
      );
    }

  // === CANCELLED ORDER ===
  if (order && order.status === "Cancelled") {
    return (
      <>
        <NavBar />
        <Footer />

        <h1 className="status__title">Orderstatus</h1>

        <ContentContainer>
          <div className="status-box">
            <h2 className="status-box__order">Order #{order.orderNumber}</h2>
            <p className="status-cancelled">
              Den här beställningen har avbrutits av köket.
            </p>
          </div>
        </ContentContainer>
        <div className="button__checkout-wrapper">
          <Button
            variant="secondary"
            fullWidth={true}
            className="button__checkout"
            onClick={() => navigate("/menu")}>
            Meny
        </Button>
      </div>
      </>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.key === order.status);

  return (
    <>
      <NavBar />
      <Footer />

      <h1 className="status__title">Orderstatus</h1>

      <ContentContainer>
        <div className="status-box">
          <h2 className="status-box__order">Order #{order.orderNumber}</h2>

						<div className="status-box__timeline">
							{steps.map((step, index) => (
								<div key={step.key} className="status-step">
									<div
                  className={
                    index <= currentStepIndex
                      ? 
                      (index === currentStepIndex 
                          ? "status-dot active pulsating" // active OCH pulsating
                          : "status-dot active")          // active
                      : "status-dot"                     
                  }
                ></div>
									<p className="status-text">{step.label}</p>
								</div>
							))}
						</div>
						<img className="owl-chef" src={OwlChef} alt="Owl Chef" />
					</div>
      	</ContentContainer>
      	<div className="button__checkout-wrapper">
          <Button
            variant="secondary"
            fullWidth={true}
            className="button__checkout"
            onClick={() => navigate("/menu")}
						>
            	Meny
        	</Button>
      </div>
    </>
  );
}