import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, totalPrice, prnOrEmployeeId } = location.state || {};
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrData, setQrData] = useState("");
  const [createdDate] = useState(new Date().toISOString());

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/dashboard");
    }
  }, [cart, navigate]);

  const handlePayment = async () => {
    try {
      const requestData = {
        prnOrEmployeeId,
        cart,
        totalAmount: totalPrice,
        createdDate,
        qrData: JSON.stringify({ prnOrEmployeeId, cart, createdDate }),
      };

      const response = await axios.post(
        "http://localhost:8080/snackswipe/api/orders",
        requestData
      );

      if (response.status === 200) {
        const { orderId } = response.data;
        setPaymentCompleted(true);

        const generatedQrData = JSON.stringify({
          orderId,
          prnOrEmployeeId,
          cart,
          createdDate,
        });
        setQrData(generatedQrData);
      }
    } catch (error) {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="payment-page">
      <h2 className="payment-title">Payment Page</h2>
      {paymentCompleted ? (
        <div className="qr-container">
          <h3 className="success-message">Payment Successful!</h3>
          <QRCodeCanvas value={qrData} />
        </div>
      ) : (
        <div className="payment-details">
          <h3 className="total-amount">Total Amount: ₹{totalPrice}</h3>
          <button className="payment-button" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}