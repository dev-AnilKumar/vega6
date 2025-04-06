import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BlogFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        blogImage: null
    });

    const [errors, setErrors] = useState({ title: '', description: '', blogImage: '' });


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.title.trim()) {
            formErrors.title = "Title is required";
        }

        if (!formData.description) {
            formErrors.description = "Description is required";
        }

        if (!formData.image && !initialData?.imageUrl) {
            formErrors.blogImage = "image is required";
        }

        setErrors(formErrors);
        const isValid = Boolean(Object.keys(formErrors).length);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) return;

        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('description', formData.description);
        if (formData.image) formPayload.append('blogImage', formData.image);

        try {
            if (initialData) {
                await axios.put(`http://localhost:5000/api/blog/update/${initialData._id}`, formPayload,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'multipart/form-data'
                        },
                        timeout: 10000,
                    }
                );
            } else {
                await axios.post('http://localhost:5000/api/blog/create', formPayload, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 10000,
                });
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">
                    {initialData ? 'Edit Blog' : 'Create New Blog'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Blog Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded ${errors.title && 'border-red-500'}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Blog Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded ${errors.description && 'border-red-500'}`}
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Blog Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={`w-full p-2 border rounded ${errors.blogImage && 'border-red-500'}`}
                        />
                        {errors.blogImage && <p className="text-red-500 text-sm mt-1">{errors.blogImage}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            {initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogFormModal;