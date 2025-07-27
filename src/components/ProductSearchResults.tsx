// import React from "react";
// import { useAppSelector } from "../store";
// import { selectFilteredProducts } from "../store/slices/productsSlice";
// import { Link } from "react-router-dom";

// const ProductSearchResults: React.FC = () => {
//   const results = useAppSelector(selectFilteredProducts);

//   if (results.length === 0)
//     return <p className="text-gray-500 mt-4">No products found.</p>;

//   return (
//     <ul className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
//       {results.map((product) => (
//         <li
//           key={product.id}
//           className="border p-3 rounded hover:shadow-md transition"
//         >
//           <Link to={`/product/${product.id}`}>
//             <img
//               src={product.image}
//               alt={product.name}
//               className="h-32 object-contain mx-auto"
//             />
//             <p className="mt-2 font-medium text-center">{product.name}</p>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ProductSearchResults;

import React from "react";
import { useAppSelector } from "../store";
import { selectFilteredProducts } from "../store/slices/productsSlice";

const ProductSearchResults: React.FC = () => {
  const results = useAppSelector(selectFilteredProducts);

  if (results.length === 0)
    return <p className="text-gray-500 mt-4 text-center">No products found.</p>;

  return (
    <ul className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {results.map((product) => (
        <li
          key={product.id}
          className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition"
        >
          <div className="block cursor-pointer">
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-full object-contain mb-3"
            />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {product.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              {product.category}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium mt-2">
              ₹{product.price}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductSearchResults;
