import React from 'react'
import MainFooter from '../../components/MainFooter'
import MainNavigation from '../../components/MainNavigation'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import "../../assets/confirm.css"

const Confirm = () => {
  return (
    <div className="confirmation-page">
      <MainNavigation/>
      <main className="confirmation-container">
        <div className="confirmation-content">
          <div className="confirmation-icon">
            <CheckCircle size={100} color="#212529" strokeWidth={1.5} />
          </div>
          <h1 className="confirmation-title">Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your purchase. Your order has been successfully processed 
            and is being prepared for shipment.
          </p>
          <div className="confirmation-details">
            <div className="detail-item">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">#INV-{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">5-7 Business Days</span>
            </div>
          </div>
          <div className="confirmation-actions">
            <Link to="/orders" className="view-orders-btn">
              View My Orders
            </Link>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <MainFooter/>
    </div>
  )
}

export default Confirm