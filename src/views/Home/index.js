import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Loader from '../../assets/img/loader.gif';

const HomePage = () => {

  const [loading, setLoading] = useState(true); // Preloader visible initially
  const [value, setValue] = useState([130, 250]); // Initial range values
  const [tripType, setTripType] = useState("oneway"); // Default trip type
  const [rows, setRows] = useState([{ from: "", to: "", departure: "" }]); // Rows for Multi Trip
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle
  const [travellerCounts, setTravellerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  }); // Traveller counts
  const [cabinClass, setCabinClass] = useState("Economy"); // Default cabin class

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const addRow = () => {
    setRows([...rows, { from: "", to: "", departure: "" }]);
  };
  const deleteRow = () => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.pop(); // Remove the last row
      setRows(updatedRows);
    } else {
      alert("At least one row is required.");
    }
  };
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  

  const updateTravellerCount = (type, delta) => {
    setTravellerCounts((prevCounts) => {
      const newCount = Math.max(0, prevCounts[type] + delta);
      return { ...prevCounts, [type]: newCount };
    });
  };

  const handleCabinClassChange = (event) => {
    setCabinClass(event.target.value);
  };
  const navigate = useNavigate();

  const handleSubmitTravellercount = (e) => {
    e.preventDefault();
    navigate('/flightList')
  };
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update range values
  };

  useEffect(() => {
    // Simulate content loading (replace with real loading logic)
    const timer = setTimeout(() => {
      setLoading(false); // Hide preloader
    }, 3000); // Simulate 3 seconds load time

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);


  const backgroundImageStyle = {
    backgroundImage: "url(assets/img/home-1/about/about-bg.png)",
  };
  const backgroundImageStyle2 = {
    backgroundImage: "url(assets/img/home-1/video/img/video-bg.jpg)",
  };
  const backgroundImageStyle3 = {
    backgroundImage: "url(assets/img/home-1/offer/img/offer-bg.jpg)",
  };
  const backgroundImageStyle4 = {
    backgroundImage: "url(assets/img/home-1/shop/shop-bg.png)",
  };


  
    

  
  return (
    
      <>

      {loading ? (
                  <div id="preloader">
                  <div className="preloader">
                    <span></span>
                    <span></span>
                    <img className="loaderimg" src={Loader} />
                  </div>
                </div>
            ) : (
              <>
            <main>
              <div className="it-slider-area">
                <div className="it-slider-wrapper p-relative">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="swiper-container it-slider-active"
                  >
                    <SwiperSlide>
                      <div className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
                        <div
                          className="it-slider-bg"
                          style={{
                            backgroundImage:
                              "url(assets/img/home-1/slider/slider-1-1.jpg)",
                          }}
                        ></div>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-xl-10">
                              <div className="it-slider-title-box text-center mb-85 z-index">
                                <span className="it-section-subtitle text-white">
                                  Memories For Life
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
                        <div
                          className="it-slider-bg"
                          style={{
                            backgroundImage:
                              "url(assets/img/home-1/slider/slider-1-2.jpg)",
                          }}
                        ></div>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-xl-10">
                              <div className="it-slider-title-box text-center mb-85 z-index">
                                <span className="it-section-subtitle text-white">
                                  Memories For Life
                                </span>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
                        <div
                          className="it-slider-bg"
                          style={{
                            backgroundImage:
                              "url(assets/img/home-1/slider/slider-1-3.jpg)",
                          }}
                        ></div>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-xl-10">
                              <div className="it-slider-title-box text-center mb-85 z-index">
                                <span className="it-section-subtitle text-white">
                                  Memories For Life
                                </span>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>

                  <div className="it-tour-package-main">
                      <div className="container px-0">
                          <div className="it-tour-package-wrap it-slider-tour-style it-tour-package-box z-index">
                          <div className="it-tour-package-location__wrapper">
                                  <div className="row">
                                  <>
                                    {/* Flight Search Form */}
                                    <form>
                                      <div className="form-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                          <div className="d-flex align-items-center">
                                            <div className="form-check d-flex align-items-center me-3 mb-2">
                                              <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="tripType"
                                                id="oneway"
                                                value="oneway"
                                                checked={tripType === "oneway"}
                                                onChange={handleTripTypeChange}
                                              />
                                              <label className="form-check-label fs-14 ms-2" htmlFor="oneway">
                                                Oneway
                                              </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center me-3 mb-2">
                                              <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="tripType"
                                                id="roundtrip"
                                                value="roundtrip"
                                                checked={tripType === "roundtrip"}
                                                onChange={handleTripTypeChange}
                                              />
                                              <label
                                                className="form-check-label fs-14 ms-2"
                                                htmlFor="roundtrip"
                                              >
                                                Round Trip
                                              </label>
                                            </div>
                                            <div className="form-check d-flex align-items-center me-3 mb-2">
                                              <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="tripType"
                                                id="multiway"
                                                value="multiway"
                                                checked={tripType === "multiway"}
                                                onChange={handleTripTypeChange}
                                              />
                                              <label className="form-check-label fs-14 ms-2" htmlFor="multiway">
                                                Multi Trip
                                              </label>
                                            </div>
                                          </div>
                                          <h6 className="fw-medium fs-16 mb-2">
                                            Millions of cheap flights. One simple search
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-2 form-group pe-0 firstinput">
                                          <label htmlFor="from">From</label>
                                          <input type="text" id="from" className="form-control" defaultValue="Delhi" />
                                          <small className="text-muted">Indiragandhi International Airport</small>
                                        </div>
                                        <div className="col-md-2 form-group">
                                          <label htmlFor="to">To</label>
                                          <input type="text" id="to" className="form-control" defaultValue="Mumbai" />
                                          <small className="text-muted">CSM International Airport</small>
                                        </div>
                                        <div className="col-md-2 form-group">
                                          <label htmlFor="departure">Departure</label>
                                          <input type="date" id="departure" className="form-control" defaultValue="2024-10-21" />
                                          <small className="text-muted">Monday</small>
                                        </div>
                                        <div className={`col-md-2 form-group ${tripType === 'oneway' || tripType === 'multiway' ? 'disabled' : ''}`}>
                                          <label htmlFor="return">Return</label>
                                          <input
                                            type="date"
                                            id="return"
                                            className="form-control"
                                            defaultValue="2024-10-23"
                                            disabled={tripType === "oneway" || tripType === "multiway"}
                                          />
                                          <small className="text-muted">Wednesday</small>
                                        </div>
                                        <div className="col-md-3 form-group">
                                          <label htmlFor="travellersDropdown">Travellers and cabin class</label>
                                          <div className="dropdown mt-2">
                                            <button
                                              className="btn btn-light w-100 dropdown-toggle"
                                              type="button"
                                              id="travellersDropdown"
                                              data-bs-toggle="dropdown"
                                              aria-expanded={dropdownOpen}
                                              onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                              {`${travellerCounts.adults} Adults, ${travellerCounts.children} Children, ${travellerCounts.infants} Infants, ${cabinClass}`}
                                            </button>
                                            <ul
                                              className={`dropdown-menu travellersDropdowncontent py-3 ${
                                                dropdownOpen ? "show" : ""
                                              }`}
                                              aria-labelledby="travellersDropdown"
                                            >
                                              <li className="travellerscol p-2 mb-2 row">
                                                <div className="travellers-dropdown-header">Travellers</div>
                                                {["adults", "children", "infants"].map((type, index) => (
                                                  <div key={index} className="traveller-control col-md-4">
                                                    <span>{`${type.charAt(0).toUpperCase() + type.slice(1)}${
                                                      type === "adults" ? " (12+ Yrs)" : type === "children" ? " (2-12 Yrs)" : " (0-2 Yrs)"
                                                    }`}</span>
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount(type, -1)}
                                                      >
                                                        -
                                                      </button>
                                                      <span className="traveller-count">{travellerCounts[type]}</span>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount(type, +1)}
                                                      >
                                                        +
                                                      </button>
                                                    </div>
                                                  </div>
                                                ))}
                                              </li>
                                              <li className="travellerscol row p-2">
                                                <div className="travellers-dropdown-header">Class</div>
                                                {["Economy", "Premium Economy", "Business", "First Class"].map((type, index) => (
                                                  <div key={index} className="form-check traveller-control col-md-3">
                                                    <input
                                                      className="form-check-input"
                                                      type="radio"
                                                      name="cabinClass"
                                                      id={type.replace(" ", "").toLowerCase()}
                                                      value={type}
                                                      checked={cabinClass === type}
                                                      onChange={handleCabinClassChange}
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      htmlFor={type.replace(" ", "").toLowerCase()}
                                                    >
                                                      {type}
                                                    </label>
                                                  </div>
                                                ))}
                                              </li>
                                              <li>
                                                <div className="dropdown-footer">
                                                  <button
                                                    className="btn btn-secondary btn-sm"
                                                    type="button"
                                                    onClick={() => setDropdownOpen(false)}
                                                  >
                                                    Cancel
                                                  </button>
                                                  <button
                                                    className="btn btn-primary btn-sm"
                                                    type="button"
                                                    onClick={() => setDropdownOpen(false)}
                                                  >
                                                    Apply
                                                  </button>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="col-md-1 form-group d-flex align-items-center py-0 pe-0 searchcol">
                                        <div className="it-tour-package-item d-flex justify-content-end">
                                        <div className="it-tour-package-search">
                                            <button type="submit" onClick={handleSubmitTravellercount}>
                                              Search <i className="fa-solid fa-magnifying-glass"></i>
                                            </button>
                                        </div>
                                        </div>
                                      </div>
                                      </div>
                                      {tripType === "multiway" &&
                                        rows.map((row, index) => (
                                          <div className="row mt-2" key={index}>
                                            <div className="col-md-4 form-group pe-0 firstinput">
                                              <label htmlFor={`from-${index}`}>From</label>
                                              <input
                                                type="text"
                                                id={`from-${index}`}
                                                className="form-control"
                                                value={row.from?row.from:"Delhi"}
                                                onChange={(e) => handleRowChange(index, "from", e.target.value)}
                                              />
                                              <small className="text-muted">Indiragandhi International Airport</small>
                                            </div>
                                            <div className="col-md-4 form-group">
                                              <label htmlFor={`to-${index}`}>To</label>
                                              <input
                                                type="text"
                                                id={`to-${index}`}
                                                className="form-control"
                                                value={row.to?row.to:"Mumbai"}
                                                onChange={(e) => handleRowChange(index, "to", e.target.value)}
                                              />
                                              <small className="text-muted">CSM International Airport</small>
                                            </div>
                                            <div className="col-md-4 form-group">
                                              <label htmlFor={`departure-${index}`}>Departure</label>
                                              <input
                                                type="date"
                                                id={`departure-${index}`}
                                                className="form-control"
                                                value={row.departure?row.departure:"2024-10-21"}
                                                onChange={(e) =>
                                                  handleRowChange(index, "departure", e.target.value)
                                                }
                                              />
                                              <small className="text-muted">Monday</small>
                                            </div>

                                          </div>
                                        ))}
                                      {tripType === "multiway" && (
                                        <div className="row mt-2">
                                          <div className="col-md-12 px-0">
                                            <button
                                              type="button"
                                              className="btn btn-success me-2"
                                              onClick={addRow}
                                            >
                                              <i className="fa-solid fa-plus"></i> Add Row
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={deleteRow}
                                            >
                                              <i className="fa-solid fa-trash-alt"></i> Delete Row
                                            </button>
                                            </div>
                                        </div>
                                      )}
                                    </form>
                                  </>

                                 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>



                </div>
              </div>

              <div className="it-destination-area p-relative pt-120 pb-120 fix">
                <div className="it-destination-shape-box d-none d-xl-block">
                  <div className="it-destination-shape-1">
                    <img
                      src="assets/img/home-1/destination/shape/Ballon-1.png"
                      alt=""
                    />
                  </div>
                  <div className="it-destination-shape-2">
                    <img src="assets/img/home-1/destination/shape/star.png" alt="" />
                  </div>
                </div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8">
                      <div className="it-destination-title-box text-center mb-75">
                        <span className="it-section-subtitle">Top Destinations</span>
                        <h3 className="it-section-title">
                          Explore the Beautiful Places Around the World
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="it-destination-slider-wrap">
                        <Swiper
                          modules={[Navigation, Autoplay]}
                          navigation
                          pagination={{ clickable: true }}
                          autoplay={{ delay: 3000 }}
                          loop={true}
                          slidesPerView={4} // Display 4 slides at a time
                          spaceBetween={30} // Space between the slides
                          breakpoints={{
                            // Responsive settings
                            320: {
                              slidesPerView: 1,
                              spaceBetween: 10,
                            },
                            576: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 30,
                            },
                          }}
                          className="it-destination-slider-active"
                        >
                          <SwiperSlide>
                            <div className="it-destination-item p-relative">
                              <div className="it-destination-thumb">
                                <img
                                  src="assets/img/home-1/destination/img/img-1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="it-destination-content">
                                <h3 className="it-destination-title">
                                  <a href="destination.html">Europe</a>
                                </h3>
                                <span>15 Tours</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="it-destination-item p-relative">
                              <div className="it-destination-thumb">
                                <img
                                  src="assets/img/home-1/destination/img/img-2.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="it-destination-content">
                                <h3 className="it-destination-title">
                                  <a href="destination.html">North America</a>
                                </h3>
                                <span>13 Tours</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="it-destination-item p-relative">
                              <div className="it-destination-thumb">
                                <img
                                  src="assets/img/home-1/destination/img/img-3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="it-destination-content">
                                <h3 className="it-destination-title">
                                  <a href="destination.html">South Africa</a>
                                </h3>
                                <span>12 Tours</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="it-destination-item p-relative">
                              <div className="it-destination-thumb">
                                <img
                                  src="assets/img/home-1/destination/img/img-4.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="it-destination-content">
                                <h3 className="it-destination-title">
                                  <a href="destination.html">Costa Rica</a>
                                </h3>
                                <span>25 Tours</span>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="it-destination-item p-relative">
                              <div className="it-destination-thumb">
                                <img
                                  src="assets/img/home-1/destination/img/img-2.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="it-destination-content">
                                <h3 className="it-destination-title">
                                  <a href="destination.html">Europe</a>
                                </h3>
                                <span>15 Tours</span>
                              </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="it-about-area it-about-bg pt-120 pb-175 p-relative grey-bg"
                style={backgroundImageStyle}
              >
                <div className="it-about-shape-box">
                  <div className="it-about-shape-1">
                    <img src="assets/img/home-1/about/shape/cloud.png" alt="" />
                  </div>
                  <div className="it-about-shape-2 d-none d-xxl-block">
                    <img src="assets/img/home-1/about/shape/rocket.png" alt="" />
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div
                      className="col-xl-6 col-lg-6 order-md-0 wow itfadeLeft"
                      data-wow-duration=".9s"
                      data-wow-delay=".5s"
                    >
                      <div className="it-about-thumb-wrap">
                        <div className="it-about-main-thumb p-relative text-center">
                          <img src="assets/img/home-1/about/img/img-1.jpg" alt="" />
                          <div className="it-about-sub-thumb-1 d-none d-lg-block">
                            <img src="assets/img/home-1/about/img/img-2.jpg" alt="" />
                          </div>
                          <div className="it-about-sub-thumb-2 d-none d-lg-block">
                            <img src="assets/img/home-1/about/img/img-3.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-6 col-lg-6 order-md-1 wow itfadeRight"
                      data-wow-duration=".9s"
                      data-wow-delay=".7s"
                    >
                      <div className="it-about-content">
                        <div className="it-about-title-box mb-20">
                          <span className="it-section-subtitle">About Company</span>
                          <h3 className="it-section-title mb-20">
                            Sollicitudin Vestibulum Vulputate Ipsum.
                          </h3>
                          <p className="text-black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco
                          </p>
                        </div>
                        <div className="it-about-service-item mb-40 d-flex align-items-center">
                          <div className="it-about-service-icon mr-20">
                            <span>
                              <i className="flaticon-worker"></i>
                            </span>
                          </div>
                          <div className="it-about-service-text">
                            <h3 className="it-about-service-title">
                              Safety First Always
                            </h3>
                            <p>
                              Duis aute irure dolor in reprehenderit involuptate{" "}
                              <br /> velit esse cillum dolore
                            </p>
                          </div>
                        </div>
                        <div className="it-about-service-item mb-40 d-flex align-items-center">
                          <div className="it-about-service-icon mr-20">
                            <span>
                              <i className="flaticon-tour-guide"></i>
                            </span>
                          </div>
                          <div className="it-about-service-text">
                            <h3 className="it-about-service-title">
                              Nllamco laboris nisi
                            </h3>
                            <p>
                              Duis aute irure dolor in reprehenderit involuptate{" "}
                              <br /> velit esse cillum dolore
                            </p>
                          </div>
                        </div>
                        <a href="about.html" className="it-btn-primary">
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="it-featured-area pt-120 pb-120 p-relative">
            <div className="it-featured-shape-box">
              <div className="it-featured-shape-1">
                <img src="assets/img/home-1/featured/shape/sunGlass.png" alt="" />
              </div>
              <div className="it-featured-shape-2">
                <img src="assets/img/home-1/featured/shape/bag.png" alt="" />
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-8">
                  <div className="it-featured-title-box mb-75 text-center">
                    <span className="it-section-subtitle">Featured Tours</span>
                    <h3 className="it-section-title">Tours Packages</h3>
                  </div>
                </div>
              </div>
              <div className="it-featured-item-wrap">
                <div className="row">
                  {/* Tour 1 */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                    <div className="it-featured-item p-relative">
                      <div className="it-featured-thumb p-relative">
                        <img src="assets/img/home-1/featured/img/img-1.jpg" alt="" />
                      </div>
                      <div className="it-featured-top d-flex align-items-center">
                        <div className="it-featured-offer">
                          <span>10% off</span>
                        </div>
                        <div className="it-featured-categories">
                          <span>featured</span>
                        </div>
                      </div>
                      <div className="it-featured-content">
                        <div className="it-featured-react-box d-flex align-items-center">
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-light fa-heart"></i>
                              </span>
                            </a>
                          </div>
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-regular fa-camera"></i>
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="it-featured-meta mb-5">
                          <a href="https://www.google.com/maps">
                            <i className="fa-solid fa-location-dot"></i> traford Park Lexington, 40507
                          </a>
                        </div>
                        <h3 className="it-featured-title">
                          <a href="discover.html">Cuba Sailing Adventure</a>
                        </h3>
                        <div className="it-featured-review-box pb-25 mb-25 d-flex align-items-center justify-content-between">
                          <div className="it-featured-price d-flex align-items-center">
                            <i className="fa-regular fa-circle-dollar"></i>
                            <p>
                              From <span>$116.10</span> <del>$116.10</del>
                            </p>
                          </div>
                          <div className="it-featured-review d-flex align-items-center">
                            <i className="fa-solid fa-star"></i>
                            <p>
                              <span>4.5</span> (1.5k reviews)
                            </p>
                          </div>
                        </div>
                        <div className="it-featured-bottom d-flex align-items-center justify-content-between">
                          <div className="it-featured-meta d-flex align-items-center">
                            <div className="it-featured-time">
                              <span>
                                <i className="fa-regular fa-clock"></i> 6 days
                              </span>
                            </div>
                            <div className="it-featured-user">
                              <span>
                                <i className="fa-regular fa-user"></i> 15
                              </span>
                            </div>
                          </div>
                          <div className="it-featured-action">
                            <a href="discover.html" className="it-btn-blog featured-btn">explore more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour 2 */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                    <div className="it-featured-item p-relative">
                      <div className="it-featured-thumb p-relative">
                        <img src="assets/img/home-1/featured/img/img-2.jpg" alt="" />
                      </div>
                      <div className="it-featured-top d-flex align-items-center">
                        <div className="it-featured-offer">
                          <span>10% off</span>
                        </div>
                      </div>
                      <div className="it-featured-content">
                        <div className="it-featured-react-box d-flex align-items-center">
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-light fa-heart"></i>
                              </span>
                            </a>
                          </div>
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-regular fa-camera"></i>
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="it-featured-meta mb-5">
                          <a href="https://www.google.com/maps">
                            <i className="fa-solid fa-location-dot"></i> traford Park Lexington, 40507
                          </a>
                        </div>
                        <h3 className="it-featured-title">
                          <a href="discover.html">Tour in New York</a>
                        </h3>
                        <div className="it-featured-review-box pb-25 mb-25 d-flex align-items-center justify-content-between">
                          <div className="it-featured-price d-flex align-items-center">
                            <i className="fa-regular fa-circle-dollar"></i>
                            <p>
                              From <span>$116.10</span> <del>$116.10</del>
                            </p>
                          </div>
                          <div className="it-featured-review d-flex align-items-center">
                            <i className="fa-solid fa-star"></i>
                            <p>
                              <span>4.5</span> (1.5k reviews)
                            </p>
                          </div>
                        </div>
                        <div className="it-featured-bottom d-flex align-items-center justify-content-between">
                          <div className="it-featured-meta d-flex align-items-center">
                            <div className="it-featured-time">
                              <span>
                                <i className="fa-regular fa-clock"></i> 6 days
                              </span>
                            </div>
                            <div className="it-featured-user">
                              <span>
                                <i className="fa-regular fa-user"></i> 15
                              </span>
                            </div>
                          </div>
                          <div className="it-featured-action">
                            <a href="discover.html" className="it-btn-blog featured-btn">explore more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour 3 */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                    <div className="it-featured-item p-relative">
                      <div className="it-featured-thumb p-relative">
                        <img src="assets/img/home-1/featured/img/img-3.jpg" alt="" />
                      </div>
                      <div className="it-featured-top d-flex align-items-center">
                        <div className="it-featured-offer">
                          <span>10% off</span>
                        </div>
                      </div>
                      <div className="it-featured-content">
                        <div className="it-featured-react-box d-flex align-items-center">
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-light fa-heart"></i>
                              </span>
                            </a>
                          </div>
                          <div className="it-featured-react">
                            <a href="#">
                              <span>
                                <i className="fa-regular fa-camera"></i>
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="it-featured-meta mb-5">
                          <a href="https://www.google.com/maps">
                            <i className="fa-solid fa-location-dot"></i> traford Park Lexington, 40507
                          </a>
                        </div>
                        <h3 className="it-featured-title">
                          <a href="discover.html">Museum of Modern Art</a>
                        </h3>
                        <div className="it-featured-review-box pb-25 mb-25 d-flex align-items-center justify-content-between">
                          <div className="it-featured-price d-flex align-items-center">
                            <i className="fa-regular fa-circle-dollar"></i>
                            <p>
                              From <span>$116.10</span> <del>$116.10</del>
                            </p>
                          </div>
                          <div className="it-featured-review d-flex align-items-center">
                            <i className="fa-solid fa-star"></i>
                            <p>
                              <span>4.5</span> (1.5k reviews)
                            </p>
                          </div>
                        </div>
                        <div className="it-featured-bottom d-flex align-items-center justify-content-between">
                          <div className="it-featured-meta d-flex align-items-center">
                            <div className="it-featured-time">
                              <span>
                                <i className="fa-regular fa-clock"></i> 6 days
                              </span>
                            </div>
                            <div className="it-featured-user">
                              <span>
                                <i className="fa-regular fa-user"></i> 15
                              </span>
                            </div>
                          </div>
                          <div className="it-featured-action">
                            <a href="discover.html" className="it-btn-blog featured-btn">explore more</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>

              <div className="it-video-area it-video-overlay p-relative pt-95 pb-95" style={backgroundImageStyle2}>
            <div className="it-video-shape-box">
              <div className="it-video-shape-1">
                <img src="assets/img/home-1/video/shape/tree.png" alt="" />
              </div>
              <div className="it-video-shape-2">
                <img src="assets/img/home-1/video/shape/triangle.png" alt="" />
              </div>
            </div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-9">
                  <div className="it-video-content z-index">
                    <h3 className="it-section-title text-white mb-30">Ready to get started your travel camping us</h3>
                    <div className="it-video-button">
                      <a href="contact.html" className="it-btn-secondary">Start Booking</a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-3">
                  <div className="it-video-icon z-index justify-content-start justify-content-md-end align-items-center">
                    <a href="https://www.youtube.com/watch?v=8mSG40o-iJ0" className="popup-video">
                      <i className="fa-solid fa-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
              </div>

              <div className="it-funfact-area theme-bg-2 pt-30 pb-30">
              <div className="container">
                  <div className="it-funfact-wrap">
                  <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                      <div className="it-funfact-item d-flex align-items-center justify-content-sm-center">
                          <div className="it-funfact-text">
                          <h3 className="it-funfact-number">
                              <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="835">835</b>+
                          </h3>
                          <p>Total Donations</p>
                          </div>
                          <div className="it-funfact-icon">
                          <span>
                              <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              </svg>
                          </span>
                          </div>
                      </div>
                      </div>

                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                      <div className="it-funfact-item d-flex align-items-center justify-content-sm-center">
                          <div className="it-funfact-text">
                          <h3 className="it-funfact-number">
                              <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="6246">6246</b>+
                          </h3>
                          <p>Campaigns closed</p>
                          </div>
                          <div className="it-funfact-icon">
                          <span>
                              <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              </svg>
                          </span>
                          </div>
                      </div>
                      </div>

                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                      <div className="it-funfact-item d-flex align-items-center justify-content-sm-center">
                          <div className="it-funfact-text">
                          <h3 className="it-funfact-number">
                              <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="145">145</b>+
                          </h3>
                          <p>Active Volunteers</p>
                          </div>
                          <div className="it-funfact-icon">
                          <span>
                              <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              </svg>
                          </span>
                          </div>
                      </div>
                      </div>

                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                      <div className="it-funfact-item d-flex align-items-center justify-content-sm-center">
                          <div className="it-funfact-text">
                          <h3 className="it-funfact-number">
                              <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="122">122</b>+
                          </h3>
                          <p>Projects Completed</p>
                          </div>
                          <div className="it-funfact-icon">
                          <span>
                              <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M-9.93439e-08 22.364L0 24.6367L47 24.6367L47 22.364L-9.93439e-08 22.364Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M22.3633 1.90735e-05L22.3633 47L24.636 47L24.636 1.89741e-05L22.3633 1.90735e-05Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 39.3168L7.68517 40.9238L40.9189 7.69004L39.3117 6.08309L6.07812 39.3168Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M6.07812 7.69004L39.3118 40.9238L40.9187 39.3168L7.68517 6.08309L6.07812 7.69004Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M13.5898 44.828L15.6946 45.6855L33.4279 2.15887L31.3229 1.30136L13.5898 44.828Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M1.31641 15.6771L44.843 33.4102L45.7005 31.3054L2.17391 13.5723L1.31641 15.6771Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M13.668 2.10514L31.2178 45.707L33.3262 44.8584L15.7764 1.25659L13.668 2.10514Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              <path d="M1.29297 31.2314L2.14138 33.3398L45.7432 15.7948L44.895 13.6864L1.29297 31.2314Z" fill="currentColor" />
                              </svg>
                          </span>
                          </div>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>

              <div className="it-chooseus-area p-relative pt-120 pb-120">
            <div className="it-chooseus-shape-box">
              <div className="it-chooseus-shape-1 d-none d-lg-block">
                <img src="assets/img/home-1/chooseus/shape/walk.png" alt="" />
              </div>
            </div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 wow itfadeLeft" data-wow-duration=".9s" data-wow-delay=".5s">
                  <div className="it-chooseus-title-box">
                    <span className="it-section-subtitle">why Choose us</span>
                    <h3 className="it-section-title mb-30">Why you should choose our company</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <div className="it-chooseus-service mb-40">
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="it-chooseus-service-content d-flex align-items-center">
                          <div className="it-chooseus-service-icon">
                            <i className="fa-regular fa-badge-check"></i>
                          </div>
                          <h3 className="it-chooseus-service-title">professional & certified</h3>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-6">
                        <div className="it-chooseus-service-content d-flex align-items-center">
                          <div className="it-chooseus-service-icon">
                            <i className="fa-regular fa-house-heart"></i>
                          </div>
                          <h3 className="it-chooseus-service-title">Get instant tour bookings</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="it-chooseus-button">
                    <a href="about.html" className="it-btn-primary">Discover More</a>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 wow itfadeRight" data-wow-duration=".9s" data-wow-delay=".7s">
                  <div className="it-chooseus-thumb-box ml-35 p-relative">
                    <div className="it-chooseus-thumb mb-20">
                      <img src="assets/img/home-1/chooseus/img/choose-thumb.jpg" alt="" />
                    </div>
                    <div className="it-chooseus-rating-box">
                      <div className="it-chooseus-rating-content d-flex align-items-center">
                        <div className="it-chooseus-rating-icon">
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </div>
                        <div className="it-chooseus-rating-text">
                          <h3 className="it-chooseus-rating-title">
                            <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="3500">3500</b>+
                          </h3>
                          <p>satisfied customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>

              <div className="it-offer-area fix it-offer-overlay p-relative pt-165 pb-145" style={backgroundImageStyle3}>
              <div className="it-offer-shape-box">
                  <div className="it-offer-shape-1">
                  <img src="assets/img/home-1/offer/shape/shape-big.jpg" alt="" />
                  </div>
                  <div className="it-offer-shape-2">
                  <img src="assets/img/home-1/offer/shape/shape-small.jpg" alt="" />
                  </div>
                  <div className="it-offer-shape-3">
                  <img src="assets/img/home-1/offer/shape/country.png" alt="" />
                  </div>
              </div>
              <div className="it-offer-discount-thumb d-none d-xxl-block">
                  <img src="assets/img/home-1/offer/shape/girls.png" alt="" />
              </div>
              <div className="container-fluid container-1285">
                  <div className="row">
                  <div className="col-xl-8 col-lg-8">
                      <div className="it-offer-content z-index">
                      <div className="it-offer-title-box mb-35">
                          <span className="it-offer-subtitle">Special Offer</span>
                          <h3 className="it-offer-section-title text-white">Travel The world</h3>
                      </div>
                      <div className="it-offer-button">
                          <a href="contact.html" className="it-btn-primary">Start Booking</a>
                      </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                      <div className="it-offer-discount z-index">
                      <div className="it-offer-discount-circle d-flex justify-content-center align-items-center">
                          <div className="it-offer-discount-number">
                          <h3 className="it-offer-number">
                              <b className="purecounter" data-purecounter-duration="1" data-purecounter-end="75">75</b>
                          </h3>
                          </div>
                          <div className="it-offer-discount">
                          <span>%</span>
                          <span>off</span>
                          </div>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>

              <div className="it-testimonial-area fix pt-120 pb-120 p-relative fix" style={backgroundImageStyle4}>
                  <div className="it-testimonial-shape-box d-none d-xl-block">
                      <div className="it-testimonial-shape-1">
                      <img src="assets/img/home-1/testimonial/shape/maps.png" alt="" />
                      </div>
                      <div className="it-testimonial-shape-2">
                      <img src="assets/img/home-1/testimonial/shape/tree.png" alt="" />
                      </div>
                  </div>
                  <div className="container">
                      <div className="row justify-content-center">
                      <div className="col-xl-6">
                          <div className="it-testimonial-title-box text-center mb-20">
                          <span className="it-section-subtitle">Testimonial</span>
                          <h3 className="it-section-title">What Our Users Say</h3>
                          </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-xl-12">
                          {/* Swiper Component */}
                          <Swiper
                          navigation
                          pagination={{ clickable: true }}
                          loop={true}
                          slidesPerView={3} // Display 4 slides at a time
                          spaceBetween={30} // Space between the slides
                          breakpoints={{
                            // Responsive settings
                            320: {
                              slidesPerView: 1,
                              spaceBetween: 10,
                            },
                            576: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1024: {
                              slidesPerView: 3,
                              spaceBetween: 30,
                            },
                          }}
                          className="it-testimonial-active"
                          >
                          <SwiperSlide>
                              <div className="it-testimonial-item">
                              <div className="it-testimonial-rating">
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                              </div>
                              <div className="it-testimonial-dsc">
                                  <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim ad minim veniam, quis nostrud”</p>
                              </div>
                              <div className="it-testimonial-avater-box d-flex align-items-center">
                                  <div className="it-testimonial-avater-thumb p-relative">
                                  <img src="assets/img/home-1/testimonial/img/avater-1.png" alt="" />
                                  <div className="it-testimonial-avater-icon">
                                      <i className="fa-solid fa-quote-right"></i>
                                  </div>
                                  </div>
                                  <div className="it-testimonial-avater-info">
                                  <h3 className="it-testimonial-avater-title">Deborah Gallagher</h3>
                                  <span className="it-testimonial-avater-designation">Web developer</span>
                                  </div>
                              </div>
                              </div>
                          </SwiperSlide>
                          <SwiperSlide>
                              <div className="it-testimonial-item">
                              <div className="it-testimonial-rating">
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                              </div>
                              <div className="it-testimonial-dsc">
                                  <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim ad minim veniam, quis nostrud”</p>
                              </div>
                              <div className="it-testimonial-avater-box d-flex align-items-center">
                                  <div className="it-testimonial-avater-thumb p-relative">
                                  <img src="assets/img/home-1/testimonial/img/avater-2.png" alt="" />
                                  <div className="it-testimonial-avater-icon">
                                      <i className="fa-solid fa-quote-right"></i>
                                  </div>
                                  </div>
                                  <div className="it-testimonial-avater-info">
                                  <h3 className="it-testimonial-avater-title">Alan D. Rymer</h3>
                                  <span className="it-testimonial-avater-designation">UI/UX Designer</span>
                                  </div>
                              </div>
                              </div>
                          </SwiperSlide>
                          <SwiperSlide>
                              <div className="it-testimonial-item">
                              <div className="it-testimonial-rating">
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                              </div>
                              <div className="it-testimonial-dsc">
                                  <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim ad minim veniam, quis nostrud”</p>
                              </div>
                              <div className="it-testimonial-avater-box d-flex align-items-center">
                                  <div className="it-testimonial-avater-thumb p-relative">
                                  <img src="assets/img/home-1/testimonial/img/avater-3.png" alt="" />
                                  <div className="it-testimonial-avater-icon">
                                      <i className="fa-solid fa-quote-right"></i>
                                  </div>
                                  </div>
                                  <div className="it-testimonial-avater-info">
                                  <h3 className="it-testimonial-avater-title">S. Swindell</h3>
                                  <span className="it-testimonial-avater-designation">CEO of ordianIT</span>
                                  </div>
                              </div>
                              </div>
                          </SwiperSlide>
                          <SwiperSlide>
                              <div className="it-testimonial-item">
                              <div className="it-testimonial-rating">
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                              </div>
                              <div className="it-testimonial-dsc">
                                  <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim ad minim veniam, quis nostrud”</p>
                              </div>
                              <div className="it-testimonial-avater-box d-flex align-items-center">
                                  <div className="it-testimonial-avater-thumb p-relative">
                                  <img src="assets/img/home-1/testimonial/img/avater-2.png" alt="" />
                                  <div className="it-testimonial-avater-icon">
                                      <i className="fa-solid fa-quote-right"></i>
                                  </div>
                                  </div>
                                  <div className="it-testimonial-avater-info">
                                  <h3 className="it-testimonial-avater-title">Alan D. Rymer</h3>
                                  <span className="it-testimonial-avater-designation">UI/UX Designer</span>
                                  </div>
                              </div>
                              </div>
                          </SwiperSlide>
                          <SwiperSlide>
                              <div className="it-testimonial-item">
                              <div className="it-testimonial-rating">
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                                  <span><i className="fa-solid fa-star"></i></span>
                              </div>
                              <div className="it-testimonial-dsc">
                                  <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim ad minim veniam, quis nostrud”</p>
                              </div>
                              <div className="it-testimonial-avater-box d-flex align-items-center">
                                  <div className="it-testimonial-avater-thumb p-relative">
                                  <img src="assets/img/home-1/testimonial/img/avater-2.png" alt="" />
                                  <div className="it-testimonial-avater-icon">
                                      <i className="fa-solid fa-quote-right"></i>
                                  </div>
                                  </div>
                                  <div className="it-testimonial-avater-info">
                                  <h3 className="it-testimonial-avater-title">Alan D. Rymer</h3>
                                  <span className="it-testimonial-avater-designation">UI/UX Designer</span>
                                  </div>
                              </div>
                              </div>
                          </SwiperSlide>
                          </Swiper>
                      </div>
                      </div>
                  </div>
              </div>




              <div className="it-blog-area pt-120 pb-120 p-relative">
              <div className="it-blog-shape-box d-none d-xl-block">
                  <div className="it-blog-shape-1">
                  <img src="assets/img/home-1/blog/shape/ticket.png" alt="" />
                  </div>
              </div>
              <div className="container">
                  <div className="row justify-content-center">
                  <div className="col-xl-6">
                      <div className="it-blog-title-box mb-65 text-center">
                      <span className="it-section-subtitle">Our Recent Blog</span>
                      <h3 className="it-section-title">Amazing news & blog for every update</h3>
                      </div>
                  </div>
                  </div>
                  <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                      <div className="it-blog-item p-relative">
                      <div className="it-blog-thumb">
                          <a href="blog-details.html">
                          <img src="assets/img/home-1/blog/images/blog-1.jpg" alt="" />
                          </a>
                      </div>
                      <div className="it-blog-categories">
                          <span>Adventure</span>
                      </div>
                      <div className="it-blog-content">
                          <div className="it-blog-meta-box mb-20 d-flex align-items-center">
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-solid fa-calendar-days"></i>
                              March 28, 2023
                              </span>
                          </div>
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-regular fa-comments"></i>
                              2 Comments
                              </span>
                          </div>
                          </div>
                          <h3 className="it-blog-title mb-20">
                          <a href="blog-details.html">You should See things when visiting Japan</a>
                          </h3>
                          <div className="it-blog-button">
                          <a href="blog-details.html" className="it-btn-blog blog-style-btn">explore more</a>
                          </div>
                      </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                      <div className="it-blog-item p-relative">
                      <div className="it-blog-thumb">
                          <a href="blog-details.html">
                          <img src="assets/img/home-1/blog/images/blog-2.jpg" alt="" />
                          </a>
                      </div>
                      <div className="it-blog-categories">
                          <span>City Tours</span>
                      </div>
                      <div className="it-blog-content">
                          <div className="it-blog-meta-box mb-20 d-flex align-items-center">
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-solid fa-calendar-days"></i>
                              March 28, 2023
                              </span>
                          </div>
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-regular fa-comments"></i>
                              2 Comments
                              </span>
                          </div>
                          </div>
                          <h3 className="it-blog-title mb-20">
                          <a href="blog-details.html">A place where start new life with adventure travel</a>
                          </h3>
                          <div className="it-blog-button">
                          <a href="blog-details.html" className="it-btn-blog blog-style-btn">explore more</a>
                          </div>
                      </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                      <div className="it-blog-item p-relative">
                      <div className="it-blog-thumb">
                          <a href="blog-details.html">
                          <img src="assets/img/home-1/blog/images/blog-3.jpg" alt="" />
                          </a>
                      </div>
                      <div className="it-blog-categories">
                          <span>City Tours</span>
                      </div>
                      <div className="it-blog-content">
                          <div className="it-blog-meta-box mb-20 d-flex align-items-center">
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-solid fa-calendar-days"></i>
                              March 28, 2023
                              </span>
                          </div>
                          <div className="it-blog-meta">
                              <span>
                              <i className="fa-regular fa-comments"></i>
                              2 Comments
                              </span>
                          </div>
                          </div>
                          <h3 className="it-blog-title mb-20">
                          <a href="blog-details.html">A place where start new life with adventure Dhaka</a>
                          </h3>
                          <div className="it-blog-button">
                          <a href="blog-details.html" className="it-btn-blog blog-style-btn">explore more</a>
                          </div>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>

            </main>
            </>
            )}
       </>
  );
};



export default HomePage;
