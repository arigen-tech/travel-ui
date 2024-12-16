import React, { useEffect, useState } from "react";

const Footer = () => {
    return(
        <footer>
        <div className="it-footer-area p-relative pt-120 pb-135 black-bg fix">
            <div className="it-footer-shape-1">
            <img src="assets/img/home-1/footer/left-tree.png" alt="" />
            </div>
            <div className="it-footer-shape-2">
            <img src="assets/img/home-1/footer/right-tree.png" alt="" />
            </div>
            <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                <div className="it-footer-widget footer-col-1 mb-60">
                    <div className="it-footer-logo mb-35">
                    <a href="index.html">
                        <img src="assets/img/logo/logo.png" alt="" />
                    </a>
                    </div>
                    <div className="it-footer-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>
                    <div className="it-footer-social">
                        <a href="#"><i className="flaticon-facebook-app-symbol"></i></a>
                        <a href="#"><i className="flaticon-twitter"></i></a>
                        <a href="#"><i className="flaticon-skype"></i></a>
                        <a href="#"><i className="flaticon-linkedin"></i></a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                <div className="it-footer-widget footer-col-2 mb-60">
                    <h3 className="it-footer-widget-title mb-55">Company:</h3>
                    <div className="it-footer-list">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Blog update</a></li>
                        <li><a href="#">Our services</a></li>
                        <li><a href="#">Testimonial</a></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                <div className="it-footer-widget footer-col-3 mb-60">
                    <h3 className="it-footer-widget-title mb-55">Quick Links:</h3>
                    <div className="it-footer-list">
                    <ul>
                        <li><a href="#">Privacy & policy</a></li>
                        <li><a href="#">Terms & conditions</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Hydropower Plants</a></li>
                        <li><a href="#">Customer support</a></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".9s">
                <div className="it-footer-widget p-relative footer-col-4 mb-60">
                    <h3 className="it-footer-widget-title mb-55">Subscribe Newsletter:</h3>
                    <div className="it-footer-form">
                    <form action="#">
                        <div className="it-footer-input">
                        <input type="email" placeholder="Enter your email:" />
                        </div>
                        <button type="submit" className="it-btn-primary">Subscribe now</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="it-copyright-area z-index">
            <div className="container">
                <div className="it-copyright-wrap">
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                    <div className="it-copyright-text text-center text-lg-start">
                        <p>Copyright © 2024 <span><a href="#">Hindustan Holidays</a></span> All Right Reserved</p>
                    </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 d-none d-lg-block wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                    <div className="it-copyright-privacy">
                        <a href="#">Privacy & Policy || Terms & Conditions</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </footer>
    )

}

export default Footer;