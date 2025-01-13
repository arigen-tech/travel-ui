import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="it-sign-up-area pt-120 pb-120">
        <div className="container">
            <div className="it-sign-up-wrap">
            <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6">
                <div className="it-sign-up-left">
                    <h4 className="it-sign-up-title mb-25">sign in</h4>
                    <form noValidate="">
                    <div className="row gx-30">
                        <div className="col-md-12 mb-20">
                        <div className="it-contact-input-box p-relative">
                            <input placeholder="Email" type="email" name="email" />
                            <div style={{ color: "red" }} />
                        </div>
                        </div>
                        <div className="col-md-12 mb-20">
                        <div className="it-contact-input-box p-relative">
                            <input
                            placeholder="Password*"
                            type="Password"
                            name="password"
                            />
                            <div style={{ color: "red" }} />
                        </div>
                        </div>
                    </div>
                    <div className="it-sign-up-forget-box d-flex align-items-center justify-content-between mb-30">
                        <div className="it-sign-up-forget">
                        <a href="#">Forgot Password?</a>
                        </div>
                        <div className="it-sign-up-remember">
                        <input id="remember" type="checkbox" />
                        <label htmlFor="remember">
                            <span>Remember me</span>
                        </label>
                        </div>
                    </div>
                    <div className="it-sign-up-button-box d-sm-flex align-items-center justify-content-between mb-35">
                        <button className="it-btn-primary" type="submit">
                        <span>Sign In</span>
                        </button>
                        <div className="it-sign-up-social">
                        <span>or sign in with</span>
                        <a href="#">
                            <img
                            alt="Social Img"
                            loading="lazy"
                            width={35}
                            height={35}
                            decoding="async"
                            data-nimg={1}
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-1.605cc3c4.png&w=48&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-1.605cc3c4.png&w=96&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-1.605cc3c4.png&w=96&q=75"
                            style={{ color: "transparent" }}
                            />
                        </a>
                        <a href="#">
                            <img
                            alt="Social Img"
                            loading="lazy"
                            width={35}
                            height={35}
                            decoding="async"
                            data-nimg={1}
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-2.81218012.png&w=48&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-2.81218012.png&w=96&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-2.81218012.png&w=96&q=75"
                            style={{ color: "transparent" }}
                            />
                        </a>
                        <a href="#">
                            <img
                            alt="Social Img"
                            loading="lazy"
                            width={35}
                            height={35}
                            decoding="async"
                            data-nimg={1}
                            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-3.e7a4c612.png&w=48&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-3.e7a4c612.png&w=96&q=75 2x"
                            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoacial-3.e7a4c612.png&w=96&q=75"
                            style={{ color: "transparent" }}
                            />
                        </a>
                        </div>
                    </div>
                    <div className="it-sign-up-bottom">
                        <span>
                        Don't have an account? <a href="/sign-up">Sign Up</a>
                        </span>
                    </div>
                    </form>
                </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                <div className="it-sign-up-thumb">
                    <img
                    alt="Sign In Img"
                    loading="lazy"
                    width={570}
                    height={738}
                    decoding="async"
                    data-nimg={1}
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsign-up.ed5c9eb0.jpg&w=640&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsign-up.ed5c9eb0.jpg&w=1200&q=75 2x"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsign-up.ed5c9eb0.jpg&w=1200&q=75"
                    style={{ color: "transparent", height: "auto" }}
                    />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
};

export default Login;