import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        profileImage: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.name.trim()) {
            formErrors.name = "Name is required";
        }

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        }

        if (!formData.profileImage) {
            formErrors.profileImage = "Profile image is required";
        }

        setErrors(formErrors);
        const isValid = Boolean(Object.keys(formErrors).length);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validate()) {
                const formD = new FormData();
                formD.append("name", formData.name)
                formD.append("email", formData.email)
                formD.append("password", formData.password)
                formD.append("profileImage", formData.profileImage)

                const { data } = await axios.post("http://localhost:5000/api/user/register", formD, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    },
                    timeout: 10000,
                });
                if (data?.success) {
                    navigate("/login");
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="max-w-[450px] w-full h-fit p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                <h2 className="text-2xl font-semibold text-center mb-6">Signup Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

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

                    <div className="mb-4">
                        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                            Profile Image:
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                        />
                        {errors.profileImage && <span className="text-red-500 text-sm">{errors.profileImage}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 "
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
