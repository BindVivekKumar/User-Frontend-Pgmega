import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from "../components/wishlist.jsx";
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { toast } from "react-toastify";
import { useGetAllListedPgQuery } from "../Bothfeatures/features/api/allpg.js";
import { useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";

export default function LandingPage() {

  const navigate = useNavigate();
  const { data: wishlistData } = useGetWishlistQuery();
  const { data: pgApiData, isLoading } = useGetAllListedPgQuery();

  const [pgData, setPgData] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (pgApiData?.allrooms) setPgData(pgApiData.allrooms);
    if (wishlistData?.data) {
      const ids = wishlistData.data.map(item => item.pgId);
      setWishlistIds(ids);
    }
  }, [pgApiData, wishlistData]);


  const handleFindPG = () => {
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name or location');
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  function Loader() {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ---------------------------------------------------- */}
      {/* 🔥 FULL WIDTH HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt="Room"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
            Find Your Perfect Stay
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-white/80 font-medium">
            Safe • Comfortable • Affordable — Just Like Home
          </p>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-xl sm:max-w-2xl">
            <div className="flex items-center bg-white/15 px-4 py-3 rounded-full backdrop-blur-lg border border-white/20 shadow-lg">
              <input
                type="text"
                placeholder="Search by city, landmark or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFindPG()}
                className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-base"
              />

              <button
                onClick={handleFindPG}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-full text-sm sm:text-lg transition shadow-lg"
              >
                Search
              </button>
            </div>

            {searchError && (
              <p className="text-red-300 text-sm mt-2">{searchError}</p>
            )}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------- */}
      {/* PG LISTING SECTION */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        <h2 className="text-3xl font-bold mb-8 text-gray-900">Available Rooms & PGs</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {pgData.length > 0 ? pgData.map((pg) => (
              <div
                key={pg._id}
                onClick={() => navigate(`/pg/${pg._id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-52">
                  <img
                    src={pg?.roomImages?.[0]}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className="absolute top-3 right-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WishlistButton pg={pg} onAuthOpen={() => setIsAuthModalOpen(true)} />
                  </div>

                  <span className="absolute bottom-3 left-3 bg-black/60 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    {pg?.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{pg?.branch?.name} – Room {pg?.roomNumber}</h3>

                  <p className="text-gray-500 text-sm">📍 {pg?.branch?.address}</p>

                  <p className={`text-xs font-semibold ${pg.verified ? 'text-green-600' : 'text-red-500'}`}>
                    {pg.verified ? '✔ Verified Host' : '⛔ Not Verified'}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-bold text-gray-900">
                      {pg.category === "Pg" ||
                      pg.category === "Rented-Room"
                        ? `₹${pg.price}/month`
                        : `₹${pg.rentperNight}/night`}
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center col-span-full text-gray-500">No Rooms Available</p>
            )}

          </div>
        )}
      </div>


      {/* ---------------------------------------------------- */}
      {/* POPULAR CITIES */}
      {/* ---------------------------------------------------- */}
      <section className="w-full py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-center">

        <h2 className="text-3xl font-bold mb-3">Rooms in Popular Cities</h2>
        <p className="text-gray-600 mb-10">Choose your city and discover the best rooms near you.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {["Delhi", "Noida", "Gurgaon", "Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai"].map(city => (
            <button
              key={city}
              onClick={() => toast.success(`We are coming soon in ${city}`)}
              className="bg-white shadow-md rounded-xl py-4 text-sm font-semibold hover:shadow-xl transition"
            >
              {city}
            </button>
          ))}
        </div>
      </section>


      {/* GAP BEFORE FOOTER FOR CLEAN LOOK */}
      <div className="h-10"></div>

      <Footer />

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}
