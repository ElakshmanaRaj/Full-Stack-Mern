import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";

const AddProduct = () => {
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [formErr, setFormErr] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

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

  const addProduct = async (e) => {
    e.preventDefault();

    const product = new FormData();
    product.append("name", data.name);
    product.append("description", data.description);
    product.append("category", data.category);
    product.append("price", data.price);
    product.append("stock", data.stock);
    if (data.images && data.images.length > 0) {
      data.images.forEach((img) => {
        product.append("images", img);
      });
    }

    try {
      setFormErr(null);
      await axios.post(BASE_URL + API_PATHS.PRODUCT.CREATE_PRODUCT, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData({name:"", description:"", category:"", price:"", stock:"", images:null});
    } catch (err) {
      if (err.response && err.response.data.message) {
        setFormErr(err.response.data.message);
      } else {
        setFormErr("Something went wrong, Please try again later");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="lg:pl-72 lg:my-5 p-5">
        <h2 className="text-xl font-semibold mb-3">Add Products</h2>
        <form
          className="mt-5 mb-2 flex flex-col space-y-5"
          onSubmit={addProduct}
        >
          <div>
            <input
              type="text"
              value={data.name}
              placeholder="Product name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            />
          </div>
          <div>
            <input
              type="text"
              value={data.description}
              placeholder="Product description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            />
          </div>
          <div>
            <select
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            >
              <option value="" disabled>
                Select Category
              </option>
              {category.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {error && <p className="text-red-400 text-[14px]">{error}</p>}
          </div>

          <div>
            <input
              type="text"
              value={data.price}
              placeholder="Price"
              onChange={(e) => setData({ ...data, price: e.target.value })}
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            />
          </div>
          <div>
            <input
              type="text"
              value={data.stock}
              placeholder="Stock"
              onChange={(e) => setData({ ...data, stock: e.target.value })}
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            />
          </div>

          {/* Image Upload Input */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setData({ ...data, images: files });
              }}
              className="border border-gray-700 rounded p-2 outline-none text-[14px]"
            />
          </div>
          {/* Preview Multiple Images */}
          {data.images && data.images.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {data.images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index + 1}`}
                  className="w-28 h-28 object-contain rounded-full border"
                />
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="bg-purple-500 px-3.5 py-0.5 cursor-pointer rounded text-white hover:bg-purple-600 transition-all ease-in-out duration-200"
            >
              Add
            </button>
          </div>
        </form>
        {formErr && <p className="text-red-400 text-[14px]">{formErr}</p>}
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
