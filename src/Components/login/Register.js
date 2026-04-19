import { useState } from "react";
// No separate CSS file needed with Tailwind

export default function Register() {
    const [formData, setFormData] = useState({
        Name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false // Checkbox state added
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        const finalValue = type === 'checkbox' ? checked : value;

        setFormData((currData) => {
            return { ...currData, [name]: finalValue };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Submitted Data:", formData);
        // Add real API submission logic here
        setFormData({
            Name: "",
            email: "",
            number: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* Main split-screen card container */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl flex overflow-hidden">

                {/* Left Form Section */}
                <div className="flex-1 p-16 md:p-24">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                        {/* Plain Blue Logo Placeholder */}
                        <div className="bg-blue-600 w-16 h-16 rounded-md mb-8"></div>

                        <h2 className="text-3xl font-bold mb-2 text-gray-800">Create an account</h2>
                        <p className="text-gray-500 mb-8">Please enter your details to register.</p>

                        <input
                            placeholder="Name"
                            value={formData.Name} // Note: Changed to match state case
                            onChange={handleChange}
                            name="Name"
                            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            value={formData.number}
                            onChange={handleChange}
                            name="number"
                            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            className="border border-gray-300 rounded-md p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="checkbox flex items-center gap-2 mb-6">
                            <input
                                type="checkbox"
                                id="terms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the Terms of Service and Privacy Policy.
                            </label>
                        </div>

                        <button className="bg-indigo-600 text-white font-bold py-3 rounded-md w-full hover:bg-indigo-700 transition duration-150 flex items-center justify-center gap-2">
                            Create account →
                        </button>

                        <p className="login-text text-center text-gray-600 mt-6 text-sm">
                            Already have an account?{" "}
                            <a href="#/login" onClick={(e) => { e.preventDefault(); window.location.href="#/login"; window.location.reload(); }} className="font-medium text-blue-600 hover:text-blue-500">
                                Login
                            </a>
                        </p>
                    </form>
                </div>

                {/* Right Branding Panel Section */}
                <div className="flex-1 bg-purple-600 p-16 md:p-24 text-white relative flex flex-col justify-end">
                    {/* Subtle branding illustration - as a placeholder */}
                    <div className="absolute inset-x-0 top-0 h-64 border-b border-indigo-500 bg-black bg-opacity-10 m-12 rounded-lg p-6 opacity-30">
                        {/* Placeholder ceiling light */}
                        <div className="w-16 h-16 bg-white rounded-full mx-auto -mt-10 opacity-70"></div>
                    </div>

                    <div className="z-10">
                        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                            Seamless work experience
                        </h1>
                        <p className="text-indigo-100 mb-10 text-lg">
                            Everything you need in an easily customizable dashboard
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}