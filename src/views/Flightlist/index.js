import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./flightlist.css";
import Loader from "../../assets/img/loader.gif";
import Airindia from "../../assets/img/AI.png";
import Routeplan from "../../assets/img/route-plan.png";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Slider, Box, TextField } from "@mui/material";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { getRequest, postRequest } from "../../service/apiService";
import {
  FARE_RULE,
  GET_DEFAULT_AIRPORT,
  GET_FLIGHT,
  GET_SEARCH_AIRPORT,
  ITINERARY
} from "../../config/apiConfig";
const importAllImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((key) => {
    const fileName = key.replace("./", "").replace(".png", ""); // Extract file name without extension
    images[fileName] = requireContext(key);
  });
  return images;
};

const images = importAllImages(
  require.context("../../assets/img/tc_airline_icons", false, /\.png$/)
); // Adjust the path as needed
const Flightlist = () => {
  const location = useLocation();
  const constants = location.state || {};
  // console.log(constants);
  const [searchResponse, setSearchResponse] = useState(
    localStorage.getItem("flightSearchResponse") != null
      ? JSON.parse(localStorage.getItem("flightSearchResponse")).response
      : {
          results: { outboundFlights: [] },
          facets: { airlines: { outbound: [] } },
        }
  );
  const [sortBy,setSortBy]=useState(0);
  const [loading, setLoading] = useState(true); // Preloader visible initially
  const [tripType, setTripType] = useState(
    constants.tripType ? constants.tripType : "oneway"
  ); // Default trip type
  const [rows, setRows] = useState([{ from: "", to: "", departure: "" }]); // Rows for Multi Trip
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle
  const [travellerCounts, setTravellerCounts] = useState(
    constants.travellerCounts
      ? constants.travellerCounts
      : {
          adults: 1,
          children: 0,
          infants: 0,
        }
  ); // Traveller counts
  const [cabinClass, setCabinClass] = useState("Economy"); // Default cabin class
  const [selectedFromDate, setSelectedFromDate] = useState(
    constants.fromDate ? constants.fromDate : new Date()
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState(
    constants.returnDate ? constants.returnDate : new Date()
  ); // State for return date
  const itemsPerPage = 5; // Number of flights to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalFlights = searchResponse.results?searchResponse.results.outboundFlights.length:0;
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [value, setValue] = React.useState([100, 10000000]); // Price range
  const [departureTime, setDepartureTime] = React.useState(""); // Selected departure time range
  const [arrivalTime, setArrivalTime] = React.useState("");
  const [selectedStops, setSelectedStops] = React.useState([]);
  const [searchSubstring, setSearchSubstring] = useState("");
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [defaultAirports, setDefaultAirports] = useState([]);
  const [fromAirport, setFromAirport] = useState(constants.from?constants.from:{});
  const [toAirport, setToAirport] = useState(constants.to?constants.to:{});
  const [multiAirport, setMultiAirport] = useState([]);
  const [fareRule,setFareRule]=useState([]);
  const flightCabinClass = [
    { key: 1, value: "ALL" },
    { key: 2, value: "ECONOMY" },
    { key: 3, value: "PREMIUM ECONOMY" },
    { key: 4, value: "BUSINESS" },
    { key: 5, value: "PREMIUM BUSINESS" },
    { key: 6, value: "FIRST CLASS" }
  ];
  // Get flights for the current page

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFareDetails = async (flight) => {

    // setCurrentPage(page);
    let json = {
      traceId: searchResponse.traceId,
      resultIndex:flight.rI
    }
    // console.log(flight);
    // setLoading(true);
    const data = await postRequest(FARE_RULE, json);
    console.log(data.status);
    // console.log(data.response);
    // console.log(JSON.parse(data.response).results[0].fareRuleDetail);
    if (data?.status === 200 && Array.isArray(JSON.parse(data.response).results)) {
      // console.log(data.response);
      await setFareRule((prev) => ({
        ...prev,
        [flight.rI]: JSON.parse(data.response).results, // Add/Update the response in the fareRules array at key flight.rI
      }));
      console.log(fareRule);
    }

    // setLoading(false);
  };

  const locationOptions = [
    { value: "Delhi" },
    { value: "Mumbai" },
    { value: "Bangalore" },
    { value: "Chennai" },
  ];
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
  const handlePriceChange = (event, newValue) => {
    setValue(newValue); // Update price range
  };

  const handleDepartureTimeChange = (event) => {
    setDepartureTime(event.target.value); // Update departure time preference
  };

  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value); // Update arrival time preference
  };
  const handleSort=async (value) => {
    await setSortBy(value);
    console.log(value);
  }

  const isTimeInRange = (time, range) => {
    const hours = new Date(time).getHours();
    switch (range) {
      case "e-morning":
        return hours < 6;
      case "morning":
        return hours >= 6 && hours < 12;
      case "afternoon":
        return hours >= 12 && hours < 18;
      case "evening":
        return hours >= 18;
      default:
        return true; // No filter applied
    }
  };
  const isRefundable = (flag) => {
    if (flag) {
      return "REFUNDABLE";
    } else {
      return "NON REFUNDABLE";
    }
  };
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
  // const handleSubmitTravellercount = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted", {
  //     tripType,
  //     rows,
  //     travellerCounts,
  //     cabinClass,
  //   });
  // };
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update range values
  };

  useEffect(() => {
    fetchFrequentAirport();
    // console.log(searchResponse.response);

    // Simulate content loading (replace with real loading logic)
    const timer = setTimeout(() => {
      setLoading(false); // Hide preloader
    }, 1); // Simulate 3 seconds load time

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
  };
  // flight search form

  async function searchFlights(json) {
    setLoading(true);
    const data = await postRequest(GET_FLIGHT, json);
    setLoading(false);
    if(data.status === 200){
      localStorage.setItem("flightSearchResponse", data.response);
      setSearchResponse(await JSON.parse(data.response).response);
    }



    // navigate('/flightList',{ state: constants });
    // setFlightSearchResponse(data.response);
  }

  const handleSubmitTravellercount = (e) => {
    let json = {
      directFlight: "false",
      adultCount: travellerCounts.adults,
      childCount: travellerCounts.children,
      infantCount: travellerCounts.infants,
      flightCabinClass: "1",
      journeyType: tripType === "oneway" ? 1 : 2,
      preferredDepartureTime: selectedFromDate.toISOString().split(".")[0],
      origin: fromAirport.iataCode,
      destination: toAirport.iataCode,
      preferredReturnDepartureTime: selectedReturnDate
        ? selectedReturnDate.toISOString().split(".")[0]
        : null,
    };
    searchFlights(json);

    console.log(json);

    debugger;
    e.preventDefault();
  };
  async function fetchFrequentAirport() {
    try {
      const data = await getRequest(GET_DEFAULT_AIRPORT);
      if (data.status === 200 && Array.isArray(data.response)) {
        setFromAirports(data.response);
        setToAirports(data.response);
        setDefaultAirports(data.response);
        setFromAirport(constants.from?constants.from:data.response[0]);
        setToAirport(constants.to?constants.to:data.response[1]);
        // setMultiAirport([{fromAirport:data.response[0],toAirport:data.response[1]}]);
      } else {
        setFromAirports([]);
        setToAirports([]);
        // setFromAirport(undefined);
        // setToAirport(undefined);
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching amenities data:", error);
    } finally {
      setLoading(false);
    }
  }
  const updateAirportData = async (num, inputValue) => {
    try {
      if (inputValue.trim().length < 3 && num === 1) {
        setFromAirports(defaultAirports);
      } else if (inputValue.trim() === "" && num === 2) {
        setToAirports(defaultAirports);
      } else {
        debugger;
        let url = GET_SEARCH_AIRPORT + inputValue;
        console.log(url);
        const data = await getRequest(url);
        if (data?.status === 200 && Array.isArray(data.response)) {
          if (num === 1) {
            debugger;
            setFromAirports(data.response);
          } else {
            setToAirports(data.response);
          }
        } else {
          console.error("Unexpected response format:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching searched airports:", error);
    } finally {
    }
  };
  const handleFromAirportInputChange = (num, inputValue, { action }) => {
    if (action !== "input-change") return; // Only process user typing events
    updateAirportData(num, inputValue);
  };
  const handleMultiChange = (key, selectedOption, index) => {
    debugger;
    setMultiAirport((prevAirports) => {
      // Create a copy of the previous state
      let updatedAirports = [...prevAirports];

      // Update the specific key (fromAirport or toAirport) at the given index
      if (key === 1) {
        updatedAirports[index] = {
          ...updatedAirports[index],
          fromAirport: selectedOption,
        };
      } else if (key === 2) {
        updatedAirports[index] = {
          ...updatedAirports[index],
          toAirport: selectedOption,
        };
      }
      // Return the updated array
      return updatedAirports;
    });
  };


  const handleCheckboxChangeAirline = (code) => {
    setSelectedAirlines(
      (prevSelected) =>
        prevSelected.includes(code)
          ? prevSelected.filter((item) => item !== code) // Remove if already selected
          : [...prevSelected, code] // Add if not selected
    );
  };

  const currentFlightsInbound = searchResponse.results?searchResponse.results.inboundFlights:undefined;

  const currentFlights = (searchResponse.results?(searchResponse.results.outboundFlights.filter(
    (flight) => {
      const isAirlineMatched = selectedAirlines.length
        ? flight.sg.some((segment) => selectedAirlines.includes(segment.al.alC))
        : true;

      const isPriceInRange = flight.fF >= value[0] && flight.fF <= value[1];

      const isDepartureTimeMatched = departureTime
        ? flight.sg.some((segment) =>
            isTimeInRange(segment.or.dT, departureTime)
          )
        : true;

      const isArrivalTimeMatched = arrivalTime
        ? flight.sg.some((segment) => isTimeInRange(segment.ds.aT, arrivalTime))
        : true;
      const stops = flight.sg?(flight.sg.length - 1):0;

      return (
        (selectedStops.length === 0 || selectedStops.includes(stops)) &&
        isAirlineMatched &&
        isPriceInRange &&
        isDepartureTimeMatched &&
        isArrivalTimeMatched
      );
    }
  )):[]);

  const totalPages = Math.ceil(currentFlights.length / itemsPerPage);

  const handleStopsChange = (stopCount) => {
    setSelectedStops(
      (prev) =>
        prev.includes(stopCount)
          ? prev.filter((stop) => stop !== stopCount) // Remove stopCount if already selected
          : [...prev, stopCount] // Add stopCount if not selected
    );
  };

  const [openDetails, setOpenDetails] = useState({});

  const toggleDetail = (index) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const navigate = useNavigate();
  const handleBookNow = async (flight) => {

    let json = {
      items: [{
        type: "FLIGHT",
        resultIndex: flight.rI
      }],
      traceId: searchResponse.traceId,
    }
    const data = await postRequest(ITINERARY,json);
    if(data.status === 200){
      // console.log(data.response);
      sessionStorage.setItem(`itinerary`,data.response);
      navigate("/flightBooking",{ state: JSON.parse(data.response) });
    }


    // navigate("/flightBooking");
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
                                <label
                                  className="form-check-label fs-14 ms-2"
                                  htmlFor="oneway"
                                >
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
                                <label
                                  className="form-check-label fs-14 ms-2"
                                  htmlFor="multiway"
                                >
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
                          <div className="col-md-2 form-group firstinput">
                            <label htmlFor="fromA">From</label>
                            <Select
                              id="fromA"
                              options={fromAirports}
                              onInputChange={(inputValue, actionMeta) =>
                                handleFromAirportInputChange(
                                  1,
                                  inputValue,
                                  actionMeta
                                )
                              }
                              onChange={(selectedOption) =>
                                setFromAirport(selectedOption)
                              }
                              value={fromAirport}
                              getOptionLabel={(e) =>
                                e.city +
                                  " - " +
                                  e.country +
                                  " (" +
                                  e.airportCode +
                                  ")" || "Unknown City"
                              }
                              formatOptionLabel={(option) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span>
                                    {option.city} - {option.country} (
                                    {option.airportCode || "Unknown Code"})
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "0.8em",
                                      color: "#888",
                                    }}
                                  >
                                    {option.airportName || "Unknown Airport"}
                                  </span>
                                </div>
                              )}
                              getOptionValue={(e) => e || ""}
                              classNamePrefix="react-select"
                              placeholder="Select an airport"
                            />
                            {/*<small className="text-muted">{fromAirport !== undefined ? fromAirport.airportName : ("")}</small>*/}
                          </div>
                          <div className="col-md-2 form-group">
                            <label htmlFor="to">To</label>
                            <Select
                              id="toA"
                              options={toAirports}
                              value={toAirport}
                              onInputChange={(inputValue, actionMeta) =>
                                handleFromAirportInputChange(
                                  2,
                                  inputValue,
                                  actionMeta
                                )
                              }
                              onChange={(selectedOption) =>
                                setToAirport(selectedOption)
                              }
                              getOptionLabel={(e) =>
                                e.city +
                                  " - " +
                                  e.country +
                                  " (" +
                                  e.airportCode +
                                  ")" || "Unknown City"
                              }
                              formatOptionLabel={(option) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span>
                                    {option.city} - {option.country} (
                                    {option.airportCode || "Unknown Code"})
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "0.8em",
                                      color: "#888",
                                    }}
                                  >
                                    {option.airportName || "Unknown Airport"}
                                  </span>
                                </div>
                              )}
                              getOptionValue={(e) => e || ""}
                              classNamePrefix="react-select"
                            />
                            {/*<small className="text-muted">{toAirport !== undefined ? toAirport.airportName : ("")}</small>*/}
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
                          <div
                            className={`col-md-2 form-group ${
                              tripType === "oneway" || tripType === "multiway"
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <label htmlFor="return">Return</label>
                            <DatePicker
                              selected={
                                selectedReturnDate
                                  ? selectedReturnDate
                                  : selectedFromDate
                              } // Return date
                              onChange={(date) => setSelectedReturnDate(date)} // Set return date
                              dateFormat="dd MMM yyyy"
                              minDate={selectedFromDate || new Date()} // Prevent return before departure
                              disabled={
                                tripType === "oneway" || tripType === "multiway"
                              } // Disable for one-way or multi-trip
                              customInput={
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formatDate(
                                    selectedReturnDate
                                      ? selectedReturnDate
                                      : selectedFromDate
                                  )} // Display custom format
                                  readOnly
                                />
                              }
                            />

                            <small className="text-muted">Wednesday</small>
                          </div>
                          <div className="col-md-3 form-group">
                            <label htmlFor="travellersDropdown">
                              Travellers and cabin class
                            </label>
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
                                  <div className="travellers-dropdown-header">
                                    Travellers
                                  </div>
                                  {["adults", "children", "infants"].map(
                                    (type, index) => (
                                      <div
                                        key={index}
                                        className="traveller-control col-md-4"
                                      >
                                        <span>{`${
                                          type.charAt(0).toUpperCase() +
                                          type.slice(1)
                                        }${
                                          type === "adults"
                                            ? " (12+ Yrs)"
                                            : type === "children"
                                            ? " (2-12 Yrs)"
                                            : " (0-2 Yrs)"
                                        }`}</span>
                                        <div>
                                          <button
                                            type="button"
                                            className="btn btn-sm"
                                            onClick={() =>
                                              updateTravellerCount(type, -1)
                                            }
                                          >
                                            -
                                          </button>
                                          <span className="traveller-count">
                                            {travellerCounts[type]}
                                          </span>
                                          <button
                                            type="button"
                                            className="btn btn-sm"
                                            onClick={() =>
                                              updateTravellerCount(type, +1)
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </li>
                                <li className="travellerscol row p-2">
                                  <div className="travellers-dropdown-header">
                                    Class
                                  </div>
                                  {[
                                    "Economy",
                                    "Premium Economy",
                                    "Business",
                                    "First Class",
                                  ].map((type, index) => (
                                    <div
                                      key={index}
                                      className="form-check traveller-control col-md-3"
                                    >
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
                                        htmlFor={type
                                          .replace(" ", "")
                                          .toLowerCase()}
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
                                        setTravellerCounts({
                                          adults: 1,
                                          children: 0,
                                          infants: 0,
                                        }); // Reset to default values
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
                                <button
                                  type="submit"
                                  onClick={handleSubmitTravellercount}
                                >
                                  Search{" "}
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {tripType === "multiway" &&
                          rows.map((row, index) => (
                            <div className="row mt-2" key={index}>
                              <div className="col-md-4 form-group firstinput">
                                <label htmlFor={`from-${index}`}>From</label>
                                <Select
                                  id={`from-${index}`}
                                  options={fromAirports}
                                  value={
                                    multiAirport[index]?.fromAirport || null
                                  }
                                  onInputChange={(inputValue, actionMeta) =>
                                    handleFromAirportInputChange(
                                      1,
                                      inputValue,
                                      actionMeta
                                    )
                                  }
                                  onChange={(selectedOption) =>
                                    handleMultiChange(1, selectedOption, index)
                                  }
                                  getOptionLabel={(e) =>
                                    e.city +
                                      " - " +
                                      e.country +
                                      " (" +
                                      e.airportCode +
                                      ")" || "Unknown City"
                                  }
                                  formatOptionLabel={(option) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span>
                                        {option.city} - {option.country} (
                                        {option.airportCode || "Unknown Code"})
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "0.8em",
                                          color: "#888",
                                        }}
                                      >
                                        {option.airportName ||
                                          "Unknown Airport"}
                                      </span>
                                    </div>
                                  )}
                                  getOptionValue={(e) => e || ""}
                                  classNamePrefix="react-select"
                                />
                                {/*<small className="text-muted">Indiragandhi*/}
                                {/*    International Airport</small>*/}
                              </div>
                              <div className="col-md-4 form-group">
                                <label htmlFor={`to-${index}`}>To</label>
                                {/*<label htmlFor={`to-${index}`}>To</label>*/}
                                <Select
                                  id={`to-${index}`}
                                  options={toAirports}
                                  value={multiAirport[index]?.toAirport || null}
                                  onInputChange={(inputValue, actionMeta) =>
                                    handleFromAirportInputChange(
                                      2,
                                      inputValue,
                                      actionMeta
                                    )
                                  }
                                  onChange={(selectedOption) =>
                                    handleMultiChange(2, selectedOption, index)
                                  }
                                  getOptionLabel={(e) =>
                                    e.city +
                                      " - " +
                                      e.country +
                                      " (" +
                                      e.airportCode +
                                      ")" || "Unknown City"
                                  }
                                  getOptionValue={(e) => e || ""}
                                  formatOptionLabel={(option) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span>
                                        {option.city} - {option.country} (
                                        {option.airportCode || "Unknown Code"})
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "0.8em",
                                          color: "#888",
                                        }}
                                      >
                                        {option.airportName ||
                                          "Unknown Airport"}
                                      </span>
                                    </div>
                                  )}
                                  classNamePrefix="react-select"
                                />
                                {/*<small className="text-muted">CSM*/}
                                {/*    International Airport</small>*/}
                              </div>
                              <div className="col-md-4 form-group">
                                <label htmlFor={`departure-${index}`}>
                                  Departure
                                </label>

                                <DatePicker
                                  selected={
                                    row.departure
                                      ? new Date(row.departure)
                                      : selectedFromDate
                                  } // Default to initial departure
                                  onChange={(date) =>
                                    handleRowChange(
                                      index,
                                      "departure",
                                      date.toISOString().split("T")[0]
                                    )
                                  }
                                  dateFormat="dd MMM yyyy"
                                  minDate={selectedFromDate} // Restrict to selected departure date or later
                                  customInput={
                                    <input
                                      type="text"
                                      id={`departure-${index}`}
                                      className="form-control"
                                      value={formatDate(
                                        row.departure
                                          ? new Date(row.departure)
                                          : selectedFromDate
                                      )}
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
                                <i className="fa-solid fa-trash-alt"></i> Delete
                                Row
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

            <section className="flight-listing-page mb-60">
              <div className="container">
                {constants.fromDate?(<div className="row">
                  <div className="col-lg-3 col-md-3">
                    <h5>{currentFlights.length} Flights Found</h5>
                  </div>
                  <div className="col-lg-9 col-md-9">
                    <h5>
                      {fromAirport.city} <ArrowRightAltIcon/> {toAirport.city}
                      {/*<ArrowRightAltIcon />Bengaluru */}
                      {formatedDate(constants.fromDate)}
                    </h5>
                  </div>
                </div>):""}

                <div className="row">
                  <div className="col-xl-3 col-lg-3 mb-xl-0 mb-3">
                    <div className="sidebar bg-white rounded-3 light-shadow p-3">
                      <div className="sidebar-title">
                        <h5 className="lightest-black">
                          <FilterAltIcon/> Filter Search
                        </h5>
                      </div>
                      <hr className="bg-light-gray mt-24 mb-24"/>
                      <div className="filtersection">
                        <h5 className="lightest-black">Airlines (Outbound)</h5>
                        <ul class="list-group">
                          {searchResponse.facets?searchResponse.facets.airlines.outbound.map(
                            (airline, index) => (
                              <li key={index} className="list-group-item">
                                <input
                                  className="form-check-input me-2"
                                  type="checkbox"
                                  value={airline.code}
                                  aria-label={`Select ${airline.name}`}
                                  onChange={() =>
                                    handleCheckboxChangeAirline(airline.code)
                                  }
                                  checked={selectedAirlines.includes(
                                    airline.code
                                  )}
                                />
                                {airline.name}
                                {/*<span className="text-muted">({airline.count})</span>*/}
                              </li>
                            )
                          ):""}
                        </ul>
                      </div>
                      <hr className="bg-light-gray mt-24 mb-24" />

                      <div className="filtersection">
                        <h5 className="lightest-black">Price Range</h5>
                        <Box
                          className="price-range-slider"
                          sx={{ width: 300, padding: 2 }}
                        >
                          <TextField
                            id="amount"
                            value={`₹${value[0]} - ₹${value[1]}`}
                            InputProps={{ readOnly: true }}
                            fullWidth
                          />
                          <Slider
                            value={value}
                            onChange={handlePriceChange}
                            min={100}
                            max={100000000}
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                      <hr className="bg-light-gray mt-24 mb-24" />
                      <div className="filtersection">
                        <h5 className="lightest-black">Stops</h5>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value="0"
                              checked={selectedStops.includes(0)}
                              onChange={() => handleStopsChange(0)}
                            />
                            Non-Stop
                          </li>
                          <li className="list-group-item">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value="1"
                              checked={selectedStops.includes(1)}
                              onChange={() => handleStopsChange(1)}
                            />
                            1 Stop
                          </li>
                          <li className="list-group-item">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value="2"
                              checked={selectedStops.includes(2)}
                              onChange={() => handleStopsChange(2)}
                            />
                            2+ Stops
                          </li>
                        </ul>
                      </div>

                      <hr className="bg-light-gray mt-24 mb-24" />
                      <div className="filtersection">
                        <h5 className="lightest-black">Departure</h5>
                        <div className="content-block">
                          <div className="radio-tile-group sidebar pb-24">
                            <div className="input-container">
                              {/*<input
                                    id="e-morning"
                                    className="radio-button"
                                    type="radio"
                                    name="clock-time"
                                    defaultValue="e-morning"
                                />*/}
                              <input
                                id="e-morning"
                                className="radio-button"
                                type="radio"
                                name="departure-time"
                                value="e-morning"
                                onChange={handleDepartureTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="sunrise" />
                                <label
                                  htmlFor="e-morning"
                                  className="radio-tile-label departure-radio"
                                >
                                  Before 6 AM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="morning"
                                className="radio-button"
                                type="radio"
                                defaultValue="morning"
                                name="departure-time"
                                value="morning"
                                onChange={handleDepartureTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="morning" />
                                <label
                                  htmlFor="morning"
                                  className="radio-tile-label departure-radio"
                                >
                                  6 AM - 12 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="afternoon"
                                className="radio-button"
                                type="radio"
                                defaultValue="afternoon"
                                name="departure-time"
                                value="afternoon"
                                onChange={handleDepartureTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="afternoon" />
                                <label
                                  htmlFor="afternoon"
                                  className="radio-tile-label departure-radio"
                                >
                                  12 PM - 6 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="evening"
                                className="radio-button"
                                type="radio"
                                // name="clock-time"
                                defaultValue="evening"
                                name="departure-time"
                                value="evening"
                                onChange={handleDepartureTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="evening" />
                                <label
                                  htmlFor="evening"
                                  className="radio-tile-label departure-radio"
                                >
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
                                // name="clock-time"
                                defaultValue="e-morning"
                                name="arrival-time"
                                value="e-morning"
                                onChange={handleArrivalTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="sunrise" />
                                <label
                                  htmlFor="e-morning"
                                  className="radio-tile-label departure-radio"
                                >
                                  Before 6 AM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="morning"
                                className="radio-button"
                                type="radio"
                                defaultValue="morning"
                                name="arrival-time"
                                value="morning"
                                onChange={handleArrivalTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="morning" />
                                <label
                                  htmlFor="morning"
                                  className="radio-tile-label departure-radio"
                                >
                                  6 AM - 12 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="afternoon"
                                className="radio-button"
                                type="radio"
                                defaultValue="afternoon"
                                name="arrival-time"
                                value="afternoon"
                                onChange={handleArrivalTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="afternoon" />
                                <label
                                  htmlFor="afternoon"
                                  className="radio-tile-label departure-radio"
                                >
                                  12 PM - 6 PM
                                </label>
                              </div>
                            </div>
                            <div className="input-container">
                              <input
                                id="evening"
                                className="radio-button"
                                type="radio"
                                defaultValue="evening"
                                name="arrival-time"
                                value="evening"
                                onChange={handleArrivalTimeChange}
                              />
                              <div className="radio-tile sidebar-departure-radio">
                                <i className="evening" />
                                <label
                                  htmlFor="evening"
                                  className="radio-tile-label departure-radio"
                                >
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
                    <div className="row m-0 p-0 mb-2">
                      <div className="fascolm col-md-4">
                        <div className="sortby">Sort By:</div>
                        <div className="chepestbt gr-bdr">
                          <span className="cheptxt" onClick={()=>handleSort(0)}>Cheapest</span>
                        </div>
                        <div className="fastestbt">
                          <span className="cheptxt" onClick={()=>handleSort(1)}>Fastest</span>
                        </div>
                      </div>
                      <div className="col-md-3 col-xs-12 fltr txt-fon1">
                        <a className="txt-m1" href="#">
                          Previous Day
                        </a>
                        |
                        <a className="txt-m1" href="#">
                          Next Day
                        </a>
                      </div>
                    </div>
                    {/*Flight lists */}
                    {currentFlightsInbound === undefined ? (
                      <div>
                        {currentFlights.map((flight, index) => (
                          <div
                            key={index}
                            className="flight-block bg-white light-shadow p-3 rounded-3 mb-3"
                          >
                            <div className="flight-area multi-flight">
                              <div className="flight-left col-md-9">
                                {flight.sg&&flight.sg.map((flightSegment, ser) => (
                                  <div key={ser}>
                                    <h5 className="badge">{(flightCabinClass.find(item => item.key === flightSegment.cC)).value}</h5>
                                    <div className="flightrow">
                                      <div className="airline-name">
                                        <img
                                          src={images[flightSegment.al.alC]}
                                          alt=""
                                        />
                                        <div>
                                          <h5 className="lightest-black mb-8">
                                            {flightSegment.al.alN}
                                          </h5>
                                          <h6 className="dark-gray">
                                            {flightSegment.al.alC}{" "}
                                            {flightSegment.al.fN}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="flight-detail">
                                        <div className="flight-departure">
                                          <h5 className="color-black text-end">
                                            {formatTime(flightSegment.or.dT)}
                                          </h5>
                                          <h5 className="dark-gray text-end">
                                            {flightSegment.or.aC}
                                          </h5>
                                          <h6 className="color-black text-end">
                                            {formatedDate(flightSegment.or.dT)}
                                          </h6>
                                        </div>
                                        <div className="d-inline-flex align-items-center gap-8">
                                          <span className="">From</span>
                                          <div className="from-to text-center">
                                            <h5 className="dark-gray">
                                              {convertMinutesToDuration(
                                                flightSegment.dr
                                              )}
                                            </h5>
                                            <img src={Routeplan} alt="" />
                                          </div>
                                          <span className="">To</span>
                                        </div>
                                        <div className="flight-departure">
                                          <h5 className="color-black">
                                            {formatTime(flightSegment.ds.aT)}
                                          </h5>
                                          <h5 className="dark-gray">
                                            {flightSegment.ds.aC}
                                          </h5>
                                          <h6 className="color-black">
                                            {formatedDate(flightSegment.ds.aT)}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flight-button col-md-3">
                                <div className="amount">
                                  <h5 className="color-black">
                                    {flight.cr} {flight.fF}
                                  </h5>
                                  <h6 className="dark-gray text-end">Price</h6>
                                </div>
                                <button className="btn btn-primary" onClick={() => handleBookNow(flight)}>
                                  Book Now
                                </button>
                              </div>
                            </div>

                            <hr className="bg-light-gray mt-24 mb-24" />
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="color-black">
                                {isRefundable(flight.iR)}
                              </h5>
                              <h6 className="color-black">
                                {flight.sg?flight.sg.length - 1:0} Stop
                              </h6>
                              <div>
                              <button
                                className="accordion-button color-primary h5"
                                type="button"
                                data-bs-toggle="collapse"
                                aria-expanded={openDetails[index] || false}
                                aria-controls={`flightDetail-${index}`}
                                onClick={() => toggleDetail(index)}
                              >

                                Flight Detail&nbsp;
                                <i
                                  className={`${
                                    openDetails[index] ? "fal fa-chevron-up" : "fas fa-chevron-down"
                                  } color-primary`}
                                />
                              </button>
                              </div>
                            </div>

                            <div
                                id={`flightDetail-${index}`}
                                className={`collapse ${openDetails[index] ? "show" : ""} mt-3`}
                              >
                              <ul
                                className="nav nav-pills mb-3"
                                id={`tabs-${index}`}
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id={`info-tab-${index}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#info-${index}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`info-${index}`}
                                    aria-selected="true"
                                  >
                                    Flight Information
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id={`rules-tab-${index}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#rules-${index}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`rules-${index}`}
                                    aria-selected="false"
                                    onClick={() => getFareDetails(flight)}
                                  >
                                    Fare Details & Rules
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id={`baggage-tab-${index}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#baggage-${index}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`baggage-${index}`}
                                    aria-selected="false"
                                  >
                                    Baggage Information
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id={`cancelation-tab-${index}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#cancelation-${index}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`cancelation-${index}`}
                                    aria-selected="false"
                                  >
                                    Cancellation & Change Rule
                                  </button>
                                </li>
                              </ul>

                              <div
                                className="tab-content"
                                id={`tabContent-${index}`}
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id={`info-${index}`}
                                  role="tabpanel"
                                  aria-labelledby={`info-tab-${index}`}
                                >
                                  <div className="flight-area multi-flight">
                                    <div className="flight-left col-md-12">
                                      {flight.sg?flight.sg.map((flightSegment, ser) => (
                                        <div key={ser}>
                                          <h5 className="badge">Departure</h5>
                                          <div className="flightrow">
                                            <div className="airline-name">
                                              <img
                                                src={
                                                  images[flightSegment.al.alC]
                                                }
                                                alt=""
                                              />
                                              <div>
                                                <h5 className="lightest-black mb-8">
                                                  {flightSegment.al.alN}
                                                </h5>
                                                <h6 className="dark-gray">
                                                  {flightSegment.al.alC}{" "}
                                                  {flightSegment.al.fN}
                                                </h6>
                                              </div>
                                            </div>
                                            <div className="flight-detail">
                                              <div className="flight-departure">
                                                <h5 className="color-black text-end">
                                                  {formatTime(
                                                    flightSegment.or.dT
                                                  )}
                                                </h5>
                                                <h5 className="dark-gray text-end">
                                                  {flightSegment.or.aC}
                                                </h5>
                                                <h6 className="color-black text-end">
                                                  {formatedDate(
                                                    flightSegment.or.dT
                                                  )}
                                                </h6>
                                              </div>
                                              <div className="d-inline-flex align-items-center gap-8">
                                                <span className="">From</span>
                                                <div className="from-to text-center">
                                                  <h5 className="dark-gray">
                                                    {convertMinutesToDuration(
                                                      flightSegment.dr
                                                    )}
                                                  </h5>
                                                  <img src={Routeplan} alt="" />
                                                </div>
                                                <span className="">To</span>
                                              </div>
                                              <div className="flight-departure">
                                                <h5 className="color-black">
                                                  {formatTime(
                                                    flightSegment.ds.aT
                                                  )}
                                                </h5>
                                                <h5 className="dark-gray">
                                                  {flightSegment.ds.aC}
                                                </h5>
                                                <h6 className="color-black">
                                                  {formatedDate(
                                                    flightSegment.ds.aT
                                                  )}
                                                </h6>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )):""}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id={`rules-${index}`}
                                  role="tabpanel"
                                  aria-labelledby={`rules-tab-${index}`}
                                >
                                  <div className="row no-margn mar-to-12">
                                    <div className="col-md-4 col-sm-12 border-b2">
                                    <div className="border-b2">
                                      <div className="col-md-12 col-sm-12 hz3 border-bot4">
                                        <div className="col-md-8 col-sm-8 col-sm-8 fon12 fw p-0">
                                          2 x Adult
                                        </div>
                                        <div className="col-md-4 col-sm-4 txt-al-rt p-0">
                                          <span className="fa CurrncyCD_Rs" />
                                          <span className="fon12">11000</span>
                                        </div>
                                      </div>
                                      <div className="col-md-12 col-sm-12 hz3 border-bot4">
                                        <div className="col-md-8 col-sm-8 no-padd fon12">
                                          <strong>Total (Base Fare)</strong>
                                        </div>
                                        <div className="col-md-4 col-sm-4 no-padd txt-al-rt">
                                          <span className="fa CurrncyCD_Rs" />
                                          <span className="fon12">
                                            11000
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-12 col-sm-12 hz3 border-bot4"
                                      >
                                        <div className="col-md-8 col-sm-8 no-padd fon12">
                                          <strong>Total Tax</strong>
                                        </div>
                                        <div className="col-md-4 col-sm-4 no-padd txt-al-rt">
                                          <span className="fa CurrncyCD_Rs" />
                                          <span
                                            className="fon12"
                                          >
                                            1536
                                          </span>
                                        </div>
                                      </div>
                                      <div className="ini">
                                        <div
                                          id="divTax2"
                                          style={{
                                            display: "none",
                                            overflow: "initial!important",
                                          }}
                                        ></div>
                                      </div>
                                      <div className="col-md-12 col-sm-12 hz3 border-bot4">
                                        <div className="col-md-8 col-sm-8  no-padd fon12">
                                          <strong>
                                            Total (Fee &amp; Surcharge)
                                          </strong>
                                        </div>
                                        <div className="col-md-4 col-sm-4  no-padd txt-al-rt">
                                          <span className="fa CurrncyCD_Rs" />
                                          <span
                                            className="fon12"
                                          >
                                            12536
                                          </span>
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                    <div className="col-md-8  col-sm-12 pad-0 pad-btmm">
                                      <div className="bood mg-btm">
                                        <div className="row">
                                          <div className="col-md-6 col-sm-6 pad-top-bot txt-d4 txt-c mb-2">
                                            Fare Rules
                                          </div>
                                          <div className="col-md-6 col-sm-6 col-xs-12 hei txt-c mg-btm m-10 mb-2">
                                            {flight.iR?<div className="refund">Refundable</div>:""}
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div
                                            className="col-md-12"
                                            id="newFareRule"
                                          >
                                            {/*Cancel new panel*/}
                                            <div className="fareRuls">
                                              {/*<table
                                                width="100%"
                                                rules="all"
                                                border={1}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Time Frame to cancel
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        Before scheduled
                                                        departure time
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Airline Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        EMT Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Cancel Before 72 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        3209
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        300
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Cancel within 72 hours
                                                      &amp; before 4 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        4279
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        300
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>*/}
                                            </div>

                                            <div className="fareRuls">
                                              {/*<table
                                                width="100%"
                                                rules="all"
                                                border={1}
                                                style={{
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Time Frame to reschedule
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        Before scheduled
                                                        departure time
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Airline Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        EMT Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Reschedule before 72 hours
                                                      of departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      2999
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      300
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Reschedule within 72 hours
                                                      &amp; before 4 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      2999
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      300
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>*/}
                                            </div>
                                            {/*reschedule new panel end*/}
                                          </div>
                                        </div>
                                        <div className="row">
                                          {/*<div className="col-md-12 col-sm-12 col-xs-12 terms-h">*/}
                                          {/*  Terms &amp; Conditions*/}
                                          {/*</div>*/}
                                          <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="terms mar10">
                                              <ul style={{ display: "none" }}>
                                                <li>
                                                  The charges will be on per
                                                  passenger per sector
                                                </li>
                                                <li>
                                                  Rescheduling Charges =
                                                  Rescheduling/Change Penalty +
                                                  Fare Difference (if
                                                  applicable)
                                                </li>
                                                <li>
                                                  Partial cancellation is not
                                                  allowed on the flight tickets
                                                  which are book under special
                                                  discounted fares
                                                </li>
                                                <li>
                                                  In case, the customer have not
                                                  cancelled the ticket within
                                                  the stipulated time or no show
                                                  then only statutory taxes are
                                                  refundable from the respective
                                                  airlines
                                                </li>
                                                <li>
                                                  For infants there is no
                                                  baggage allowance
                                                </li>
                                                <li>
                                                  In certain situations of
                                                  restricted cases, no
                                                  amendments and cancellation is
                                                  allowed
                                                </li>
                                                <li>
                                                  Penalty from airlines needs to
                                                  be reconfirmed before any
                                                  cancellation or amendments
                                                </li>
                                                <li>
                                                  Penalty changes in airline are
                                                  indicative and can be changed
                                                  without any prior notice
                                                </li>
                                              </ul>
                                              <ul>
                                                {/* Check if the fareRule for the flight exists */}
                                                {fareRule[flight.rI] && fareRule[flight.rI].map((flightFareRule, ind) => (
                                                  <div key={ind}>
                                                    <span><b>{flightFareRule.airline} - {flightFareRule.destination}</b></span>

                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: flightFareRule.fareRuleDetail }}
                                                    />
                                                  </div>
                                                ))}

                                                {/*<li>
                                                  Total Rescheduling Charges
                                                  Airlines Rescheduling fees
                                                  Fare Difference if applicable
                                                  + EMT Fees.
                                                </li>
                                                <li>
                                                  The airline cancel reschedule
                                                  fees is indicative and can be
                                                  changed without any prior
                                                  notice by the airlines..
                                                </li>
                                                <li>
                                                  EaseMyTrip does not guarantee
                                                  the accuracy of cancel
                                                  reschedule fees.
                                                </li>
                                                <li>
                                                  Partial cancellation is not
                                                  allowed on the flight tickets
                                                  which are book under special
                                                  round trip discounted fares.
                                                </li>
                                                <li>
                                                  Airlines doesnt allow any
                                                  additional baggage allowance
                                                  for any infant added in the
                                                  booking
                                                </li>
                                                <li>
                                                  In certain situations of
                                                  restricted cases, no
                                                  amendments and cancellation is
                                                  allowed
                                                </li>
                                                <li>
                                                  Airlines cancel reschedule
                                                  should be reconfirmed before
                                                  requesting for a cancellation
                                                  or amendment
                                                </li>*/}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id={`baggage-${index}`}
                                  role="tabpanel"
                                  aria-labelledby={`baggage-tab-${index}`}
                                >
                                  <div className="baggagerule mgt15">
  <table width="100%" rules="all" border={1}>
    <tbody>
      <tr>
        <th>
          <p className="frtbl_hd">Airline</p>
        </th>
        <th>
          <p className="frtbl_hd">Check-in Baggage</p>
        </th>
        <th>
          <p className="frtbl_hd">Cabin Baggage</p>
        </th>
      </tr>
      {flight.sg?flight.sg.map((flightSeg,index) =>
      <tr key={index}>
        <td>
          <div className="flgi-l">
          <img
            src={images[flightSeg.al.alC]}
            alt=""
          />
          </div>

          <div>

            <p >
              {flightSeg.al.alN}
            </p>
            <p>{flightSeg.al.alC} - {flightSeg.al.fN}</p>
          </div>
        </td>
        <td>{flightSeg.bg}</td>
        <td>
          {flightSeg.cBg}
        </td>

      </tr>
      ):""}
      <tr>
        <td colSpan={3}>
          <div className="termsbagg">
            <ul>
              <li>
                Baggage information mentioned above is obtained from airline's
                reservation system, Hindustan Holidays does not guarantee the accuracy
                of this information.
              </li>
              <li>
                The baggage allowance may vary according to stop-overs,
                connecting flights. changes in airline rules. etc.
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

                                </div>
                                <div
                                  className="tab-pane fade"
                                  id={`cancelation-${index}`}
                                  role="tabpanel"
                                  aria-labelledby={`cancelation-tab-${index}`}
                                >
                                <div className="col-md-12  col-sm-12 pad-0 pad-btmm">
                                      <div className="bood mg-btm">
                                        <div className="row">
                                          <div className="col-md-6 col-sm-6 pad-top-bot txt-d4 txt-c mb-2">
                                            Fare Rules
                                          </div>
                                          <div className="col-md-6 col-sm-6 col-xs-12 hei txt-c mg-btm m-10 mb-2">
                                            <div
                                              className="refund"
                                            >
                                              Refundable
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div
                                            className="col-md-12"
                                            id="newFareRule"
                                          >
                                            {/*Cancel new panel*/}
                                            <div className="fareRuls">
                                              <table
                                                width="100%"
                                                rules="all"
                                                border={1}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Time Frame to cancel
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        Before scheduled
                                                        departure time
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Airline Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        EMT Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Cancel Before 72 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        3209
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        300
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Cancel within 72 hours
                                                      &amp; before 4 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        4279
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      <span>
                                                        300
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>

                                            <div className="fareRuls">
                                              <table
                                                width="100%"
                                                rules="all"
                                                border={1}
                                                style={{
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                <tbody>
                                                  <tr>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Time Frame to reschedule
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        Before scheduled
                                                        departure time
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        Airline Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                    <th>
                                                      <p className="frtbl_hd">
                                                        EMT Fees
                                                      </p>
                                                      <p className="frtbl_sml">
                                                        per passenger
                                                      </p>
                                                    </th>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Reschedule before 72 hours
                                                      of departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      2999
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      300
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Reschedule within 72 hours
                                                      &amp; before 4 hours of
                                                      departure time.
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      2999
                                                    </td>
                                                    <td>
                                                      <span className="CurrncyCD_Rs" />
                                                      300
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                            {/*reschedule new panel end*/}
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-12 col-sm-12 col-xs-12 terms-h">
                                            Terms &amp; Conditions
                                          </div>
                                          <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="terms mar10">
                                              <ul style={{ display: "none" }}>
                                                <li>
                                                  The charges will be on per
                                                  passenger per sector
                                                </li>
                                                <li>
                                                  Rescheduling Charges =
                                                  Rescheduling/Change Penalty +
                                                  Fare Difference (if
                                                  applicable)
                                                </li>
                                                <li>
                                                  Partial cancellation is not
                                                  allowed on the flight tickets
                                                  which are book under special
                                                  discounted fares
                                                </li>
                                                <li>
                                                  In case, the customer have not
                                                  cancelled the ticket within
                                                  the stipulated time or no show
                                                  then only statutory taxes are
                                                  refundable from the respective
                                                  airlines
                                                </li>
                                                <li>
                                                  For infants there is no
                                                  baggage allowance
                                                </li>
                                                <li>
                                                  In certain situations of
                                                  restricted cases, no
                                                  amendments and cancellation is
                                                  allowed
                                                </li>
                                                <li>
                                                  Penalty from airlines needs to
                                                  be reconfirmed before any
                                                  cancellation or amendments
                                                </li>
                                                <li>
                                                  Penalty changes in airline are
                                                  indicative and can be changed
                                                  without any prior notice
                                                </li>
                                              </ul>
                                              <ul>
                                                <li>
                                                  Total Rescheduling Charges
                                                  Airlines Rescheduling fees
                                                  Fare Difference if applicable
                                                  + EMT Fees.
                                                </li>
                                                <li>
                                                  The airline cancel reschedule
                                                  fees is indicative and can be
                                                  changed without any prior
                                                  notice by the airlines..
                                                </li>
                                                <li>
                                                  EaseMyTrip does not guarantee
                                                  the accuracy of cancel
                                                  reschedule fees.
                                                </li>
                                                <li>
                                                  Partial cancellation is not
                                                  allowed on the flight tickets
                                                  which are book under special
                                                  round trip discounted fares.
                                                </li>
                                                <li>
                                                  Airlines doesnt allow any
                                                  additional baggage allowance
                                                  for any infant added in the
                                                  booking
                                                </li>
                                                <li>
                                                  In certain situations of
                                                  restricted cases, no
                                                  amendments and cancellation is
                                                  allowed
                                                </li>
                                                <li>
                                                  Airlines cancel reschedule
                                                  should be reconfirmed before
                                                  requesting for a cancellation
                                                  or amendment
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Pagination Controls */}
                        {/*<div className="pagination d-flex justify-content-center mt-3">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              className={`btn ${
                                currentPage === page
                                  ? "btn-primary"
                                  : "btn-outline-primary"
                              } mx-1`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          ))}
                        </div>*/}
                      </div>
                    ) : (
                      <div>
                        <div className="row rountrip-list">
                          <div className="col-md-6">
                            <div className="row n-w-ron-bg m-0 mb-1">
                              <div className="col-md-4 col-sm-2 col-xs-12 p-0">
                                <div className="travel-det">
                                  <span>{fromAirport.city}</span> →{" "}
                                  <span>{toAirport.city}</span>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-5 col-xs-12 m-0 p-0">
                                <div className="day-date">
                                  {formatDate(selectedFromDate)}
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-5 col-xs-12 nxt-pre-col p-0 m-0">
                                <button type="button" className="txt-m1 rgtbdr">
                                  Previous Day
                                </button>
                                <button
                                  type="button"
                                  className="txt-m1 pdl8"
                                  id="depNext"
                                >
                                  Next Day
                                </button>
                              </div>
                            </div>
                            <div className="row m-0 p-0 grey-bck mb-2">
                              <div className="col-md-2 col-sm-2 col-xs-4 mag p-0">
                                <a className=" arrhhr arr1" href="#">
                                  Airlines <i className="fa arr2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 col-xs-4 mag">
                                <a className="air1 arrhhr" href="#">
                                  DEPART <i className="fa air2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-2 hidden-sm hidden-xs">
                                <a className="dur1 arrhhr" href="#">
                                  DURATION <i className="fa dur2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 col-xs-4 mag">
                                <a className="dep1 arrhhr" href="#">
                                  ARRIVE <i className="fa dep2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 hidden-xs">
                                <a className="pri1 arrhhr" href="#">
                                  Price
                                </a>
                              </div>
                            </div>
                            {currentFlights.map((flight, index) => (
                              <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3 position-relative">
                                {flight.sg.map((flightSegment, ser) => (
                                  <>
                                    <div className="flight-area">
                                      <div className="airline-name">
                                        <img
                                          src={images[flightSegment.al.alC]}
                                          alt=""
                                        />
                                        <div className="mt-1">
                                          <h5 className="lightest-black mb-1">
                                            {flightSegment.al.alN}
                                          </h5>
                                          <h6 className="dark-gray mt-0 mb-md-0">
                                            {flightSegment.al.alC +
                                              flightSegment.al.fN}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="flight-detail">
                                        <div className="flight-departure">
                                          <h5 className="color-black text-end">
                                            {formatTime(flightSegment.or.dT)}
                                          </h5>
                                          <h5 className="dark-gray text-end">
                                            {flightSegment.or.aC}
                                          </h5>
                                        </div>
                                        <div className="d-inline-flex align-items-center gap-8">
                                          <span className="">From</span>
                                          <div className="from-to text-center">
                                            <h5 className="dark-gray">
                                              {convertMinutesToDuration(
                                                flightSegment.dr
                                              )}
                                            </h5>
                                            <img src={Routeplan} alt="" />
                                            <h6 className="color-black">
                                              1 Stop
                                            </h6>
                                          </div>
                                          <span className="">To</span>
                                        </div>
                                        <div className="flight-departure">
                                          <h5 className="color-black">
                                            {formatTime(flightSegment.ds.aT)}
                                          </h5>
                                          <h5 className="dark-gray">
                                            {flightSegment.ds.aC}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="bg-light-gray mt-24 mb-24" />
                                  </>
                                ))}

                                <div className="flight-button ps-2">
                                  <div className="amount">
                                    <h6 className="dark-gray text-end">
                                      Price
                                    </h6>
                                    <h5 className="color-black">
                                      {flight.cr} {flight.fF}
                                    </h5>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input mt-0"
                                      type="radio"
                                      name="onwardflight"
                                      checked
                                    />
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <h5 className="color-black">
                                    {formatedDate(flight.sg[0].or.dT)}
                                  </h5>
                                  <div>
                                    <a
                                      href="#"
                                      className="accordion-button color-primary h5 collapsed"
                                    >
                                      <i className="fal fa-chevron-down color-primary " />
                                      &nbsp;Flight Detail
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-6">
                            <div className="row n-w-ron-bg m-0 mb-1">
                              <div className="col-md-4 col-sm-2 col-xs-12 p-0">
                                <div className="travel-det">
                                  <span>{toAirport.city}</span> →{" "}
                                  <span>{fromAirport.city}</span>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-5 col-xs-12 m-0 p-0">
                                <div className="day-date">
                                  {formatDate(selectedReturnDate)}
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-5 col-xs-12 nxt-pre-col p-0 m-0">
                                <button type="button" className="txt-m1 rgtbdr">
                                  Previous Day
                                </button>
                                <button
                                  type="button"
                                  className="txt-m1 pdl8"
                                  id="depNext"
                                >
                                  Next Day
                                </button>
                              </div>
                            </div>
                            <div className="row m-0 p-0 grey-bck mb-2">
                              <div className="col-md-2 col-sm-2 col-xs-4 mag p-0">
                                <a className=" arrhhr arr1" href="#">
                                  Airlines <i className="fa arr2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 col-xs-4 mag">
                                <a className="air1 arrhhr" href="#">
                                  DEPART <i className="fa air2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-4 col-sm-2 hidden-sm hidden-xs">
                                <a className="dur1 arrhhr" href="#">
                                  DURATION <i className="fa dur2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 col-xs-4 mag">
                                <a className="dep1 arrhhr" href="#">
                                  ARRIVE <i className="fa dep2 pad-4" />
                                </a>
                              </div>
                              <div className="col-md-2 col-sm-3 hidden-xs">
                                <a className="pri1 arrhhr" href="#">
                                  Price
                                </a>
                              </div>
                            </div>
                            {currentFlightsInbound.map((flight, index) => (
                              <div className="flight-block bg-white light-shadow p-3 rounded-3 mb-3 position-relative">
                                {flight.sg.map((flightSegment, ser) => (
                                  <>
                                    <div className="flight-area">
                                      <div className="airline-name">
                                        <img
                                          src={images[flightSegment.al.alC]}
                                          alt=""
                                        />
                                        <div className="mt-1">
                                          <h5 className="lightest-black mb-1">
                                            {flightSegment.al.alN}
                                          </h5>
                                          <h6 className="dark-gray mt-0 mb-md-0">
                                            {flightSegment.al.alC +
                                              flightSegment.al.fN}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="flight-detail">
                                        <div className="flight-departure">
                                          <h5 className="color-black text-end">
                                            {formatTime(flightSegment.or.dT)}
                                          </h5>
                                          <h5 className="dark-gray text-end">
                                            {flightSegment.or.aC}
                                          </h5>
                                        </div>
                                        <div className="d-inline-flex align-items-center gap-8">
                                          <span className="">From</span>
                                          <div className="from-to text-center">
                                            <h5 className="dark-gray">
                                              {convertMinutesToDuration(
                                                flightSegment.dr
                                              )}
                                            </h5>
                                            <img src={Routeplan} alt="" />
                                            <h6 className="color-black">
                                              1 Stop
                                            </h6>
                                          </div>
                                          <span className="">To</span>
                                        </div>
                                        <div className="flight-departure">
                                          <h5 className="color-black">
                                            {formatTime(flightSegment.ds.aT)}
                                          </h5>
                                          <h5 className="dark-gray">
                                            {flightSegment.ds.aC}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="bg-light-gray mt-24 mb-24" />
                                  </>
                                ))}
                                <div className="flight-button ps-2">
                                  <div className="amount">

                                    <h6 className="dark-gray text-end">
                                      Price
                                    </h6>
                                    <h5 className="color-black">
                                      {flight.cr} {flight.fF}
                                    </h5>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input mt-0"
                                      type="radio"
                                      name="returnflight"
                                      checked
                                    />
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <h5 className="color-black">
                                    {formatedDate(flight.sg[0].or.dT)}
                                  </h5>
                                  <div>
                                    <a
                                      href="#"
                                      className="accordion-button color-primary h5 collapsed"
                                    >
                                      <i className="fal fa-chevron-down color-primary " />
                                      &nbsp;Flight Detail
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* Flight Listing End */}
          </main>
        </>
      )}
    </>
  )
};

export default Flightlist;
