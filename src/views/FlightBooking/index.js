import React, {useEffect, useState} from "react";
import {Link, useFetchers, useLocation} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./flightBooking.css";

const FlightBookingPage = () => {
  const location = useLocation();
  const [constants, setConstants] = useState(location.state || {});
  const [activeTab, setActiveTab] = useState("review"); // Controls the active section
  const flights=constants&&constants.results?constants.results.itineraryItems.filter(item => item.type === "FLIGHT"):[];
  const cabinClass=["All","Economy", "Premium Economy", "Business","Premium Business", "First Class"];
  const [travellers, setTravellers] = useState([{ id: 1 }]);

  const addTraveller = () => {
    setTravellers([...travellers, { id: travellers.length + 1 }]);
  };
  const handleContinueBooking = () => {
    setActiveTab("travellers");
  };
  const removeTraveller = (id) => {
    setTravellers(travellers.filter(traveller => traveller.id !== id));
  };
  const convertMinutesToDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatedDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const showReviewSection = () => {
    setActiveTab("review");
  };
  const calculateLayover = (arrivalTime, departureTime) => {
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);
    const diffMinutes = Math.floor((departure - arrival) / (1000 * 60));
  
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  };
  
  useEffect(key => {
    console.log(constants);
    if(constants.results=== undefined){
      setConstants(JSON.parse(sessionStorage.getItem(`itinerary`)));
    }
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Breadcrumb Section */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li
              className={`breadcrumb-item ${activeTab === "review" ? "active" : ""}`}
              onClick={showReviewSection}
            >
              <Link href="#" className="text-decoration-none">
                1. Review
              </Link>
              <i className="fas fa-angle-right mx-2"></i>
            </li>
            <li
              className={`breadcrumb-item ${activeTab === "travellers" ? "active" : ""}`}
            >
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

        {/* Left Column */}
        <div className="col-lg-8">
          {/* Conditional Rendering for Sections */}
          {activeTab === "review" && (
            <>
              {/* Flight Detail Section */}
              <div className="card mb-4">
            <div className="card-header booking-detail-header">
              <h5 className="mb-0">Flight Detail</h5>
            </div>
            <div className="card-body">
              {flights.map((flight, index) => (
                flight.itemFlight.segments.map((segment, segmentIndex) => (
                  segment.map((sg, sgI) => (
                    <>
                      <div className="card-text mb-2">
                        <div className="dprtBg">DEPART</div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6>
                              <i className="fas fa-map-marker-alt me-2"></i>{sg.or.cN} - {sg.ds.cN} | {formatedDate(sg.or.dT)}
                            </h6>
                            <p>
                              <i className="fas fa-plane me-2"></i>{sg.al.alN} {sg.al.alC}-{sg.al.fN} | {cabinClass[sg.cC]}
                            </p>
                          </div>
                          <div className="text-center">
                            <h6>
                              <i className="far fa-clock me-2"></i>{formatTime(sg.or.dT)}
                            </h6>
                            <p>{sg.or.cN} ({sg.or.cC})</p>
                          </div>
                          <div className="fli3">
                            <div className="stp">
                              <span>{convertMinutesToDuration(sg.dr)}</span>
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
                              <i className="far fa-clock me-2"></i>{formatTime(sg.ds.aT)}
                            </h6>
                            <p>{sg.ds.cN} ({sg.ds.cC})</p>
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
                      {sgI < segment.length - 1 && (
                        <div className="layover">
                          <p>
                            <i className="fas fa-clock me-2"></i>Layover: {calculateLayover(segment[sgI].ds.aT, segment[sgI + 1].or.dT)} at {segment[sgI].ds.cN}
                          </p>
                        </div>
                      )}
                    </>
                  ))
                ))
              ))}
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
                <button className="btn btn-primary w-100" onClick={handleContinueBooking}>
                  Continue Booking
                </button>
              </div>
            </>
          )}

          {activeTab === "travellers" && (
            <>
            {/* Traveller Details Section */}
            <div className="card mb-4">
              <div className="card-header booking-detail-header">
                <h5 className="mb-0">Traveller Details</h5>
              </div>
              <div className="card-body">

              <div className="accordion" id="travellerAccordion">
        {travellers.map((traveller, index) => (
          <div className="accordion-item" key={traveller.id}>
            <h2 className="accordion-header d-flex justify-content-between align-items-center" id={`heading${index}`}>
              <button
                className="accordion-button flex-grow-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                Traveller {index + 1}
              </button>
              <button className="btn btn-danger btn-sm ms-2 me-2" onClick={() => removeTraveller(traveller.id)}>Remove</button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#travellerAccordion"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Title</label>
                    <select className="form-control">
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label className="form-label">First Name & Middle Name</label>
                    <input type="text" className="form-control" placeholder="First Name" />
                  </div>
                  <div className="col-md-5 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Passport Number</label>
                    <input type="text" className="form-control" placeholder="Passport Number" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Passport Expiry</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-control">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={addTraveller}>Add Traveller</button>
              </div>
            </div>
          
            {/* Contact Details Section */}
            <div className="card mb-4">
              <div className="card-header booking-detail-header">
                <h5 className="mb-0">Contact Details</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">Mobile Number</label>
                  <input type="text" className="form-control" id="contactNumber" placeholder="+91 9876543210" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="email@example.com" />
                </div>
              </div>
            </div>
          
            {/* GST Section */}
            <div className="card mb-4">
              <div className="card-header booking-detail-header">
                <h5 className="mb-0">GST Details (Optional)</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="gstNumber" className="form-label">GST Number</label>
                  <input type="text" className="form-control" id="gstNumber" placeholder="Enter GST Number" />
                </div>
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">Company Name</label>
                  <input type="text" className="form-control" id="companyName" placeholder="Enter Company Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="gstCompanyEmail" className="form-label">Company Email</label>
                  <input type="email" className="form-control" id="gstCompanyEmail" placeholder="Enter Company Email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="gstCompanyContact" className="form-label">Company Contact Number</label>
                  <input type="text" className="form-control" id="gstCompanyContact" placeholder="Enter Contact Number" />
                </div>
                <div className="mb-3">
                  <label htmlFor="gstCompanyAddress" className="form-label">Company Address</label>
                  <input type="text" className="form-control" id="gstCompanyAddress" placeholder="Enter Company Address" />
                </div>
              </div>
            </div>
          </>
          
          )}
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
           {/* Price Summary Section */}
          <div className="card">
            <div className="card-header booking-detail-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Price Summary</h5>
              <div>
                <i className="fas fa-male me-1"></i> {constants&&constants.results?constants.results.adultCount:0} {/* Adults */}
                <i className="fas fa-child mx-1"></i> {constants&&constants.results?constants.results.childCount:0} {/* Children */}
                <i className="fas fa-baby-carriage mx-1"></i> {constants&&constants.results?constants.results.infantCount:0} {/* Infants */}
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
