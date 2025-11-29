import { useState } from "react";
import "./History.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { removeFromhistory } from "../../Redux/Orders/OrderHistory";
const History = () => {
  //   const [orders, setOrders] = useState([]);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    orderNumber: string;
  }>({ isOpen: false, orderNumber: "" });

  const navigate = useNavigate();

  const { orderHistory: orders } = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  const handleDeleteOrder = (orderNumber: string) => {
    setDeleteModal({ isOpen: true, orderNumber });
  };

  const confirmDelete = () => {
    dispatch(removeFromhistory({ orderId: deleteModal.orderNumber }));
    setDeleteModal({ isOpen: false, orderNumber: "" });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, orderNumber: "" });
  };

  const handleStartShopping = () => {
    // Navigate to products page - replace with your routing logic
    console.log("Navigate to products page");
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "#28a745";
      case "shipped":
        return "#007bff";
      case "delivered":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };


  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Order History</h1>
        <p>Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-history">
          <div className="empty-animation">
            <div className="empty-box">
              <div className="box-lid"></div>
              <div className="box-body"></div>
              <div className="floating-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div className="empty-content">
            <h3>Your order history is empty</h3>
            <p>Looks like you haven't placed any orders yet.</p>
            <p className="empty-subtitle">
              Start shopping to see your orders here!
            </p>
            <button
              className="btn-primary start-shopping"
              onClick={handleStartShopping}
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderNumber} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="order-info">
                  <div className="order-number">
                    <strong>Order #{order.orderNumber}</strong>
                  </div>
                  <div className="order-date">
                    Placed on {formatDate(order.orderDate)}
                  </div>
                </div>
                <div className="order-status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-items">
                <div className="items-header">
                  <span className="items-count">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                  <span className="total-amount">
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                {order.items.length > 2 ? (
                  // Compact view for multiple items
                  <div className="items-compact">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="order-item compact">
                        <div className="item-image small">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details compact">
                          <h4>{item.name}</h4>
                          <div className="item-price-qty">
                            <span className="quantity">
                              Qty: {item.quantity}
                            </span>
                            <span className="price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="more-items">
                        <span>+{order.items.length - 2} more items</span>
                      </div>
                    )}
                  </div>
                ) : (
                  // Full view for 1-2 items
                  <div className="items-full">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <div className="item-specs">
                            {item.details.slice(0, 2).map((detail, index) => (
                              <span key={index} className="spec-tag">
                                {detail}
                              </span>
                            ))}
                          </div>
                          <div className="item-price-qty">
                            <span className="quantity">
                              Qty: {item.quantity}
                            </span>
                            <span className="price">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount:</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="delivery-info">
                <div className="delivery-method">
                  <strong>{order.shippingMethod.name}</strong>
                  <span>Estimated delivery: {order.estimatedDelivery}</span>
                </div>
                <div className="delivery-address">
                  <strong>Delivery Address:</strong>
                  <p>
                    {order.shippingAddress.fullName}
                    <br />
                    {order.shippingAddress.addressLine1}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="order-actions">
                
                <button
                  className="btn-danger"
                  onClick={() => handleDeleteOrder(order.orderNumber)}
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Order</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete order{" "}
                <strong>#{deleteModal.orderNumber}</strong>?
              </p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
