import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ name: "" });
  const [formErr, setFormErr] = useState(null);
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState(null);
  const [getName, setGetName] = useState("");
  const [updateErr, setUpdateErr] = useState(null);
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // Get categories
  const getCategory = async () => {
    try {
      const res = await axios.get(BASE_URL + API_PATHS.CATEGORY.GET_CATEGORY);
      setCategory(res.data.category);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Add category
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setFormErr(null);
      await axios.post(BASE_URL + API_PATHS.CATEGORY.CREATE_CATEGORY, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData({ name: "" });
      getCategory();
    } catch (err) {
      if (err.response && err.response.data.message) {
        setFormErr(err.response.data.message);
      } else {
        setFormErr("Something went wrong, Please try again later");
      }
    }
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateErr(null);
      const res = await axios.put(
        `${BASE_URL}${API_PATHS.CATEGORY.UPDATE_CATEGORY(select._id)}`,
        { name: getName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setCategory((prev) =>
          prev.map((c) => (c._id === select._id ? { ...c, name: getName } : c))
        );
        setModal(false);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setUpdateErr(err.response.data.message);
      } else {
        setUpdateErr("Something went wrong, Please try again later");
      }
    }
  };

  // Delete category
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}${API_PATHS.CATEGORY.DELETE_CATEGORY(select._id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategory((prev) => prev.filter((c) => c._id !== select._id));
      setModal(false);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setUpdateErr(err.response.data.message);
      } else {
        setUpdateErr("Something went wrong, Please try again later");
      }
    }
  };

  const handleClick = (c) => {
    setSelect(c);
    setModal(true);
    setGetName(c.name);
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:pl-72 lg:my-5 flex flex-wrap gap-5">
        {/* Category List */}
        <div>
          <h2 className="text-xl font-semibold">Categories Lists</h2>
          {error && (
            <p className="text-red-500 text-[14px] mt-2.5 mb-1.5">{error}</p>
          )}
          <div className="mt-2.5 flex flex-col space-y-2">
            {category.length > 0 ? (
              category.map((c) => (
                <p
                  className="mt-3.5 text-[14px] cursor-pointer hover:text-violet-400 ease-in transition-all duration-200"
                  key={c._id}
                  onClick={() => handleClick(c)}
                >
                  {c.name}
                </p>
              ))
            ) : (
              <p className="text-gray-600 mt-2.5">No category found.</p>
            )}

            {/* Modal */}
            {modal && select && (
              <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

                {/* Modal content */}
                <div className="relative bg-white p-5 rounded shadow-md w-80 pointer-events-auto">
                  <h3 className="text-lg font-semibold mb-3">
                    Update Category
                  </h3>
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      value={getName}
                      className="text-[14px] text-gray-700 border p-2 rounded outline-none w-full"
                      onChange={(e) => setGetName(e.target.value)}
                    />
                    <div className="flex space-x-2 mt-3">
                      <button
                        type="submit"
                        className="px-2.5 py-0.5 bg-blue-400 hover:bg-blue-600 transition ease-out duration-300 text-white text-[14px] rounded cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-2.5 py-0.5 bg-red-500 text-white hover:bg-red-400 transition ease-out duration-300 text-[14px] rounded cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="px-2.5 py-0.5 border rounded cursor-pointer text-[14px] text-gray-700 hover:text-black transition ease-out duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  {updateErr && (
                    <p className="text-red-500 text-[14px] mt-2.5 mb-1.5">
                      {updateErr}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Category */}
        <div className="flex-1 px-6 lg:px-10">
          <h6 className="text-xl font-semibold">Add Category</h6>
          <div className="mt-2.5">
            <form className="mb-2.5 flex flex-wrap gap-5" onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Add category"
                className="text-[14px] text-gray-700 border p-2 rounded outline-none"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <button
                type="submit"
                className="bg-teal-400 text-white px-2.5 py-1 text-[14px] border-none rounded cursor-pointer transition-all ease-in-out duration-300 hover:bg-teal-600"
              >
                Add
              </button>
            </form>
            {formErr && <p className="text-red-500 text-[14px]">{formErr}</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Category;
