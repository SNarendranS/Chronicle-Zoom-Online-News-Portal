

import React, { useEffect, useState } from "react";
import ADService from "../../../services/adsService";
import { useNavigate, useLocation } from "react-router-dom";
import './css/payment.css'

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const postAds = location.state && location.state.postAds;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(()=>{window.scrollTo(0,0)},[])

  useEffect(() => {
    if (paymentStatus === 'success') {
      const timer = setTimeout(() => {
        navigate('/news');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, navigate]);

  const postAd = async () => {
    try {
      const newAd = await ADService.postAD(postAds);
      setPaymentStatus("success");
    } catch (error) {
      console.error(error);
      setPaymentStatus("failure");
    }
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setPaymentStatus(`Processing payment using ${selectedPaymentMethod}`);
    postAd();
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Thank you for choosing our service! Please proceed with the payment.</p>

      <form onSubmit={handlePaymentSubmit} className="payment-form-container">
        <h4>Amount to be paid: {100*postAds.expiryDay}</h4>
        <label htmlFor="paymentMethod" className="payment-label">Select Payment Method:</label>
        <select
        className="payment-select"
          id="paymentMethod"
          name="paymentMethod"
          onChange={handlePaymentMethodChange}
          value={selectedPaymentMethod}
          required
        >
          <option value="">Select a payment method</option>
          <option value="creditCard">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>

        {selectedPaymentMethod === "creditCard" && (
          <>
            <label htmlFor="cardNumber" className="payment-label">Card Number:</label>
            <input className="payment-form-input"type="text" id="cardNumber" name="cardNumber" required maxLength={16}/>

            <label htmlFor="expiryDate" className="payment-label">Expiry Date:</label>
            <input className="payment-form-input" type="text" id="expiryDate" name="expiryDate" placeholder="MM/YYYY" required />

            <label htmlFor="cvv" className="payment-label">CVV:</label>
            <input className="payment-form-input" type="text" id="cvv" name="cvv" required maxLength={3}/>
          </>
        )}

        {selectedPaymentMethod === "upi" && (
          <>
            <label htmlFor="upiId">UPI ID:</label>
            <input className="payment-form-input"type="text" id="upiId" name="upiId" required />
          </>
        )}

        <button className="payment-button" type="submit">Pay Now</button>
      </form>
      {paymentStatus === `Processing payment using ${selectedPaymentMethod}` && <p>Transaction is being processed</p>}  
      {paymentStatus === "success" && <div><p>Payment successful! Your ad has been posted.</p><p>redirecting to home page shortly...</p></div>}
      {paymentStatus === "failure" && <p>Payment failed. Please try again.</p>}
    </div>
  );
}

export default Payment;
