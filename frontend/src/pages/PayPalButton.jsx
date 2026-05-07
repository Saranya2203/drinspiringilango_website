import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ formData }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Load PayPal script dynamically
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
    script.addEventListener('load', () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'pill',
            label: 'paypal'
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: `Event Registration: ${formData.event}`,
                amount: {
                  value: '49.99' // Replace with dynamic value if needed
                }
              }]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            alert('Payment Successful! Thank you.');
            console.log('Order:', order);
            // You can call your backend here to save the order or send confirmation emails
          },
          onError: err => {
            console.error('PayPal Checkout Error:', err);
            alert('There was a problem with your payment.');
          }
        }).render(paypalRef.current);
      }
    });
    document.body.appendChild(script);
  }, [formData]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
