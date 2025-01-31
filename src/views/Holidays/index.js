import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination, } from "swiper/modules";
import "./holidays.css";
import Package1 from '../../assets/img/packages-1.jpg'
import Package2 from '../../assets/img/packages-2.jpg'
import Package3 from '../../assets/img/packages-3.jpg'
import Package4 from '../../assets/img/packages-4.jpg'
import Image1 from '../../assets/img/img-1.jpg'
import Image2 from '../../assets/img/img-2.jpg'
import Image3 from '../../assets/img/img-3.jpg'
import Image4 from '../../assets/img/img-4.jpg'
import Image5 from '../../assets/img/img-5.jpg'
import Image6 from '../../assets/img/img-6.jpg'
import Image7 from '../../assets/img/img-7.jpg'
import destination1 from '../../assets/img/destination-1.jpg'
import destination2 from '../../assets/img/destination-2.jpg'
import destination3 from '../../assets/img/destination-3.jpg'
import destination4 from '../../assets/img/destination-4.jpg'
import destination5 from '../../assets/img/destination-5.jpg'
import destination6 from '../../assets/img/destination-6.jpg'
import destination7 from '../../assets/img/destination-7.jpg'
import destination8 from '../../assets/img/destination-8.jpg'
import destination9 from '../../assets/img/destination-9.jpg'
import testimonial1 from '../../assets/img/testimonial-1.jpg'
import testimonial2 from '../../assets/img/testimonial-2.jpg'
import testimonial3 from '../../assets/img/testimonial-3.jpg'
import testimonial4 from '../../assets/img/testimonial-4.jpg'





