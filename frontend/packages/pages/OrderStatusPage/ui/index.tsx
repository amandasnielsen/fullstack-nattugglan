import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import { ContentContainer } from "@nattugglan/contentcontainer";


interface OrderResponse {
  orderNumber: string;
  status: "Pending" | "Cooking" | "Preparing" | "Ready";
}

export function OrderStatusPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/order/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [orderNumber]);

  if (!order) return <div>Loading...</div>;

  const steps = [
    { key: "Pending", label: "Din beställning väntar på att bli bekräftad" },
    { key: "Confirmed", label: "Vi lagar din mat" },
    { key: "Ready", label: "Din mat är redo för upphämtning!" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === order.status);

  if (order.status === "Cancelled") {
    return (
      <>
        <NavBar />
        <Footer />
  
        <h1 className="status__title">Orderstatus</h1>
  
        <ContentContainer>
          <div className="status-box">
            <h2 className="status-box__order">Order #{order.orderNumber}</h2>
  
            <p className="status-cancelled">
              Den här beställningen har avbrutits av köket
            </p>
          </div>
        </ContentContainer>
      </>
    );
  }
  

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
                      ? "status-dot active"
                      : "status-dot"
                  }
                ></div>
                <p className="status-text">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </>
  );
}


