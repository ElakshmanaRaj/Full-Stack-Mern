import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${API_PATHS.PRODUCT.GET_PRODUCT_BY_ID(id)}`);
      setProduct(res.data);
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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-5 lg:pl-72 lg:my-5">
        {error && <p className="text-red-400 text-[14px] mb-1.5">{error}</p>}

        {loading ? (
          <p className="text-gray-500">Loading product details...</p>
        ) : product ? (
          <div className="mt-2.5 flex flex-col gap-10">
            <div className="flex flex-wrap gap-8 items-end">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-64 h-64 object-contain mb-3 rounded cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
                />
              )}
              <div className="flex flex-wrap gap-5">
                {product.images &&
                  product.images
                    .slice(1)
                    .map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} ${index + 2}`}
                        className="w-[100px] h-[100px] object-contain rounded cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
                      />
                    ))}
              </div>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-2">{product.name}</h5>
              <p className=" text-gray-700 text-[14px] mb-2.5">
                {product.description}
              </p>
              <p className="text-purple-700 font-bold mb-2">
                Price: ₹ {Math.round(product.price)}
              </p>
              <p className="font-medium text-slate-800 capitalize mb-3">
                Category: &nbsp;{product.category?.name}
              </p>
              <p className="text-slate-600 font-medium mb-1.5">
                Stock: {product.stock}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No product found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductDetail;