import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    GET_DEFAULT_AIRPORT,
    GET_FLIGHT,
    GET_SEARCH_AIRPORT,
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
const Holidays = () => {
    const location = useLocation();
    const constants = location.state || {};
    console.log(constants);
    const [searchResponse, setSearchResponse] = useState(
        localStorage.getItem("flightSearchResponse") != null
            ? JSON.parse(localStorage.getItem("flightSearchResponse")).response
            : {
                results: { outboundFlights: [] },
                facets: { airlines: { outbound: [] } },
            }
    );
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
    const totalFlights = searchResponse.results.outboundFlights.length;
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [value, setValue] = React.useState([100, 100000]); // Price range
    const [departureTime, setDepartureTime] = React.useState(""); // Selected departure time range
    const [arrivalTime, setArrivalTime] = React.useState("");
    const [selectedStops, setSelectedStops] = React.useState([]);
    const [searchSubstring, setSearchSubstring] = useState("");
    const [fromAirports, setFromAirports] = useState([]);
    const [toAirports, setToAirports] = useState([]);
    const [defaultAirports, setDefaultAirports] = useState([]);
    const [fromAirport, setFromAirport] = useState(constants.from);
    const [toAirport, setToAirport] = useState(constants.to);
    const [multiAirport, setMultiAirport] = useState([]);

    // Get flights for the current page

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
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
        localStorage.setItem("flightSearchResponse", JSON.stringify(data));
        setSearchResponse(data.response);
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
                // setFromAirport(data.response[0]);
                // setToAirport(data.response[1]);
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

    const currentFlightsInbound = searchResponse.results.inboundFlights;
    const currentFlights = searchResponse.results.outboundFlights.filter(
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
            const stops = flight.sg.length - 1;

            return (
                (selectedStops.length === 0 || selectedStops.includes(stops)) &&
                isAirlineMatched &&
                isPriceInRange &&
                isDepartureTimeMatched &&
                isArrivalTimeMatched
            );
        }
    );
    const paginatedFlights = currentFlights.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(currentFlights.length / itemsPerPage);

    const handleStopsChange = (stopCount) => {
        setSelectedStops(
            (prev) =>
                prev.includes(stopCount)
                    ? prev.filter((stop) => stop !== stopCount) // Remove stopCount if already selected
                    : [...prev, stopCount] // Add stopCount if not selected
        );
    };



    useEffect(() => {
        // Initialize Owl Carousel
        const $ = window.jQuery;
        if ($) {
            const carousel = $(".testimonial-carousel");

            // Destroy existing carousel instance if any
            if (carousel.data('owl.carousel')) {
                carousel.trigger('destroy.owl.carousel');
            }

            // Initialize new carousel
            carousel.owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                margin: 25,
                loop: true,
                center: true,
                dots: true,
                nav: true,
                navText: [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }

        // Cleanup function
        return () => {
            if ($) {
                const carousel = $(".testimonial-carousel");
                if (carousel.data('owl.carousel')) {
                    carousel.trigger('destroy.owl.carousel');
                }
            }
        };
    }, []);



    return (
        <>

            <div className="it-slider-area">
                <div className="it-slider-wrapper p-relative">
                    {/* <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        className="swiper-container it-slider-active"
                    >
                        <SwiperSlide>
                            <div
                                className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
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
                            <div
                                className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
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
                            <div
                                className="it-slider-item it-slider-overlay it-slider-height p-relative d-flex align-items-center">
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
                    </Swiper> */}
                    <div class="container-fluid subscribe py-5">
                        <div class="container text-center py-5">
                            <div class="mx-auto text-center">
                                <h1 class="text-black mb-4">Our Tour Packages</h1>
                                <p class="text-black mb-5">Where Every Experience Counts.</p>
                                <div class="position-relative mx-auto">
                                    <input class="form-control border-primary rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your dream destination" />
                                    <button type="button" class="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 px-4 mt-2 me-2">Search</button>
                                </div>

                            </div>
                        </div>
                        <div className="text-center mt-4"> {/* Outer container for centering */}
                            <div className="d-inline-flex bg-white rounded-pill "> {/* Inner container with white background */}
                                <ul className="nav nav-pills justify-content-center flex-wrap m-0">
                                    <li className="nav-item">
                                        <a className="nav-link rounded-pill" href="#">
                                            <img src={destination1} alt="Active" className="me-2 rounded-circle" style={{ width: '30px', height: '30px' }} />
                                            Active
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link rounded-pill" href="#">
                                            <img src={destination1} alt="Active" className="me-2 rounded-circle" style={{ width: '30px', height: '30px' }} />
                                            Honeymoon
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link rounded-pill" href="#">
                                            <img src={destination1} alt="Active" className="me-2 rounded-circle" style={{ width: '30px', height: '30px' }} />
                                            Pilgrimage
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link rounded-pill">
                                            <img src={destination1} alt="Active" className="me-2 rounded-circle" style={{ width: '30px', height: '30px' }} />
                                            Ayurveda
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>



                    {/* top destination section */}
                    <section className="py-5 overflow-hidden">
                        <div className="container-lg">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-header d-flex flex-wrap justify-content-between mb-5">
                                        <h2 className="section-title">Top Destinations For You</h2>
                                        <div className="d-flex align-items-center">
                                            <a href="#" className="btn btn-primary me-2">View All</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        slidesPerView={1}
                                        spaceBetween={20}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            prevEl: '.category-carousel-prev',
                                            nextEl: '.category-carousel-next',
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                spaceBetween: 30,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 30,
                                            },
                                        }}
                                        style={{ padding: '20px 0' }}
                                    >
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination1}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">New York</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination2}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Rome</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination3}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Rome</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination4}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">        France</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination5}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Switzerland </h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination6}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Switzerland</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination7}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Spain</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination8}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">France</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination9}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Italy</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination1}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Germany</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination2}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Indonesia</h4>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text-center">
                                                <img
                                                    src={destination3}
                                                    className="rounded-circle mx-auto"
                                                    alt="Category"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                <h4 className="fs-6 mt-3 fw-normal">Bali</h4>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="text-center mt-4">
                                        <button className="category-carousel-prev btn btn-primary mx-2">❮</button>
                                        <button className="category-carousel-next btn btn-primary mx-2">❯</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>






                    {/* Packages Section */}
                    <div className="container-fluid packages py-5">
                        <div className="container py-5">
                            <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                                <h5 className="section-title px-3">Packages</h5>
                                <h1 className="mb-0">Awesome Packages</h1>
                            </div>
                            <div className="packages-carousel">
                                <div className="packages-item">
                                    <div className="packages-img">
                                        <img src={Package4} className="img-fluid w-100 rounded-top" alt="Venice" />
                                        <div className="packages-info d-flex border border-start-0 border-end-0 position-absolute" style={{ width: '100%', bottom: 0, left: 0, zIndex: 5 }}>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt me-2"></i>Venice - Italy</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt me-2"></i>3 days</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-user me-2"></i>2 Person</small>
                                        </div>
                                        <div className="packages-price py-2 px-4">$349.00</div>
                                    </div>
                                    <div className="packages-content bg-light">
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-0">Venice - Italy</h5>
                                            <small className="text-uppercase">Hotel Deals</small>
                                            <div className="mb-3">
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                            </div>
                                            <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat</p>
                                        </div>
                                        <div className="row bg-primary rounded-bottom mx-0">
                                            <div className="col-6 text-start px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Read More</a>
                                            </div>
                                            <div className="col-6 text-end px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="packages-item">
                                    <div className="packages-img">
                                        <img src={Package2} className="img-fluid w-100 rounded-top" alt="Image" />
                                        <div className="packages-info d-flex border border-start-0 border-end-0 position-absolute" style={{ width: '100%', bottom: 0, left: 0, zIndex: 5 }}>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt me-2"></i>Venice - Italy</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt me-2"></i>3 days</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-user me-2"></i>2 Person</small>
                                        </div>
                                        <div className="packages-price py-2 px-4">$449.00</div>
                                    </div>
                                    <div className="packages-content bg-light">
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-0">The New California</h5>
                                            <small className="text-uppercase">Hotel Deals</small>
                                            <div className="mb-3">
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                            </div>
                                            <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat</p>
                                        </div>
                                        <div className="row bg-primary rounded-bottom mx-0">
                                            <div className="col-6 text-start px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Read More</a>
                                            </div>
                                            <div className="col-6 text-end px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="packages-item">
                                    <div className="packages-img">
                                        <img src={Package3} className="img-fluid w-100 rounded-top" alt="Image" />
                                        <div className="packages-info d-flex border border-start-0 border-end-0 position-absolute" style={{ width: '100%', bottom: 0, left: 0, zIndex: 5 }}>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt me-2"></i>Venice - Italy</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt me-2"></i>3 days</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-user me-2"></i>2 Person</small>
                                        </div>
                                        <div className="packages-price py-2 px-4">$549.00</div>
                                    </div>
                                    <div className="packages-content bg-light">
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-0">Discover Japan</h5>
                                            <small className="text-uppercase">Hotel Deals</small>
                                            <div className="mb-3">
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                            </div>
                                            <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat</p>
                                        </div>
                                        <div className="row bg-primary rounded-bottom mx-0">
                                            <div className="col-6 text-start px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Read More</a>
                                            </div>
                                            <div className="col-6 text-end px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="packages-item">
                                    <div className="packages-img">
                                        <img src={Package1} className="img-fluid w-100 rounded-top" alt="Image" />
                                        <div className="packages-info d-flex border border-start-0 border-end-0 position-absolute" style={{ width: '100%', bottom: 0, left: 0, zIndex: 5 }}>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt me-2"></i>Thayland</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt me-2"></i>3 days</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-user me-2"></i>2 Person</small>
                                        </div>
                                        <div className="packages-price py-2 px-4">$649.00</div>
                                    </div>
                                    <div className="packages-content bg-light">
                                        <div className="p-4 pb-0">
                                            <h5 className="mb-0">Thayland Trip</h5>
                                            <small className="text-uppercase">Hotel Deals</small>
                                            <div className="mb-3">
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                                <small className="fa fa-star text-primary"></small>
                                            </div>
                                            <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt nemo quia quae illum aperiam fugiat voluptatem repellat</p>
                                        </div>
                                        <div className="row bg-primary rounded-bottom mx-0">
                                            <div className="col-6 text-start px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Read More</a>
                                            </div>
                                            <div className="col-6 text-end px-0">
                                                <a href="#" className="btn-hover btn text-white py-2 px-4">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-3" data-aos="fade-up" data-aos-delay="100">
                        <div className="container">
                            <div className="row align-items-center justify-content-center mb-7">
                                <div className="col-lg-6" data-aos="fade-up">
                                    <h1 className="heading mb-3 text-center mb-5">Discover Hundred of Travel Destinations</h1>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                </div>
                            </div>


                            <div className="destination-slider-wrap">
                                <div className="destination-slider">
                                    {/* First Destination */}
                                    <div className="destination">
                                        <div className="thumb">
                                            <img src={Image1} alt="Image" className="img-fluid" />
                                            <div className="price">$430</div>
                                        </div>
                                        <div className="mt-4">
                                            <h3><a href="#">Paradise Beach, Palawan Island</a></h3>
                                            <span className="meta">Maldives, Republic Maldives</span>
                                        </div>
                                    </div>

                                    {/* Second Destination */}
                                    <div className="destination">
                                        <div className="thumb">
                                            <img src={Image2} alt="Image" className="img-fluid" />
                                            <div className="price">$560</div>
                                        </div>
                                        <div className="mt-4">
                                            <h3><a href="#">Paradise Beach, Palawan Island</a></h3>
                                            <span className="meta">Maldives, Republic Maldives</span>
                                        </div>
                                    </div>

                                    {/* Third Destination */}
                                    <div className="destination">
                                        <div className="thumb">
                                            <img src={Image3} alt="Image" className="img-fluid" />
                                            <div className="price">$490</div>
                                        </div>
                                        <div className="mt-4">
                                            <h3><a href="#">Paradise Beach, Palawan Island</a></h3>
                                            <span className="meta">Maldives, Republic Maldives</span>
                                        </div>
                                    </div>

                                    {/* Fourth Destination */}
                                    <div className="destination">
                                        <div className="thumb">
                                            <img src={Image4} alt="Image" className="img-fluid" />
                                            <div className="price">$490</div>
                                        </div>
                                        <div className="mt-4">
                                            <h3><a href="#">Paradise Beach, Palawan Island</a></h3>
                                            <span className="meta">Maldives, Republic Maldives</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Destination Section */}
                    <div className="tab-class text-center">
                        <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                            <h5 className="section-title px-3">Destination</h5>
                            <h1 className="mb-0">Popular Destination</h1>
                        </div>
                        <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                            <li className="nav-item">
                                <a className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                    <span className="text-dark" style={{ width: '150px' }}>All</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="d-flex py-2 mx-3 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                    <span className="text-dark" style={{ width: '150px' }}>USA</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                    <span className="text-dark" style={{ width: '150px' }}>Canada</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                    <span className="text-dark" style={{ width: '150px' }}>Europe</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                                    <span className="text-dark" style={{ width: '150px' }}>China</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-6">
                                    <span className="text-dark" style={{ width: '150px' }}>Singapore</span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-xl-8">
                                        <div className="row g-4">
                                            <div className="col-lg-6">
                                                <div className="destination-img">
                                                    <img className="img-fluid rounded w-100" src={destination1} alt="" />
                                                    <div className="destination-overlay p-4">
                                                        <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                        <h4 className="text-white mb-2 mt-3">New York City</h4>
                                                        <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                                    </div>
                                                    <div className="search-icon">
                                                        <a href="img/destination-1.jpg" data-lightbox="destination-1"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="destination-img">
                                                    <img className="img-fluid rounded w-100" src={destination2} alt="" />
                                                    <div className="destination-overlay p-4">
                                                        <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                        <h4 className="text-white mb-2 mt-3">Las vegas</h4>
                                                        <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                                    </div>
                                                    <div className="search-icon">
                                                        <a href="img/destination-2.jpg" data-lightbox="destination-2"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="destination-img">
                                                    <img className="img-fluid rounded w-100" src={destination7} alt="" />
                                                    <div className="destination-overlay p-4">
                                                        <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                        <h4 className="text-white mb-2 mt-3">Los angelas</h4>
                                                        <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                                    </div>
                                                    <div className="search-icon">
                                                        <a href="img/destination-7.jpg" data-lightbox="destination-7"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="destination-img">
                                                    <img className="img-fluid rounded w-100" src={destination8} alt="" />
                                                    <div className="destination-overlay p-4">
                                                        <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                        <h4 className="text-white mb-2 mt-3">Los angelas</h4>
                                                        <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                                    </div>
                                                    <div className="search-icon">
                                                        <a href="img/destination-8.jpg" data-lightbox="destination-8"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="destination-img h-100">
                                            <img className="img-fluid rounded w-100 h-100" src={destination9} style={{ objectFit: 'cover', minHeight: '300px' }} alt="" />
                                            <div className="destination-overlay p-4">
                                                <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                <h4 className="text-white mb-2 mt-3">San francisco</h4>
                                                <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                            </div>
                                            <div className="search-icon">
                                                <a href="img/destination-9.jpg" data-lightbox="destination-4"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>

                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="destination-img">
                                            <img className="img-fluid rounded w-100" src={destination5} alt="" />
                                            <div className="destination-overlay p-4">
                                                <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                <h4 className="text-white mb-2 mt-3">San francisco</h4>
                                                <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                            </div>
                                            <div className="search-icon">
                                                <a href="img/destination-5.jpg" data-lightbox="destination-5"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="destination-img">
                                            <img className="img-fluid rounded w-100" src={destination6} alt="" />
                                            <div className="destination-overlay p-4">
                                                <a href="#" className="btn btn-primary text-white rounded-pill border py-2 px-3">20 Photos</a>
                                                <h4 className="text-white mb-2 mt-3">San francisco</h4>
                                                <a href="#" className="btn-hover text-white">View All Place <i className="fa fa-arrow-right ms-2"></i></a>
                                            </div>
                                            <div className="search-icon">
                                                <a href="img/destination-6.jpg" data-lightbox="destination-6"><i className="fa fa-plus-square fa-1x btn btn-light btn-lg-square text-primary"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Testimonial Start --> */}
                            <div className="container-fluid testimonial py-5">
                                <div className="container py-5">
                                    <div className="text-center mx-auto mb-5" style={{ maxWidth: '900px' }}>
                                        <h5 className="section-title px-3">Testimonials</h5>
                                        <h1 className="mb-0">Our Clients Say!</h1>
                                    </div>
                                    <div className="testimonial-carousel owl-carousel">
                                        {/* Testimonial Item 1 */}
                                        <div className="testimonial-item">
                                            <div className="testimonial-content rounded mb-4 p-4">
                                                <p className="fs-5 m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies magna eu congue rutrum. Cras pharetra quam quis tincidunt imperdiet.</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-4" style={{ padding: "0 0 0 25px" }}>
                                                <div className="position-relative">
                                                    <img src={testimonial1} className="img-fluid rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="" />
                                                    <div className="position-absolute" style={{ bottom: '-4px', right: '-4px' }}>
                                                        <i className="fa fa-quote-right fa-2x text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <h4 className="mb-0">John Doe</h4>
                                                    <p className="mb-1">Teacher</p>
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Testimonial Item 2 */}
                                        <div className="testimonial-item">
                                            <div className="testimonial-content rounded mb-4 p-4">
                                                <p className="fs-5 m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies magna eu congue rutrum. Cras pharetra quam quis tincidunt imperdiet.</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-4" style={{ padding: "0 0 0 25px" }}>
                                                <div className="position-relative">
                                                    <img src={testimonial2} className="img-fluid rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="" />
                                                    <div className="position-absolute" style={{ bottom: '-4px', right: '-4px' }}>
                                                        <i className="fa fa-quote-right fa-2x text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <h4 className="mb-0">John Doe</h4>
                                                    <p className="mb-1">Software Engineer</p>
                                                    <div className="d-flex">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Testimonial Item 3 */}
                                        <div className="testimonial-item">
                                            <div className="testimonial-content rounded mb-4 p-4">
                                                <p className="fs-5 m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies magna eu congue rutrum. Cras pharetra quam quis tincidunt imperdiet.</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-4" style={{ padding: "0 0 0 25px" }}>
                                                <div className="position-relative">
                                                    <img src={testimonial3} className="img-fluid rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="" />
                                                    <div className="position-absolute" style={{ bottom: '-4px', right: '-4px' }}>
                                                        <i className="fa fa-quote-right fa-2x text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <h4 className="mb-0">John Doe</h4>
                                                    <p className="mb-1">Software Engineer</p>
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                        <i className="fas fa-star text-primary"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Testimonial Item 4 */}
                                        <div className="testimonial-item">
                                            <div className="testimonial-content rounded mb-4 p-4">
                                                <p className="fs-5 m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies magna eu congue rutrum. Cras pharetra quam quis tincidunt imperdiet.</p>
                                            </div>
                                            <div className="d-flex align-items-center mb-4" style={{ padding: "0 0 0 25px" }}>
                                                <div className="position-relative">
                                                    <img src={testimonial4} className="img-fluid rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="" />
                                                    <div className="position-absolute" style={{ bottom: '-4px', right: '-4px' }}>
                                                        <i className="fa fa-quote-right fa-2x text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <h4 className="mb-0">John Doe</h4>
                                                    <p className="mb-1">Software Engineer</p>
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa fa-star text-primary"></i>
                                                        <i className="fa fa-star text-primary"></i>
                                                        <i className="fa fa-star text-primary"></i>
                                                        <i className="fa fa-star text-primary"></i>
                                                        <i className="fa fa-star text-primary"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Testimonial End --> */}


                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Holidays;
