import React, { useState } from "react";

const Verification = () => {
    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered OTP:", otp);
        // Verification logic yahan add karein
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans">
            {/* Main Container */}
            <div className="liquid-glass-card rounded-3xl w-full max-w-6xl flex overflow-hidden">

                {/* Left Section: Form */}
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
                    <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>

                        {/* Logo placeholder ko yahan se delete kar diya gaya hai */}

                        <h2 className="text-3xl font-bold mb-2 text-white">Verify Your Account</h2>
                        <p className="text-slate-300 mb-8">
                            We've sent a 6-digit verification code to your email/mobile.
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                className="liquid-glass-input tracking-[1em] text-center font-bold text-xl rounded-md p-4 w-full text-white focus:outline-none focus:ring-0 placeholder:tracking-normal placeholder:font-normal placeholder:text-base transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="liquid-glass-button text-white font-bold py-3 rounded-md w-full transition duration-150 flex items-center justify-center gap-2 mb-6"
                        >
                            Verify Code →
                        </button>

                        <div className="text-center">
                            <p className="text-slate-300 text-sm">
                                Didn't receive the code?{" "}
                                <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                                    Resend OTP
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Right Section: Branding Panel */}
                <div className="hidden lg:flex flex-1 bg-linear-to-br from-slate-950/70 via-blue-950/55 to-cyan-950/40 p-16 md:p-24 text-white relative flex flex-col justify-end">

                    {/* Decorative Element */}
                    <div className="absolute inset-x-0 top-0 h-64 border-b border-indigo-500 bg-black bg-opacity-10 m-12 rounded-lg p-6 opacity-30">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto -mt-10 opacity-70"></div>
                    </div>

                    <div className="z-10">
                        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                            Security is our priority
                        </h1>
                        <p className="text-indigo-100 mb-10 text-lg">
                            One more step to secure your account and access your dashboard.
                        </p>

                        {/* Pagination dots */}
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                            <div className="w-8 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Verification;
