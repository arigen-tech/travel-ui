import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
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
  const [tripType, setTripType] = useState("oneway"); // Default trip type
  const [rows, setRows] = useState([{ from: "", to: "", departure: "" }]); // Rows for Multi Trip
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle
  const [travellerCounts, setTravellerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  }); // Traveller counts
  const [cabinClass, setCabinClass] = useState("Economy"); // Default cabin class
  const [selectedFromDate, setSelectedFromDate] = useState(new Date()); 
  const [selectedReturnDate, setSelectedReturnDate] = useState(new Date()); // State for return date

   // Format date to "10 Jan'2025"
   const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate.replace(" ", " ").replace(" ", "'");
  };


  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
    if (e.target.value === "oneway" || e.target.value === "multiway") {
      setSelectedReturnDate(null); // Clear return date if not needed
    }
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
      alert("No more rows to delete.");
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
  const handleSubmitTravellercount = (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      tripType,
      rows,
      travellerCounts,
      cabinClass,
    });
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
                                          <DatePicker
                                              selected={selectedFromDate || new Date()} // Default to current date if no date is selected
                                              onChange={(date) => {
                                                setSelectedFromDate(date);
                                                setSelectedReturnDate(null); // Reset return date if departure changes
                                              }}
                                              dateFormat="dd MMM yyyy"
                                              minDate={new Date()} // Prevent past dates
                                              customInput={
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  value={formatDate(selectedFromDate)} // Display custom format
                                                  readOnly
                                                />
                                              }
                                            />

                                          <small className="text-muted">Monday</small>
                                        </div>
                                        <div className={`col-md-2 form-group ${tripType === 'oneway' || tripType === 'multiway' ? 'disabled' : ''}`}>
                                          <label htmlFor="return">Return</label>
                                          <DatePicker
                                            selected={selectedReturnDate ? selectedReturnDate : selectedFromDate} // Return date
                                            onChange={(date) => setSelectedReturnDate(date)} // Set return date
                                            dateFormat="dd MMM yyyy"
                                            minDate={selectedFromDate || new Date()} // Prevent return before departure
                                            disabled={tripType === "oneway" || tripType === "multiway"} // Disable for one-way or multi-trip
                                            customInput={
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={formatDate(selectedReturnDate ? selectedReturnDate : selectedFromDate)} // Display custom format
                                                readOnly
                                              />
                                            }
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
                                                    onClick={() => {
                                                      setTravellerCounts({ adults: 1, children: 0, infants: 0 }); // Reset to default values
                                                      setCabinClass("Economy"); // Reset cabin class if needed
                                                      setDropdownOpen(false); // Close the dropdown
                                                    }}
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
                                              
                                              <DatePicker
                                                selected={row.departure ? new Date(row.departure) : selectedFromDate} // Default to initial departure
                                                onChange={(date) => handleRowChange(index, "departure", date.toISOString().split("T")[0])}
                                                dateFormat="dd MMM yyyy"
                                                minDate={selectedFromDate} // Restrict to selected departure date or later
                                                customInput={
                                                  <input
                                                    type="text"
                                                    id={`departure-${index}`}
                                                    className="form-control"
                                                    value={formatDate(row.departure ? new Date(row.departure) : selectedFromDate)}
                                                    readOnly
                                                  />
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

                                 
                                  </div>
                              </div>
                          </div>
                      </div>
              </section>
              {/* Flight Listing Start */}
              <section className="flight-listing-page mb-60">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 mb-xl-0 mb-3">
                      <div className="sidebar bg-white rounded-3 light-shadow p-3">
                        <div className="sidebar-title">
                          <h5 className="lightest-black"><FilterAltIcon /> Filter Search</h5>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="filtersection">
                        <h5 className="lightest-black">Airlines</h5>
                        <ul class="list-group">
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            AkasaAir
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            Air India Express
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            SpiceJet
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            Indigo
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
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
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="filtersection">
                        <h5 className="lightest-black">Stops</h5>
                        <ul class="list-group">
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            Non-Stop
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            1 Stop
                          </li>
                          <li class="list-group-item">
                            <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            2+ Stop
                          </li>
                        </ul>
                        </div>
                        <hr className="bg-light-gray mt-24 mb-24" />
                        <div className="filtersection">
                        <h5 className="lightest-black">Departure</h5>
                        <div className="content-block">
                          <div className="radio-tile-group sidebar pb-24">
                            <div className="input-container">
                              <input
                                id="e-morning"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="e-morning"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="sunrise" />
                                <label htmlFor="e-morning" className="radio-tile-label departure-radio">
                                  Before 6 AM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="morning"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="morning"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="morning" />
                                <label htmlFor="morning" className="radio-tile-label departure-radio">
                                6 AM - 12 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="afternoon"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="after-noon"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="afternoon" />
                                <label htmlFor="afternoon" className="radio-tile-label departure-radio">
                                12 PM - 6 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="evening"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="evening"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="evening" />
                                <label htmlFor="evening" className="radio-tile-label departure-radio">
                                  After 6 PM
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="lightest-black mt-3">Arrival</h5>
                        <div className="content-block">
                          <div className="radio-tile-group sidebar pb-24">
                            <div className="input-container">
                              <input
                                id="e-morning"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="e-morning"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="sunrise" />
                                <label htmlFor="e-morning" className="radio-tile-label departure-radio">
                                  Before 6 AM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="morning"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="morning"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="morning" />
                                <label htmlFor="morning" className="radio-tile-label departure-radio">
                                6 AM - 12 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="afternoon"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="after-noon"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="afternoon" />
                                <label htmlFor="afternoon" className="radio-tile-label departure-radio">
                                12 PM - 6 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="evening"
                                className="radio-button"
                                type="radio"
                                name="clock-time"
                                defaultValue="evening"
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="evening" />
                                <label htmlFor="evening" className="radio-tile-label departure-radio">
                                  After 6 PM
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9">
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
