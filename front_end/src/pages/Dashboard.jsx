import React, { useEffect, useState } from 'react';
import EditIcon from "../assets/edit-3-svgrepo-com.svg";
import DeleteIcon from "../assets/delete-1487-svgrepo-com.svg";
import DeleteConfirmationModal from '../components/DeleteModal';
import BlogFormModal from '../components/CreateEditModal';
import axios from 'axios';

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [showCreateEditModal, setCreateEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedBlogToDelete, setSelectedBlogToDelete] = useState(null);


    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/blog/get",
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000,
                });
            if (data) {
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async () => {
        if (selectedBlogToDelete) {
            try {
                const { data } = await axios.delete(`http://localhost:5000/api/blog/delete/${selectedBlogToDelete}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000,
                    });
                if (data.success) {
                    fetchBlogs();
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
        setShowDeleteModal(false);
    };

    const handleCreate = () => {
        setSelectedBlog(null);
        setCreateEditModal(true);
    }

    function handleUpdate(blog) {
        setSelectedBlog(blog);
        setCreateEditModal(true);
    }

    function handleCloseEdit() {
        setCreateEditModal(false);
        setSelectedBlog(null)
    }

    function handleCloseDelete() {
        setShowDeleteModal(false);
        setSelectedBlogToDelete("");
    }

    function handleDeleetMdal(id) {
        setSelectedBlogToDelete(id);
        setShowDeleteModal(true)
    }
    function handleSuccess() {
        fetchBlogs();
        setSelectedBlog(null)
        setCreateEditModal(false);
    }

    const image = localStorage.getItem("profileImage");
    const profileImage = image ? `data:image/jpeg;base64,${image}` : null;

    return (
        <>
            <div className='w-full min-h-[100vh] relative'>
                <div className='w-11 h-11 rounded-full overflow-hidden absolute top-2 right-2'>
                    <img src={profileImage} alt="" />
                </div>
                <h1 className='pt-4 text-center text-3xl font-semibold'>Dashboard</h1>
                <div className='w-full mt-8 flex justify-end'>
                    <button type='button' onClick={handleCreate} className='bg-blue-500 mr-6 cursor-pointer text-white text-lg px-4 py-1 rounded-md hover:bg-blue-600'>
                        Create
                    </button>
                </div>

                <div className='w-full px-24 bg-red-50 mt-10'>
                    {blogs?.map(blog => {
                        return <div key={blog._id} className='flex items-start gap-5'>
                            <div className='w-[200px] h-[200px] bg-blue-200 rounded-md flex-shrink-0'>
                                <img className='w-full h-full object-cover' src={`data:image/jpeg;base64,${blog.blogImage}`} alt="" />
                            </div>
                            <div className='mt-2 '>
                                <h1 className='mb-2'>{blog.title}</h1>
                                <p> {blog.description}</p>
                            </div>
                            <div className='w-[30px] flex items-center gap-6 h-10 flex-shrink-0 mt-2'>
                                <div className='w-8 h-8 object-cover contents' onClick={() => handleUpdate(blog)}>
                                    <img src={EditIcon} className='w-6 h-6 cursor-pointer' alt="Edit Icon" />
                                </div>
                                <div className='w-8 h-8 object-cover contents' onClick={() => handleDeleetMdal(blog._id)}>
                                    <img src={DeleteIcon} className='w-6 h-6 cursor-pointer' alt="Delete Icon" />
                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>
            <BlogFormModal
                isOpen={showCreateEditModal}
                onClose={handleCloseEdit}
                initialData={selectedBlog}
                onSuccess={handleSuccess}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={handleCloseDelete}
                onConfirm={handleDelete}
                title={selectedBlogToDelete?.title}
            />
        </>
    )
}

export default Dashboard