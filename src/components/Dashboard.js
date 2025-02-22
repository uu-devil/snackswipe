import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [userType, setUserType] = useState("");
  const [cart, setCart] = useState([]);
  const [prnOrEmployeeId, setPrnOrEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({
    Breakfast: 0,
    Lunch: 0,
    Tea: 0,
    Snacks: 0,
  });

  const navigate = useNavigate();
  const scannerRef = useRef(null);

  const foodPrices = {
    Breakfast: 10,
    Lunch: 50,
    Tea: 10,
    Snacks: 10,
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * foodPrices[item.food],
    0
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem("prnOrEmployeeId");
    const storedName = localStorage.getItem("name");
    const storedUserType = localStorage.getItem("userType");

    if (storedUsername && storedUserType && storedName) {
      setPrnOrEmployeeId(storedUsername);
      setUserType(storedUserType);
      setName(storedName);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleQuantityChange = (food, value) => {
    setQuantities((prev) => ({
      ...prev,
      [food]: value > 0 ? parseInt(value) : 0,
    }));
  };

  const handleAddToCart = (food) => {
    const quantity = quantities[food];
    if (quantity > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.food === food);
        if (existingItem) {
          return prevCart.map((item) =>
            item.food === food
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { food, quantity }];
        }
      });
      setQuantities((prev) => ({ ...prev, [food]: 0 }));
    } else {
      alert(`Please enter a valid quantity for ${food}`);
    }
  };

  const handleCartClick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items.");
      return;
    }

    navigate("/payment", {
      state: {
        cart,
        totalPrice,
        prnOrEmployeeId,
        foodPrices,
      },
    });
  };

  const startScanner = () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }

    scannerRef.current.start(
      { facingMode: "environment" },
      {
        fps: 15,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
      },
      async (decodedText) => {
        setScanResult(decodedText);
        try {
          const parsedData = JSON.parse(decodedText);
          const orderId = parsedData.orderId;

          if (!orderId) {
            throw new Error("Invalid QR data.");
          }

          const response = await axios.post(
            "http://localhost:8080/snackswipe/api/validateQR",
            { orderId }
          );

          if (response.data.valid === "true") {
            setOrderDetails(response.data.orderDetails);
            alert("QR Code validated successfully. Enjoy Your Meal.");
          } else {
            alert("QR is Not Valid or Already Used.");
          }
        } catch (error) {
          setError("Invalid QR Code or validation error.");
        }

        stopScanner();
      },
      () => setError("Scanning... Please ensure a visible QR code.")
    );
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current = null;
        })
        .catch((err) => console.error("Failed to stop scanner:", err));
    }
  };

  useEffect(() => {
    return () => stopScanner();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="navbar"></div>
      {userType === "Student" ? (
        <div className="dashboard-box">
          <h2 className="dashboard-title">Welcome, {name}</h2>
          <h3 className="section-title">Select Your Food Items</h3>

          {["Breakfast", "Lunch", "Tea", "Snacks"].map((food) => (
            <div className="food-selection" key={food}>
              <div className="food-name">
                {food} - ₹{foodPrices[food]}
              </div>
              <input
                type="number"
                min="0"
                value={quantities[food]}
                onChange={(e) => handleQuantityChange(food, e.target.value)}
              />
              <button
                className="add-button"
                onClick={() => handleAddToCart(food)}
              >
                Add {food}
              </button>
            </div>
          ))}

          {cart.length > 0 && (
            <button className="checkout-button" onClick={handleCartClick}>
              Checkout
            </button>
          )}
        </div>
      ) : (
        <div className="scanner-box">
          <h2 className="dashboard-title">Staff Dashboard</h2>
          <div className="scanner-box-container">
            <div id="reader"></div>
            {!scanResult && (
              <button className="scanner-button" onClick={startScanner}>
                Start Scanner
              </button>
            )}
            {error && <p className="error-message">{error}</p>}
            {orderDetails && (
              <div className="order-details">
                <h3>Order Details</h3>
                <p>
                  <strong>Order ID:</strong> {orderDetails.orderId}
                </p>
                <p>
                  <strong>PRN Number :-</strong> {orderDetails.prnOrEmployeeId}
                </p>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul>
                  {orderDetails.items.map((item, index) => (
                    <li key={index}>
                      {item.food} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
