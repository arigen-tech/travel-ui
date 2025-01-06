import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "./flightlist.css";
import Loader from '../../assets/img/loader.gif';
import Airindia from '../../assets/img/AI.png';
import Routeplan from '../../assets/img/route-plan.png';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Slider, Box, TextField } from "@mui/material";

const Flightlist = () => {

  const [loading, setLoading] = useState(true); // Preloader visible initially
  const [value, setValue] = useState([130, 250]); // Initial range values

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

  const [travellerCounts, setTravellerCounts] = useState({ adults: 1, children: 0, infants: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updateTravellerCount = (type, delta) => {
    setTravellerCounts((prev) => {
      const newCount = Math.max(0, prev[type] + delta);
      return { ...prev, [type]: newCount };
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
  }
    

  
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
              <section className="searchform p-4 mb-4">
                      <div className="container">
                          <div className="it-tour-package-wrap it-slider-tour-style it-tour-package-box z-index">
                          <div className="it-tour-package-location__wrapper">
                                  <div className="row">
                                    {/* Flight Search Form */}
                                      <form>
                                        <div className="form-header">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                          <div className="d-flex align-items-center">
                                          <div className="form-check d-flex align-items-center me-3 mb-2">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="Radio"
                                              id="oneway"
                                              defaultValue="oneway"
                                              defaultChecked
                                            />
                                            <label className="form-check-label fs-14 ms-2" htmlFor="oneway">
                                              Oneway
                                            </label>
                                          </div>
                                          <div className="form-check d-flex align-items-center me-3 mb-2">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="Radio"
                                              id="roundtrip"
                                              defaultValue="roundtrip"
                                            />
                                            <label className="form-check-label fs-14 ms-2" htmlFor="roundtrip">
                                              Round Trip
                                            </label>
                                          </div>
                                          <div className="form-check d-flex align-items-center me-3 mb-2">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="Radio"
                                              id="multiway"
                                              defaultValue="multiway"
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
                                            <input
                                              type="text"
                                              id="from"
                                              className="form-control"
                                              defaultValue="Newyork"
                                            />
                                            <small className="text-muted">Ken International Airport</small>
                                          </div>
                                          <div className="col-md-2 form-group">
                                            <label htmlFor="to">To</label>
                                            <input
                                              type="text"
                                              id="to"
                                              className="form-control"
                                              defaultValue="Las Vegas"
                                            />
                                            <small className="text-muted">Martini International Airport</small>
                                          </div>
                                          <div className="col-md-2 form-group">
                                            <label htmlFor="departure">Departure</label>
                                            <input
                                              type="date"
                                              id="departure"
                                              className="form-control"
                                              defaultValue="2024-10-21"
                                            />
                                            <small className="text-muted">Monday</small>
                                          </div>
                                          <div className="col-md-2 form-group">
                                            <label htmlFor="return">Return</label>
                                            <input
                                              type="date"
                                              id="return"
                                              className="form-control"
                                              defaultValue="2024-10-23"
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
                                                4 Persons, 1 Adult, Economy
                                              </button>
                                              <ul className={`dropdown-menu travellersDropdowncontent py-3 ${dropdownOpen ? 'show' : ''}`} aria-labelledby="travellersDropdown">
                                                <li class="travellerscol p-2 mb-2 row">
                                                  <div className="travellers-dropdown-header">Travellers</div>
                                                  <div className="traveller-control col-md-4">
                                                    <span>Adults (12+ Yrs)</span>
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('adults', -1)}
                                                      >
                                                        -
                                                      </button>
                                                      <span className="traveller-count" id="adultsCount">
                                                        {travellerCounts.adults}
                                                      </span>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('adults', +1)}
                                                      >
                                                        +
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="traveller-control col-md-4">
                                                    <span>Children (2-12 Yrs)</span>
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('children', -1)}
                                                      >
                                                        -
                                                      </button>
                                                      <span className="traveller-count" id="childrenCount">
                                                      {travellerCounts.children}
                                                      </span>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('children', +1)}
                                                        
                                                      >
                                                        +
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="traveller-control col-md-4">
                                                    <span>Infants (0-2 Yrs)</span>
                                                    <div>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('infants', -1)}
                                                      >
                                                        -
                                                      </button>
                                                      <span className="traveller-count" id="infantsCount">
                                                      {travellerCounts.infants}
                                                      </span>
                                                      <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        onClick={() => updateTravellerCount('infants', +1)}
                                                      >
                                                        +
                                                      </button>
                                                    </div>
                                                  </div>
                                                </li>
                                                <li className="travellerscol row p-2">
                                                  <div className="travellers-dropdown-header">Class</div>
                                                    <div className="form-check traveller-control col-md-3">
                                                      <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="cabinClass"
                                                        id="economy"
                                                        defaultValue="Economy"
                                                        defaultChecked
                                                      />
                                                      <label className="form-check-label" htmlFor="economy">
                                                        Economy
                                                      </label>
                                                    </div>
                                                    <div className="form-check traveller-control col-md-3">
                                                      <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="cabinClass"
                                                        id="premiumEconomy"
                                                        defaultValue="Premium Economy"
                                                      />
                                                      <label
                                                        className="form-check-label"
                                                        htmlFor="premiumEconomy"
                                                      >
                                                        Premium Economy
                                                      </label>
                                                    </div>
                                                    <div className="form-check traveller-control col-md-3">
                                                      <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="cabinClass"
                                                        id="business"
                                                        defaultValue="Business"
                                                      />
                                                      <label className="form-check-label" htmlFor="business">
                                                        Business
                                                      </label>
                                                    </div>
                                                    <div className="form-check traveller-control col-md-3">
                                                      <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="cabinClass"
                                                        id="firstClass"
                                                        defaultValue="First Class"
                                                      />
                                                      <label className="form-check-label" htmlFor="firstClass">
                                                        First Class
                                                      </label>
                                                    </div>
                                                </li>
                                                <li>
                                                  <div className="dropdown-footer">
                                                    <button className="btn btn-secondary btn-sm" type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                                      Cancel
                                                    </button>
                                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
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
                                              <button type="submit" onClick={handlesubmit}>
                                                Search <i className="fa-solid fa-magnifying-glass"></i>
                                              </button>
                                          </div>
                                          </div>
                                          </div>
                                        </div>
                                      </form>

                                 
                                  </div>
                              </div>
                          </div>
                      </div>
              </section>
              {/* Flight Listing Start */}
              <section className="flight-listing-page mb-60">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-xl-0 mb-3">
                      <div className="sidebar bg-white rounded-3 light-shadow p-3">
                        <div className="sidebar-title">
                          <h5 className="lightest-black"><FilterAltIcon /> Filter Search</h5>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="filtersection">
                        <h5 className="lightest-black">Popular Filters</h5>
                        <ul class="list-group">
                          <li class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                            Nonstop
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                            Morning Departure
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                            SpiceJet
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                            Indigo
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                            Air India
                          </li>
                        </ul>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="filtersection">
                        <h5 className="lightest-black">Price Range</h5>
                        <div data-role="main" className="ui-content">
                        <Box className="price-range-slider" sx={{ width: 300, padding: 2 }}>
                          {/* Range value display */}
                          <Box className="range-value" sx={{ marginBottom: 2, border:0 }}>
                            <TextField
                              id="amount"
                              value={`₹${value[0]} - ₹${value[1]}`}
                              InputProps={{
                                readOnly: true,
                              }}
                              fullWidth
                            />
                          </Box>

                          {/* Range slider */}
                          <Slider
                            id="slider-range"
                            className="range-bar"
                            value={value}
                            onChange={handleChange}
                            min={100}
                            max={100000}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                        </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-8">
                      <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3">
                        <div className="flight-area">
                          <div className="airline-name">
                            <img src={Airindia} alt="" />
                            <div>
                              <h5 className="lightest-black mb-8"> Air India</h5>
                              <h6 className="dark-gray">AI 777-90</h6>
                            </div>
                          </div>
                          <div className="flight-detail">
                            <div className="flight-departure">
                              <h5 className="color-black">12:00</h5>
                              <h5 className="dark-gray text-end">DLI</h5>
                            </div>
                            <div className="d-inline-flex align-items-center gap-8">
                              <span className="">From</span>
                              <div className="from-to text-center">
                                <h5 className="dark-gray">0h 50m</h5>
                                <img src={Routeplan} alt="" />
                                <h6 className="color-black">1 Stop</h6>
                              </div>
                              <span className="">To</span>
                            </div>
                            <div className="flight-departure">
                              <h5 className="color-black">12:50</h5>
                              <h5 className="dark-gray">BOM</h5>
                            </div>
                          </div>
                          <div className="flight-button">
                            <div className="amount">
                              <h5 className="color-black">₹2240</h5>
                              <h6 className="dark-gray text-end">Price</h6>
                            </div>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="color-black">Monday 14 August</h5>
                          <div>
                            <a href="#" className="accordion-button color-primary h5 collapsed">
                              <i className="fal fa-chevron-down color-primary " />
                              &nbsp;Flight Detail
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <div id="flightDetail"
                        className="accordion-collapse collapse mb-32"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="row bg-white br-10 light-shadow p-24 m-0 align-items-center">
                          <div className="col-lg-3 col-sm-4">
                            <div className="time-detail">
                              <h6 className="flight-date mb-32"> 14 August, 2023</h6>
                              <h6 className="color-black mb-8">Monday, Aug 14 - 12:00</h6>
                              <h6 className="dark-gray mb-16">0h 50m</h6>
                              <h6 className="dark-gray">Monday, Aug 14 - 12:50</h6>
                            </div>
                          </div>
                          <div className="col-lg-9 col-sm-8">
                            <div className="detail-block">
                              <div className="d-sm-flex d-block align-items-center gap-24">
                                <img src={Routeplan} alt="" />
                                <div className="content">
                                  <h6 className="dark-gray">Tpm Line</h6>
                                  <h6 className="dark-gray">
                                    Operated by Feel Dubai Airlines
                                  </h6>
                                  <h6 className="dark-gray">
                                    Economy | Flight FK234 | Aircraft BOEING 777-90
                                  </h6>
                                  <h6 className="dark-gray">Adult(s): 25KG luggage free</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                       <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3">
                        <div className="flight-area">
                          <div className="airline-name">
                            <img src={Airindia} alt="" />
                            <div>
                              <h5 className="lightest-black mb-8"> Air India</h5>
                              <h6 className="dark-gray">AI 777-90</h6>
                            </div>
                          </div>
                          <div className="flight-detail">
                            <div className="flight-departure">
                              <h5 className="color-black">12:00</h5>
                              <h5 className="dark-gray text-end">DLI</h5>
                            </div>
                            <div className="d-inline-flex align-items-center gap-8">
                              <span className="">From</span>
                              <div className="from-to text-center">
                                <h5 className="dark-gray">0h 50m</h5>
                                <img src={Routeplan} alt="" />
                                <h6 className="color-black">1 Stop</h6>
                              </div>
                              <span className="">To</span>
                            </div>
                            <div className="flight-departure">
                              <h5 className="color-black">12:50</h5>
                              <h5 className="dark-gray">BOM</h5>
                            </div>
                          </div>
                          <div className="flight-button">
                            <div className="amount">
                              <h5 className="color-black">₹2240</h5>
                              <h6 className="dark-gray text-end">Price</h6>
                            </div>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="color-black">Monday 14 August</h5>
                          <div>
                            <a href="#" className="accordion-button color-primary h5 collapsed">
                              <i className="fal fa-chevron-down color-primary " />
                              &nbsp;Flight Detail
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3">
                        <div className="flight-area">
                          <div className="airline-name">
                            <img src={Airindia} alt="" />
                            <div>
                              <h5 className="lightest-black mb-8"> Air India</h5>
                              <h6 className="dark-gray">AI 777-90</h6>
                            </div>
                          </div>
                          <div className="flight-detail">
                            <div className="flight-departure">
                              <h5 className="color-black">12:00</h5>
                              <h5 className="dark-gray text-end">DLI</h5>
                            </div>
                            <div className="d-inline-flex align-items-center gap-8">
                              <span className="">From</span>
                              <div className="from-to text-center">
                                <h5 className="dark-gray">0h 50m</h5>
                                <img src={Routeplan} alt="" />
                                <h6 className="color-black">1 Stop</h6>
                              </div>
                              <span className="">To</span>
                            </div>
                            <div className="flight-departure">
                              <h5 className="color-black">12:50</h5>
                              <h5 className="dark-gray">BOM</h5>
                            </div>
                          </div>
                          <div className="flight-button">
                            <div className="amount">
                              <h5 className="color-black">₹2240</h5>
                              <h6 className="dark-gray text-end">Price</h6>
                            </div>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="color-black">Monday 14 August</h5>
                          <div>
                            <a href="#" className="accordion-button color-primary h5 collapsed">
                              <i className="fal fa-chevron-down color-primary " />
                              &nbsp;Flight Detail
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3">
                        <div className="flight-area">
                          <div className="airline-name">
                            <img src={Airindia} alt="" />
                            <div>
                              <h5 className="lightest-black mb-8"> Air India</h5>
                              <h6 className="dark-gray">AI 777-90</h6>
                            </div>
                          </div>
                          <div className="flight-detail">
                            <div className="flight-departure">
                              <h5 className="color-black">12:00</h5>
                              <h5 className="dark-gray text-end">DLI</h5>
                            </div>
                            <div className="d-inline-flex align-items-center gap-8">
                              <span className="">From</span>
                              <div className="from-to text-center">
                                <h5 className="dark-gray">0h 50m</h5>
                                <img src={Routeplan} alt="" />
                                <h6 className="color-black">1 Stop</h6>
                              </div>
                              <span className="">To</span>
                            </div>
                            <div className="flight-departure">
                              <h5 className="color-black">12:50</h5>
                              <h5 className="dark-gray">BOM</h5>
                            </div>
                          </div>
                          <div className="flight-button">
                            <div className="amount">
                              <h5 className="color-black">₹2240</h5>
                              <h6 className="dark-gray text-end">Price</h6>
                            </div>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="color-black">Monday 14 August</h5>
                          <div>
                            <a href="#" className="accordion-button color-primary h5 collapsed">
                              <i className="fal fa-chevron-down color-primary " />
                              &nbsp;Flight Detail
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Flight Listing End */}
            </main>
            </>
            )}
       </>
  );
};



export default Flightlist;
