import './index.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import { useNotificationStore, useOrderStore } from '@nattugglan/core';
import OwlChef from './assets/owl-chef.png';

interface OrderResponse {
  orderNumber: string;
  status: 'Pending' | 'Confirmed' | 'Ready' | 'Cancelled' | 'Done';
  cancellationReason?: string;
}

export function OrderStatusPage() {
  const { orderNumber: urlOrderNumber } = useParams();
  const navigate = useNavigate();
  const order = useOrderStore((state) => state.order as OrderResponse | null);
  const globalOrderNumber = useOrderStore((state) => state.orderNumber);
  const [error, setError] = useState<string | null>(null);
  const { clearNotification } = useNotificationStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearNotification();
    if (globalOrderNumber) {
      setLoading(false);
    }

    if (!globalOrderNumber || urlOrderNumber !== globalOrderNumber) {
      setError("Kunde inte hitta eller spåra den ordern.");
      setLoading(false);
    } else {
      setError(null);
    }

    if (order && order.orderNumber === urlOrderNumber) {
      setLoading(false);
    }

  }, [urlOrderNumber, globalOrderNumber, clearNotification, order]);

  const steps = [
    { key: 'Pending', label: 'Din beställning väntar på att bli bekräftad' },
    { key: 'Confirmed', label: 'Vi lagar din mat' },
    { key: 'Ready', label: 'Din mat är redo för upphämtning!' },
  ];

  if (loading) {
    return (
      <>
        <NavBar />
        <Footer />
        <section className="orderstatus__page">
          <h1 className="status__title">Orderstatus</h1>
          <ContentContainer>
            <p className="status-cancelled">Hämtar order...</p>
          </ContentContainer>
        </section>
      </>
    );
  }


  if (order && order.status === 'Cancelled') {
    return (
      <>
        <NavBar />
        <Footer />
        <section className="orderstatus__page">
          <h1 className="status__title">Orderstatus</h1>

          <ContentContainer>
            <div className="status-box">
              <Link className="status-box__link" to={`/order/${order.orderNumber}`}>
                <h2 className="status-box__order">Order #{order.orderNumber}</h2>
              </Link>
              {order.cancellationReason && (
                <>
                  <p className="status-cancelled">
                    Den här beställningen har avbrutits av köket.
                  </p>
                  <p className="status-cancelled__cancellationReason">
                    Anledning: {order.cancellationReason}
                  </p>
                </>
              )}
              <p className="status-cancelled">
                Lägg en ny order eller kontakta oss om du har frågor!
              </p>
            </div>
          </ContentContainer>
          <div className="button__checkout-wrapper">
            <Button
              variant="secondary"
              fullWidth={true}
              className="button__checkout"
              onClick={() => navigate('/menu')}
            >
              Meny
            </Button>
          </div>
        </section>
      </>
    );
  }

  if (error || !order || order.status === "Done") {
    return (
      <>
        <NavBar />
        <Footer />
        <section className="orderstatus__page">
          <h1 className="status__title">
            Orderstatus
          </h1>

          <ContentContainer>
            <p className="status-cancelled">
              Du har ingen aktiv order just nu.</p>
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
        </section>
      </>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.key === order.status);

  return (
    <>
      <NavBar />
      <Footer />
      <section className="orderstatus__page">
        <h1 className="status__title">Orderstatus</h1>

        <ContentContainer>
          <div className="status-box">
            <Link className="status-box__link" to={`/order/${order.orderNumber}`}>
              <h2 className="status-box__order">Order #{order.orderNumber}</h2>
            </Link>
            <div className="status-box__timeline">
              {steps.map((step, index) => (
                <div key={step.key} className="status-step">
                  <div
                    className={
                      index <= currentStepIndex
                        ?
                        (index === currentStepIndex
                          ? "status-dot active pulsating"
                          : "status-dot active")
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
            onClick={() => navigate('/menu')}
          >
            Meny
          </Button>
        </div>
      </section>
    </>
  );
}