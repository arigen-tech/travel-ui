import React from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./flightBooking.css";

const FlightBookingPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Breadcrumb Section */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link href="#" className="text-decoration-none">
                1. Review
              </Link>
              <i className="fas fa-angle-right mx-2"></i>
            </li>
            <li className="breadcrumb-item">
              <Link href="#" className="text-decoration-none">
                2. Travellers
              </Link>
              <i className="fas fa-angle-right mx-2"></i>
            </li>
            <li className="breadcrumb-item">
              <Link href="#" className="text-decoration-none">
                3. Payment
              </Link>
            </li>
          </ol>
        </nav>

        {/* Flight Detail Section */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header booking-detail-header">
              <h5 className="mb-0">Flight Detail</h5>
            </div>
            <div className="card-body">
              <div className="card-text">
                <div className="dprtBg">DEPART</div>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>
                      <i className="fas fa-map-marker-alt me-2"></i>Delhi - Mumbai | Fri, 31 Jan 2025
                    </h6>
                    <p>
                      <i className="fas fa-plane me-2"></i>Indigo 6E-628 | Economy
                    </p>
                  </div>
                  <div className="text-center">
                    <h6>
                      <i className="far fa-clock me-2"></i>06:00
                    </h6>
                    <p>Delhi (DEL)</p>
                  </div>
                  <div className="fli3">
                    <div className="stp">
                      <span>02h 15m</span>
                    </div>
                    <div className="lin2 lindvd">
                      <div className="fli-i"></div>
                    </div>
                    <div className="clr"></div>
                    <div className="ref" id="spnRefundable">
                      <span className="Refundable">Refundable</span>
                    </div>
                    <div className="clr"></div>
                  </div>

                  <div className="text-center">
                    <h6>
                      <i className="far fa-clock me-2"></i>08:15
                    </h6>
                    <p>Mumbai (BOM)</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p>
                    <i className="fas fa-concierge-bell me-2"></i>Amenities:
                  </p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <i className="fas fa-wifi me-2" /> No Wi-Fi
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-plug me-2" /> No power outlet
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-play me-2" /> No Entertainment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-shield-alt me-2"></i>Hassle-Free Journeys Guaranteed
              </h5>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="services"
                    id="freeCancellation"
                  />
                  <label className="form-check-label" htmlFor="freeCancellation">
                    Free Cancellation for Any Reason (₹773)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="services"
                    id="freeDateChange"
                  />
                  <label className="form-check-label" htmlFor="freeDateChange">
                    Free Date Change (₹608)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="services"
                    id="easyFly"
                  />
                  <label className="form-check-label" htmlFor="easyFly">
                    EasyFly (₹938)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-umbrella-beach me-2"></i>Add Travel Insurance
              </h5>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="insurance"
                    id="secureTripYes"
                  />
                  <label className="form-check-label" htmlFor="secureTripYes">
                    Yes, I want to secure my trip.
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="insurance"
                    id="secureTripNo"
                  />
                  <label className="form-check-label" htmlFor="secureTripNo">
                    No, I do not want to insure my trip.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-envelope me-2"></i>Email Information
              </h5>
              <div className="form-group mb-3">
                <label htmlFor="primaryEmail">
                  Primary Email <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="primaryEmail"
                    placeholder="Enter your primary email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Continue Booking Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary w-100">
              <i className="fas fa-arrow-right me-2"></i>Continue Booking
            </button>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header booking-detail-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Price Summary</h5>
              <div>
                <i className="fas fa-male me-1"></i> 2 {/* Adults */}
                <i className="fas fa-child mx-1"></i> 0 {/* Children */}
                <i className="fas fa-baby-carriage mx-1"></i> 0 {/* Infants */}
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Adult x 1</span>
                  <span>₹4,768</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Taxes</span>
                  <span>₹731</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Discount</span>
                  <span>-₹350</span>
                </li>
                <li className="list-group-item d-flex justify-content-between font-weight-bold">
                  <span>Grand Total</span>
                  <span>₹5,149</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Offers & Promo Code Section */}
          <div className="card mt-4">
            <div className="card-header booking-detail-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Offers & Promo Code</h5>
              <i className="fas fa-tags"></i>
            </div>
            <div className="card-body">
              {/* Applied Promo */}
              <div className="border p-3 rounded mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">EASEFLY</span>
                  <button className="btn btn-sm btn-outline-secondary">Remove</button>
                </div>
                <p className="text-success mt-2 mb-0">
                  Congratulations! Instant Discount of Rs.1600 has been applied successfully.
                </p>
              </div>

              {/* Promo Options */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="promoCode"
                  id="promoEaseFly"
                />
                <label className="form-check-label d-block" htmlFor="promoEaseFly">
                  <span className="fw-bold">EASEFLY</span>
                  <small className="d-block">Use this coupon and get Rs.1600 OFF on your flight booking.</small>
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="promoCode"
                  id="promoEMTNCF"
                />
                <label className="form-check-label d-block" htmlFor="promoEMTNCF">
                  <span className="fw-bold">EMTNCF</span>
                  <small className="d-block">ZERO Convenience Fees</small>
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="promoCode"
                  id="promoEMTUPI"
                />
                <label className="form-check-label d-block" htmlFor="promoEMTUPI">
                  <span className="fw-bold">EMTUPI</span>
                  <small className="d-block">Get Rs.700 OFF on your flight booking.</small>
                </label>
              </div>

              {/* View All Coupons */}
              <div className="text-center mt-3">
                <a href="#" className="text-primary text-decoration-none">
                  View All Coupons
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;
