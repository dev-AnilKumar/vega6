import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        }

        setErrors(formErrors);
        const isValid = Boolean(Object.keys(formErrors).length);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            const formD = new FormData();
            formD.append("email", formData.email);
            formD.append("password", formData.password);

            const { data } = await axios.post("http://localhost:5000/api/user/login", formD, {
                timeout: 10000,
            });
            if (data?.success) {
                setToken(data?.token)
                localStorage.setItem("token", data?.token);
                localStorage.setItem("profileImage", data?.profileImage);
                navigate("/");
            }
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="max-w-[450px] w-full h-fit p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-500"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
