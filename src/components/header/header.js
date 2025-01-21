import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/img/logo/logo.png";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import KitesurfingOutlinedIcon from "@mui/icons-material/KitesurfingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import RunCircleOutlinedIcon from "@mui/icons-material/RunCircleOutlined";
import TempleHinduOutlinedIcon from "@mui/icons-material/TempleHinduOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import TrainOutlinedIcon from "@mui/icons-material/TrainOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import Loginimage from '../../assets/img/sign-up.webp'
import "./header.css";
// import HomePage from "../../views/Home";
const Header = () => {
  const location = useLocation();
  const url = location.pathname;
  const path = url.split('/');
  const [activeItem, setActiveItem] = useState(path[1] || '');

  useEffect(() => {
    setActiveItem(path[1] || '');
  }, [url]);

  // Helper function to determine active status
  const isActive = (itemPath) => activeItem === itemPath;
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [countryCode, setCountryCode] = useState("+91"); // Default to India

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };



  const handleMoreClick = () => {
    setIsMoreClicked((prev) => !prev);
  };
  const handleLoginClick = () => {
    setIsLoginClicked((prev) => !prev);
  };
  const handleModalOpenClick = () => {
    setisModalOpen((prev) => !prev);
    console.log("isModalOpen==", isModalOpen)
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (mobile) {
      setShowOTP(true); // Show OTP fields
    } else {
      alert("Please enter your mobile number.");
    }
  };

  const handleOTPChange = (e, index) => {
    const { value } = e.target;

    // Only allow numeric values and a single digit
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value; // Update the current OTP digit
      setOtp(newOtp);

      // Move to the next input field automatically
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow clearing the input
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to the previous input field if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current field
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");

    // Fill OTP fields with pasted data
    const newOtp = otp.map((_, i) => pastedData[i] || "");
    setOtp(newOtp);

    // Focus on the last filled input
    const lastFilledIndex = Math.min(pastedData.length, 6) - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleBackButtonClick = () =>{
    setShowPassword(false);
    setShowOTP(false)
  }
  const handleLoginWithPassword = () =>{
    setShowPassword(true);
    setShowOTP(false)
    console.log("showPassword====",showPassword)
  }

  const handleSignIn = () => {
    if (!password) {
      alert("Please enter your password.");
      return;
    }
    // Add authentication logic here
    console.log("Password entered:", password);
  };
  return (
      <>
        <div className="body-overlay"></div>
        <header>
          <div className="it-header-top-area black-bg">
            <div className="container">
              <div className="it-header-top">
                <div className="row align-items-center">
                  <div className="col-xl-8 col-lg-6 col-md-6 col-sm-6">
                    <div className="it-header-top-left">
                      <ul>
                        <li className="d-none d-xl-inline-block">
                        <span>
                          <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_349_725)">
                              <path
                                  d="M17.3866 13.6291C16.9362 13.1602 16.3929 12.9094 15.8171 12.9094C15.246 12.9094 14.6981 13.1555 14.2291 13.6245L12.7619 15.0871C12.6412 15.0221 12.5204 14.9617 12.4043 14.9014C12.2372 14.8178 12.0793 14.7389 11.9447 14.6553C10.5703 13.7824 9.32123 12.6448 8.12327 11.1728C7.54287 10.4392 7.15283 9.82166 6.8696 9.19482C7.25034 8.84658 7.60323 8.48441 7.94683 8.13616C8.07684 8.00615 8.20685 7.8715 8.33686 7.74149C9.31194 6.7664 9.31194 5.50344 8.33686 4.52836L7.06925 3.26075C6.92531 3.11681 6.77673 2.96822 6.63743 2.81964C6.35884 2.53176 6.06631 2.23459 5.7645 1.956C5.31411 1.51024 4.77549 1.27344 4.20901 1.27344C3.64254 1.27344 3.09463 1.51024 2.63031 1.956C2.62566 1.96064 2.62566 1.96064 2.62102 1.96528L1.04232 3.55792C0.44798 4.15225 0.109023 4.8766 0.0347313 5.71703C-0.0767067 7.07286 0.322613 8.33582 0.629067 9.16232C1.38127 11.1914 2.50494 13.0719 4.18115 15.0871C6.2149 17.5155 8.66189 19.4332 11.4571 20.7844C12.5251 21.2905 13.9506 21.8895 15.5432 21.9916C15.6407 21.9963 15.7428 22.0009 15.8357 22.0009C16.9083 22.0009 17.8091 21.6155 18.5149 20.8494C18.5195 20.8401 18.5288 20.8355 18.5334 20.8262C18.7749 20.5336 19.0535 20.269 19.346 19.9857C19.5457 19.7954 19.75 19.5957 19.9496 19.3868C20.4093 18.9085 20.6508 18.3513 20.6508 17.7802C20.6508 17.2044 20.4047 16.6519 19.9357 16.1876L17.3866 13.6291ZM19.0488 18.5185C19.0442 18.5185 19.0442 18.5231 19.0488 18.5185C18.8678 18.7135 18.682 18.8899 18.4824 19.0849C18.1806 19.3728 17.8741 19.6746 17.5862 20.0136C17.1172 20.5151 16.5647 20.7519 15.8404 20.7519C15.7707 20.7519 15.6964 20.7519 15.6268 20.7472C14.2477 20.659 12.9662 20.1204 12.005 19.6607C9.37695 18.3885 7.06925 16.5822 5.15159 14.2931C3.56824 12.3847 2.50958 10.6203 1.80845 8.72585C1.37663 7.56969 1.21876 6.66889 1.28841 5.81918C1.33484 5.27592 1.54379 4.82552 1.92918 4.44013L3.51253 2.85679C3.74004 2.6432 3.98149 2.52712 4.2183 2.52712C4.51082 2.52712 4.74763 2.70356 4.89621 2.85214C4.90086 2.85679 4.9055 2.86143 4.91014 2.86607C5.19338 3.13074 5.46269 3.40469 5.74593 3.69721C5.88987 3.8458 6.03845 3.99438 6.18704 4.14761L7.45464 5.41522C7.94683 5.9074 7.94683 6.36244 7.45464 6.85462C7.31999 6.98928 7.18998 7.12393 7.05533 7.25394C6.66529 7.65326 6.29383 8.02472 5.88987 8.3869C5.88058 8.39618 5.8713 8.40083 5.86665 8.41011C5.46733 8.80943 5.54163 9.19947 5.6252 9.46413C5.62985 9.47806 5.63449 9.49199 5.63913 9.50592C5.9688 10.3046 6.43313 11.0568 7.1389 11.9529L7.14355 11.9576C8.42508 13.5363 9.77627 14.7667 11.2668 15.7093C11.4571 15.83 11.6521 15.9275 11.8379 16.0204C12.005 16.104 12.1629 16.1829 12.2976 16.2665C12.3161 16.2758 12.3347 16.2897 12.3533 16.299C12.5111 16.3779 12.6597 16.4151 12.813 16.4151C13.1983 16.4151 13.4398 16.1736 13.5187 16.0947L15.1067 14.5067C15.2646 14.3488 15.5153 14.1585 15.8079 14.1585C16.0957 14.1585 16.3325 14.3395 16.4765 14.4974C16.4811 14.5021 16.4811 14.5021 16.4858 14.5067L19.0442 17.0651C19.5225 17.5387 19.5225 18.0263 19.0488 18.5185Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M11.889 5.23373C13.1055 5.43803 14.2106 6.0138 15.0929 6.89601C15.9751 7.77823 16.5462 8.88333 16.7551 10.0999C16.8062 10.4063 17.0709 10.6199 17.3727 10.6199C17.4098 10.6199 17.4423 10.6153 17.4795 10.6106C17.8231 10.5549 18.0506 10.2299 17.9949 9.88627C17.7442 8.41436 17.0477 7.07246 15.9844 6.00915C14.9211 4.94585 13.5792 4.24936 12.1072 3.99863C11.7636 3.94291 11.4433 4.17043 11.3829 4.50938C11.3225 4.84834 11.5454 5.17801 11.889 5.23373Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M21.974 9.70466C21.5607 7.28089 20.4185 5.07534 18.6633 3.32019C16.9082 1.56505 14.7026 0.422806 12.2789 0.0095565C11.9399 -0.0508058 11.6195 0.181357 11.5592 0.520314C11.5034 0.863915 11.731 1.1843 12.0746 1.24466C14.2383 1.61148 16.2117 2.63764 17.7811 4.20241C19.3505 5.77183 20.3721 7.74521 20.7389 9.90897C20.7899 10.2154 21.0546 10.429 21.3564 10.429C21.3936 10.429 21.4261 10.4244 21.4632 10.4197C21.8022 10.3686 22.0343 10.0436 21.974 9.70466Z"
                                  fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_349_725">
                                <rect
                                    width="22"
                                    height="22"
                                    fill="currentColor"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                          <a href="tel:000967-237-96">(000) 967-237-96</a>
                        </li>
                        <li>
                        <span>
                          <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_349_698)">
                              <path
                                  d="M18.9853 8.26352C18.7954 8.07212 18.4862 8.07085 18.2948 8.26074C18.1034 8.45068 18.1021 8.75986 18.292 8.95132L18.295 8.95434C18.39 9.05019 18.5146 9.09795 18.6394 9.09795C18.7638 9.09795 18.8884 9.05039 18.984 8.95556C19.1755 8.76562 19.1752 8.45498 18.9853 8.26352Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M24.8564 14.1356L20.3214 9.60054C20.1307 9.40991 19.8215 9.40991 19.6308 9.60054C19.4401 9.79121 19.4401 10.1004 19.6308 10.2911L23.231 13.8913H14.6458C13.9336 13.8913 13.3542 13.3119 13.3542 12.5997V4.01455L16.83 7.49024C17.0206 7.68086 17.3298 7.68086 17.5205 7.49024C17.7112 7.29956 17.7112 6.99038 17.5205 6.79966L13.1099 2.38906C12.9192 2.19844 12.61 2.19844 12.4194 2.38906L4.63519 10.1734C4.44452 10.3641 4.44452 10.6732 4.63519 10.864L16.3817 22.6105C16.4733 22.702 16.5975 22.7535 16.727 22.7535C16.8565 22.7535 16.9807 22.702 17.0723 22.6105L24.8565 14.8262C24.948 14.7346 24.9995 14.6104 24.9995 14.4809C24.9994 14.3514 24.948 14.2272 24.8564 14.1356ZM12.3778 3.81187V10.0304H6.15922L12.3778 3.81187ZM16.2387 21.0863L6.15922 11.0069H12.3778V12.5997C12.3778 13.8503 13.3953 14.8678 14.6459 14.8678H16.2387V21.0863ZM17.2152 21.0864V14.8678H23.4337L17.2152 21.0864Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M3.35112 12.4023H0.488281C0.218604 12.4023 0 12.621 0 12.8906C0 13.1603 0.218604 13.3789 0.488281 13.3789H3.35112C3.6208 13.3789 3.8394 13.1603 3.8394 12.8906C3.8394 12.621 3.6208 12.4023 3.35112 12.4023Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M4.80615 12.4023H4.79883C4.52915 12.4023 4.31055 12.621 4.31055 12.8906C4.31055 13.1603 4.52915 13.3789 4.79883 13.3789H4.80615C5.07583 13.3789 5.29443 13.1603 5.29443 12.8906C5.29443 12.621 5.07583 12.4023 4.80615 12.4023Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M2.05093 7.27539H0.488281C0.218604 7.27539 0 7.49404 0 7.76367C0 8.0333 0.218604 8.25195 0.488281 8.25195H2.05093C2.32061 8.25195 2.53921 8.0333 2.53921 7.76367C2.53921 7.49404 2.32061 7.27539 2.05093 7.27539Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M5.49355 7.27539H3.64648C3.37681 7.27539 3.1582 7.49404 3.1582 7.76367C3.1582 8.0333 3.37681 8.25195 3.64648 8.25195H5.49355C5.76323 8.25195 5.98184 8.0333 5.98184 7.76367C5.98184 7.49404 5.76323 7.27539 5.49355 7.27539Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M6.55659 15.0879H3.82227C3.55259 15.0879 3.33398 15.3065 3.33398 15.5762C3.33398 15.8458 3.55259 16.0645 3.82227 16.0645H6.55659C6.82627 16.0645 7.04487 15.8458 7.04487 15.5762C7.04487 15.3065 6.82622 15.0879 6.55659 15.0879Z"
                                  fill="currentColor"
                              />
                              <path
                                  d="M8.69136 18.2129H1.80664C1.53696 18.2129 1.31836 18.4315 1.31836 18.7012C1.31836 18.9708 1.53696 19.1895 1.80664 19.1895H8.69136C8.96103 19.1895 9.17964 18.9708 9.17964 18.7012C9.17964 18.4315 8.96103 18.2129 8.69136 18.2129Z"
                                  fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_349_698">
                                <rect
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                          <a href="mailto:touresinfo@gmail.com">
                            touresinfo@gmail.com
                          </a>
                        </li>
                        <li className="d-none d-xl-inline-block">
                        <span>
                          <svg
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5797 2.72534C15.8223 0.967873 13.4856 0 11.0002 0C8.51481 0 6.17808 0.967873 4.42065 2.72534C2.66319 4.48285 1.69531 6.8195 1.69531 9.30486C1.69531 14.3327 6.4493 18.5147 9.00332 20.7613C9.35825 21.0735 9.66474 21.3432 9.90893 21.5713C10.2149 21.857 10.6076 22 11.0002 22C11.3929 22 11.7855 21.857 12.0915 21.5713C12.3356 21.3431 12.6421 21.0735 12.9971 20.7613C15.5511 18.5146 20.3051 14.3327 20.3051 9.30486C20.305 6.8195 19.3372 4.48285 17.5797 2.72534ZM12.1458 19.7938C11.7831 20.1128 11.4699 20.3884 11.2117 20.6296C11.0931 20.7403 10.9073 20.7403 10.7886 20.6296C10.5304 20.3883 10.2171 20.1128 9.85445 19.7937C7.45335 17.6816 2.98395 13.75 2.98395 9.3049C2.98395 4.88478 6.57997 1.28876 11.0001 1.28876C15.4202 1.28876 19.0163 4.88478 19.0163 9.3049C19.0163 13.75 14.5469 17.6816 12.1458 19.7938Z"
                                fill="currentColor"
                            />
                            <path
                                d="M11.0009 4.85352C8.73989 4.85352 6.90039 6.69297 6.90039 8.95403C6.90039 11.2151 8.73989 13.0545 11.0009 13.0545C13.262 13.0545 15.1015 11.2151 15.1015 8.95403C15.1015 6.69297 13.262 4.85352 11.0009 4.85352ZM11.0009 11.7658C9.45051 11.7658 8.18911 10.5044 8.18911 8.95399C8.18911 7.40359 9.45051 6.14219 11.0009 6.14219C12.5514 6.14219 13.8127 7.40359 13.8127 8.95399C13.8127 10.5044 12.5514 11.7658 11.0009 11.7658Z"
                                fill="currentColor"
                            />
                          </svg>
                        </span>
                          <a href="https://www.google.com/maps">
                            1031, Noida Uttarpradesh, 201301
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                    <div className="it-header-top-right d-flex align-items-center justify-content-end">
                      <div className="it-header-top-lang-wrapper d-flex align-items-center">
                        <div className="it-header-currency d-none d-xl-block">
                        <span
                            id="it-header-currency-toggle"
                            className="it-header-currency-selected-currency it-currency-toggle">
                          USD
                        </span>
                          <ul className="it-header-currency-list it-currency-list">
                            <li>Spanish</li>
                            <li>English</li>
                            <li>Canada</li>
                          </ul>
                        </div>
                        <div className="it-header-lang d-none d-md-block">
                          <img src="../../assets/img/logo/logo-lang.png" alt="" />
                          <span
                              id="it-header-lang-toggle"
                              className="it-header-lang-selected-lang it-lang-toggle">
                          English
                        </span>
                          <ul className="it-header-lang-list it-lang-list">
                            <li>Spanish</li>
                            <li>English</li>
                            <li>Canada</li>
                          </ul>
                        </div>
                      </div>
                      <div className="it-header-top-right-social p-relative text-end">
                        <a href="">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="">
                          <i className="fa-brands fa-skype"></i>
                        </a>
                        <a href="">
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
              id="header-sticky"
              className="it-header-bottom-area position-relative">
            <div className="container col-xl-12 col-lg-8 col-md-9 col-8">
              <div className="it-header-bottom it-header-mob-space">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-6 col-md-2 col-6">
                    <div className="it-main-logo">
                      <Link to="/">
                        <img src={logo} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-7 d-none d-xl-block">
                    <div className="it-main-menu text-center">
                      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-light py-md-0">
                        <div className="container-fluid d-flex justify-content-center">
                          <div
                              className="navbar navbar-collapse py-md-0"
                              id="navbarNavDropdown">
                            <ul className="navbar-nav">
                              <li className={`nav-item me-3 ${isActive('') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/">
                                  <AirplaneTicketOutlinedIcon />
                                  <span >Flights</span>
                                </Link>

                              </li>

                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/hotels">
                                  <BusinessOutlinedIcon />
                                  <span>Hotels</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/flightAndHotels">
                                  <FlightTakeoffOutlinedIcon />
                                  <span>Flight+Hotel</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/train">
                                  <TrainOutlinedIcon />
                                  <span>Trains</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/bus">
                                  <DirectionsBusFilledOutlinedIcon />
                                  <span>Bus</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/holidays">
                                  <BeachAccessOutlinedIcon />
                                  <span>Holidays</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/cabs">
                                  <DirectionsCarOutlinedIcon />
                                  <span>Cabs</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/activities">
                                  <KitesurfingOutlinedIcon className="icon" />
                                  <span className="item-text">Activities</span>
                                </Link>
                              </li>
                              <li className="nav-item me-3">
                                <Link className="nav-link" to="/visa">
                                  <CreditCardOutlinedIcon />
                                  <span>Visa</span>
                                </Link>
                              </li>
                              <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded={isMoreClicked ? "true" : "false"}
                                    onClick={handleMoreClick}>
                                  <MoreHorizOutlinedIcon className="icon" />
                                  <span className="item-text">More</span>
                                </a>
                                {isMoreClicked && (
                                    <div
                                        className="dropdown-menu show"
                                        aria-labelledby="navbarDropdown">
                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <CreditScoreOutlinedIcon className="me-2" />
                                        <div>
                                          <span>EaseMyTrips Cards</span>
                                          <small className="d-block">
                                            Apply now to get reward
                                          </small>
                                        </div>
                                      </div>
                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <RunCircleOutlinedIcon className="me-2" />
                                        <div>
                                          <span>EasyEloped</span>
                                          <small className="d-block">
                                            For romantic getaways
                                          </small>
                                        </div>
                                      </div>
                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <TempleHinduOutlinedIcon className="me-2" />
                                        <div>
                                          <span>EasyDarshan</span>
                                          <small className="d-block">
                                            Spiritual Tour of India
                                          </small>
                                        </div>
                                      </div>

                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <LockOutlinedIcon className="me-2" />
                                        <div>
                                          <span>Airport Service</span>
                                          <small className="d-block">
                                            Enjoy Airport Service
                                          </small>
                                        </div>
                                      </div>
                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <CreditCardOutlinedIcon className="me-2" />
                                        <div>
                                          <span>Gift Card</span>
                                          <small className="d-block">
                                            Buy Gift Cards Here
                                          </small>
                                        </div>
                                      </div>
                                      <div className="dropdown-item d-flex align-items-center border-bottom">
                                        <PaidOutlinedIcon className="me-2" />
                                        <div>
                                          <span>Offers</span>
                                          <small className="d-block">
                                            Check Best Latest Offer
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-6">
                    <div className="it-header-bottom-right d-flex align-items-center justify-content-end">

                      <div className="it-header-bottom-right-button position-relative ml-0">
                        <Link to="" className="it-btn-primary" data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded={isLoginClicked ? "true" : "false"}
                              onClick={handleLoginClick}>
                          Login or Signup
                        </Link>
                        {isLoginClicked && (
                            <div
                                className="dropdown-menu show"
                                aria-labelledby="navbarDropdown">
                              <div className="dropdown-item d-flex align-items-center border-bottom" onClick={handleModalOpenClick}>
                                <AssignmentIndOutlinedIcon className="me-2" />
                                <div>
                                  <span>Customer Login</span>
                                  <small className="d-block">
                                    Login & check bookings
                                  </small>
                                </div>
                              </div>
                              <div className="dropdown-item d-flex align-items-center border-bottom" onClick={handleModalOpenClick}>
                                <SupportAgentOutlinedIcon className="me-2" />
                                <div>
                                  <span>Agent Login</span>
                                  <small className="d-block">
                                    Login your agent account
                                  </small>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                      <div className="it-header-bar-wrap d-xl-none">
                        <button
                            className="it-header-bar it-menu-bar"
                            onClick={handleMenuToggle}>
                          <i className="fa-sharp fa-regular fa-bars-staggered"></i>
                        </button>
                        {isMenuOpen && (
                            <div
                                className="offcanvas offcanvas-end show"
                                tabindex="-1"
                                id="offcanvasExample"
                                aria-labelledby="offcanvasExampleLabel">
                              <div className="offcanvas-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    onClick={() => setIsMenuOpen(false)}></button>
                              </div>
                              <ul className="navbar-nav">
                                <li className={`nav-item me-3 ${isActive('') ? 'active' : ''}`}>
                                  <Link className="nav-link" to="/">
                                    <AirplaneTicketOutlinedIcon />
                                    <span >Flights</span>
                                  </Link>

                                </li>

                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/hotels">
                                    <BusinessOutlinedIcon />
                                    <span>Hotels</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/flightAndHotels">
                                    <FlightTakeoffOutlinedIcon />
                                    <span>Flight+Hotel</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/train">
                                    <TrainOutlinedIcon />
                                    <span>Trains</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/bus">
                                    <DirectionsBusFilledOutlinedIcon />
                                    <span>Bus</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/holidays">
                                    <BeachAccessOutlinedIcon />
                                    <span>Holidays</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/cabs">
                                    <DirectionsCarOutlinedIcon />
                                    <span>Cabs</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/activities">
                                    <KitesurfingOutlinedIcon className="icon" />
                                    <span className="item-text">Activities</span>
                                  </Link>
                                </li>
                                <li className="nav-item me-3">
                                  <Link className="nav-link" to="/visa">
                                    <CreditCardOutlinedIcon />
                                    <span>Visa</span>
                                  </Link>
                                </li>
                                <li className="nav-item dropdown">
                                  <a
                                      className="nav-link dropdown-toggle"
                                      href="#"
                                      id="navbarDropdown"
                                      role="button"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded={isMoreClicked ? "true" : "false"}
                                      onClick={handleMoreClick}>
                                    <MoreHorizOutlinedIcon className="icon" />
                                    <span className="item-text">More</span>
                                  </a>
                                  {isMoreClicked && (
                                      <div
                                          className="dropdown-menu show"
                                          aria-labelledby="navbarDropdown">
                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <CreditScoreOutlinedIcon className="me-2" />
                                          <div>
                                            <span>EaseMyTrips Cards</span>
                                            <small className="d-block">
                                              Apply now to get reward
                                            </small>
                                          </div>
                                        </div>
                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <RunCircleOutlinedIcon className="me-2" />
                                          <div>
                                            <span>EasyEloped</span>
                                            <small className="d-block">
                                              For romantic getaways
                                            </small>
                                          </div>
                                        </div>
                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <TempleHinduOutlinedIcon className="me-2" />
                                          <div>
                                            <span>EasyDarshan</span>
                                            <small className="d-block">
                                              Spiritual Tour of India
                                            </small>
                                          </div>
                                        </div>

                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <LockOutlinedIcon className="me-2" />
                                          <div>
                                            <span>Airport Service</span>
                                            <small className="d-block">
                                              Enjoy Airport Service
                                            </small>
                                          </div>
                                        </div>
                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <CreditCardOutlinedIcon className="me-2" />
                                          <div>
                                            <span>Gift Card</span>
                                            <small className="d-block">
                                              Buy Gift Cards Here
                                            </small>
                                          </div>
                                        </div>
                                        <div className="dropdown-item d-flex align-items-center border-bottom">
                                          <PaidOutlinedIcon className="me-2" />
                                          <div>
                                            <span>Offers</span>
                                            <small className="d-block">
                                              Check Best Latest Offer
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                  )}
                                </li>
                              </ul>
                              <div className="it-header-bottom-right-button position-relative ml-0 d-block">
                                <Link to="" className="it-btn-primary" data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded={isLoginClicked ? "true" : "false"}
                                      onClick={handleLoginClick}>
                                  Login or Signup
                                </Link>
                                {isLoginClicked && (
                                    <div
                                        className="dropdown-menu show"
                                        aria-labelledby="navbarDropdown">
                                      <div className="dropdown-item d-flex align-items-center border-bottom" onClick={handleModalOpenClick}>
                                        <AssignmentIndOutlinedIcon className="me-2" />
                                        <div>
                                          <span>Customer Login</span>
                                          <small className="d-block">
                                            Login & check bookings
                                          </small>
                                        </div>
                                      </div>
                                      <div className="dropdown-item d-flex align-items-center border-bottom" onClick={handleModalOpenClick}>
                                        <SupportAgentOutlinedIcon className="me-2" />
                                        <div>
                                          <span>Agent Login</span>
                                          <small className="d-block">
                                            Login your agent account
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                )}
                              </div>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {isModalOpen && (
            <div className={isModalOpen ? "show modal" : "modal"} id="loginmodal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-body py-4">
                    <div className="it-sign-up-area">
                      <div className="container">
                        <div className="it-sign-up-wrap">
                          <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6">
                              <div className="it-sign-up-thumb">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleModalOpenClick}
                                />
                                <img
                                    alt="Sign In Img"
                                    loading="lazy"
                                    width={570}
                                    height={300}
                                    src={Loginimage}
                                />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                              <div className="it-sign-up-left">
                                <h4 className="it-sign-up-title mb-25">Sign In</h4>
                                <form>
                                  <div className="row gx-30">
                                    {!showOTP ? (
                                        showPassword ? (
                                            <>

                                              {/* Password Input View */}
                                              <div className="col-md-12 mb-20">
                                                {/* Back Button */}
                                                <button
                                                    className="btn btn-link"
                                                    onClick={handleBackButtonClick}
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      textDecoration: "none",
                                                      marginBottom: "10px",
                                                    }}
                                                >
                                                  <span style={{ marginRight: "5px" }}>←</span>
                                                  Back
                                                </button>
                                                <div className="it-contact-input-box p-relative">
                                                  <input
                                                      type="password"
                                                      placeholder="Enter your password"
                                                      value={password}
                                                      onChange={(e) =>
                                                          setPassword(e.target.value)
                                                      }
                                                      style={{
                                                        width: "100%",
                                                        padding: "10px",
                                                        border: "2px solid #ddd",
                                                        borderRadius: "8px",
                                                        fontSize: "16px",
                                                        outline: "none",
                                                      }}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-12 mb-20">
                                                <button
                                                    className="it-btn-primary w-100"
                                                    type="submit"
                                                    onClick={handleSignIn}
                                                >
                                                  <span>Sign In</span>
                                                </button>
                                              </div>
                                            </>
                                        ) :  (
                                            <>
                                              {/* Mobile Input View */}
                                              <div className="col-md-12 mb-20">
                                                <div className="it-contact-input-box p-relative d-flex align-items-center">
                                                  <select
                                                      className="form-select"
                                                      value={countryCode}
                                                      onChange={(e) =>
                                                          setCountryCode(e.target.value)
                                                      }
                                                      style={{
                                                        maxWidth: "100px",
                                                        marginRight: "10px",
                                                      }}
                                                  >
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                    <option value="+81">🇯🇵 +81</option>
                                                  </select>
                                                  <input
                                                      placeholder="Mobile Number"
                                                      type="text"
                                                      name="mobile"
                                                      value={mobile}
                                                      onChange={(e) =>
                                                          setMobile(e.target.value)
                                                      }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-12 mb-20">
                                                <button
                                                    className="it-btn-primary w-100"
                                                    type="submit"
                                                    onClick={handleContinue}
                                                >
                                                  <span>Continue</span>
                                                </button>
                                              </div>

                                            </>
                                        )

                                    ) :  (
                                        <>
                                          {/* OTP Input View */}
                                          <div className="col-md-12 mb-20">
                                            {/* Back Button */}
                                            <button
                                                className="btn btn-link"
                                                onClick={handleBackButtonClick}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  textDecoration: "none",
                                                  marginBottom: "10px",
                                                }}
                                            >
                                              <span style={{ marginRight: "5px" }}>←</span>
                                              Back
                                            </button>

                                            <p>Enter the 6-digit OTP sent to {mobile}</p>
                                            <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  gap: "10px",
                                                  marginTop: "20px",
                                                }}
                                            >
                                              {otp.map((digit, index) => (
                                                  <input
                                                      key={index}
                                                      type="text"
                                                      maxLength="1"
                                                      value={digit}
                                                      onChange={(e) =>
                                                          handleOTPChange(e, index)
                                                      }
                                                      onKeyDown={(e) =>
                                                          handleKeyDown(e, index)
                                                      }
                                                      onPaste={handlePaste}
                                                      ref={(el) =>
                                                          (inputRefs.current[index] = el)
                                                      }
                                                      className='otpboxes'
                                                  />
                                              ))}
                                            </div>
                                          </div>
                                          <div className="col-md-12 mb-20">
                                            <button
                                                className="it-btn-primary w-100"
                                                type="submit"
                                            >
                                              <span>Verify OTP</span>
                                            </button>
                                          </div>
                                        </>
                                    )}
                                  </div>
                                  <div className="it-sign-up-bottom">
                                    {showOTP ? (
                                        <span>
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={handleLoginWithPassword}
                                style={{
                                  textDecoration: "none",
                                  color: "#007bff",
                                  padding: 0,
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                            >
                              Login with password
                            </button>
                          </span>
                                    ) : null}
                                  </div>
                                </form>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


        )}

      </>
  );
};
export default Header;
