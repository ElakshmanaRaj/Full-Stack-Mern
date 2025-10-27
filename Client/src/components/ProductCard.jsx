import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../utilis/apiPath";

const ProductCard = ({ id, name, description, category, price, stock, images, updated }) => {

  
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: name || "",
    description: description || "",
    price: price || "",
    stock: stock || "",
    category: category?._id || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formError, setFormError] = useState(false);

  const getCategory = async () => {
    try {
      const res = await axios.get(BASE_URL + API_PATHS.CATEGORY.GET_CATEGORY);
      setCategories(res.data.category);
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

  const token = localStorage.getItem("adminToken");

  if (!token) {
    <Navigate to="admin/login" />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setEdit(false);
      const res = await axios.put(
        `${BASE_URL}${API_PATHS.PRODUCT.UPDATE_PRODUCT(id)}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updated();
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${BASE_URL}${API_PATHS.PRODUCT.DELETE_PRODUCT(id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updated();
    } catch (err) {
      if (err.response && err.response.data.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Something went wrong, Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="border border-gray-200 text-center rounded-md shadow-md p-3.5 hover:shadow-lg transition cursor-pointer">
      {!edit ? (
        <div title={name}>
          <div className="flex space-x-3 justify-center mb-3">
            {images[0] && (
              <img
                src={images[0]}
                alt={`${name}-0`}
                className="w-full h-48 object-contain hover:scale-105 transition duration-200 ease-in-out "
              />
            )}
          </div>
          <h3 className="text-[18px] font-semibold mb-1 text-overflow">
            {name}
          </h3>
          <p className="text-purple-700 font-bold mb-2">
            Price: ₹ {Math.round(price)}
          </p>
          <p className="font-medium text-slate-800 capitalize mb-3">
            Category: &nbsp;{category?.name}
          </p>
          <p className="text-slate-600 font-medium mb-2.5">Stock: {stock}</p>
          <div className="mb-2.5 flex justify-center gap-3.5">
            <button
              onClick={() => setEdit(true)}
              className="bg-teal-500 text-white px-2.5 rounded transition ease-in-out duration-200 hover:bg-teal-600 cursor-pointer"
            >
              Edit
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className="bg-red-500 text-white px-2.5 rounded transition ease-in-out duration-200 hover:bg-red-400 cursor-pointer"
            >
              Delete
            </button>
          </div>
          <p
            onClick={() => navigate(`/admin/product/${id}`)}
            className="mt-2.5 mb-1.5 text-[14px] font-medium border border-teal-500 py-1 rounded-[8px] transition-all ease-in-out duration-300 hover:text-white hover:bg-teal-500"
          >
            View Detail
          </p>
          {formError && <p className="text-red-400 text-[14px]">{formError}</p>}
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="text-left transition-all duration-500 ease-in-out"
        >
          <h6 className="font-medium text-[15px] mb-2">Name:</h6>
          <input
            type="text"
            className="w-full mb-2 border border-gray-700 rounded p-2 outline-none text-[14px]"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <h6 className="font-medium text-[15px] mb-2">Price:</h6>
          <input
            type="number"
            className="w-full mb-2 border border-gray-700 rounded p-2 outline-none text-[14px]"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
          <h6 className="font-medium text-[15px] mb-2">Stock:</h6>
          <input
            type="number"
            className="w-full mb-2 border border-gray-700 rounded p-2 outline-none text-[14px]"
            value={data.stock}
            onChange={(e) => setData({ ...data, stock: e.target.value })}
          />
          <h6 className="font-medium text-[15px] mb-2">Category:</h6>
          <select
            className="w-full mb-2 border border-gray-700 rounded p-2 outline-none text-[14px]"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <h6 className="font-medium text-[15px] mb-2">Description:</h6>
          <textarea
            value={data.description}
            className="w-full mb-2 border border-gray-700 rounded p-2 outline-none text-[14px] resize-y min-h-[80px]"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />

          <div className="flex justify-end gap-2 mb-3.5">
            <button
              onClick={() => setEdit(false)}
              className="px-3 py-1 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 bg-teal-500 text-white cursor-pointer transition-all ease-in-out duration-300 rounded hover:bg-teal-600"
            >
              Save
            </button>
          </div>
          {loading && (
            <p className="text-teal-600 text-[15px]">Please wait loading...</p>
          )}
          {error && <p className="text-red-400 text-[14px]">{error}</p>}
        </form>
      )}
    </div>
    </div>
  );
};

export default ProductCard;
