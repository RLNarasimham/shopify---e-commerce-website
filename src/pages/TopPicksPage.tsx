// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { useNavigate } from "react-router-dom";

// const TopPicksPage: React.FC = () => {
//   const favorites = useSelector((state: RootState) => state.favorites.items); // adjust this based on your favorites slice
//   const navigate = useNavigate();

//   if (favorites.length === 0) {
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-300 mt-10">
//         No favorites added yet.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
//         Your Favorites
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {favorites.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
//             onClick={() => navigate(`/product/${product.id}`)}
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-40 object-contain mb-4"
//             />
//             <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
//               {product.title}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               ${product.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopPicksPage;

import React from "react";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

const TopPicksPage: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const navigate = useNavigate();

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
          No favorites added yet.
        </h2>
        <p className="mt-2 text-gray-400 dark:text-gray-500 text-sm">
          Tap the Save icon on any product to add it to your Top Picks.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Your Top Picks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => navigate(`/product/${product.id}`)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                navigate(`/product/${product.id}`);
            }}
            role="button"
            aria-label={`View details for ${product.title}`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-base text-blue-600 dark:text-blue-400 font-medium mt-2">
              ₹{product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksPage;
