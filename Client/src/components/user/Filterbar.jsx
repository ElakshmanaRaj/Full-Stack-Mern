import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice";

const Filterbar = ({ select, setSelect, maxPrice, minPrice, priceRange, setPriceRange, sort, setSort }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.categories);
  

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCheck = (id) => {
    if (select.includes(id)) {
      setSelect(select.filter((s) => s !== id));
    } else {
      setSelect([...select, id]);
    }
  };

  return (
    <div className="w-60 bg-white sticky top-8 z-10 min-h-screen p-5 min-[1000px]:p-8">
      <h5 className="font-semibold mb-3">Apply Filters</h5>
      {error && <p className="text-red-400 text-[14px] my-2.5">{error}</p>}
      {loading && <p className="text-gray-500 text-[14px] my-2.5">{loading}</p>}
      <div>
        <h5 className="text-gray-600">Categories</h5>
        {items.length > 0 ? (
          <ul className="space-y-3 mt-3">
            {items.map((i) => (
              <li key={i._id}>
                <label className="flex items-center gap-2.5 cursor-pointer text-[15px]">
                  <input
                    type="checkbox"
                    checked={select.includes(i._id)}
                    onChange={() => handleCheck(i._id)}
                    className="cursor-pointer accent-blue-600"
                  />
                  {i.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[14px] text-gray-600 my-2">No Category Found</p>
        )}
      </div>
      <div className="mt-3.5">
        <h5 className="text-gray-600">Price Range</h5>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e)=> setPriceRange([minPrice, parseInt(e.target.value)])}
          className="mt-2.5 w-full cursor-pointer accent-emerald-400 border-none outline-none bg-transparent"
        />
        <div className="flex mt-2.5 items-center justify-between">
          <span>₹ {priceRange[0]}</span>
          <span>₹ {priceRange[1]}</span>
        </div>
      </div>
      <div className="mt-3.5">
        <h5 className="text-gray-600">Sort By Price</h5>
        <select 
        className="mt-2.5 w-full cursor-pointer p-2 border border-emerald-300 rounded-md text-sm outline-none"
        value={sort}
        onChange={(e)=> setSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filterbar;
