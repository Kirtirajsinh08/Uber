import React, { useState, useEffect, useCallback, useContext } from "react";
import { hamburgerContext, authenticatedContext } from './context';
import SearchLocation from "./SearchLocation";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


const MainComponent = () => {
  const navigator = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {authenticated, setAuthenticated} = useContext(authenticatedContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [rentalFormData, setRentalFormData] = useState({
    ownerName: '',
    carName: '',
    boughtYear: '',
    insurancePolicy: null,
    driverLicense: null,
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleRentalFormChange = (e) => {
    const { name, value, files } = e.target;
    setRentalFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRentalSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log("Rental form submitted:", rentalFormData);
    // Reset form and close modal
    setRentalFormData({
      ownerName: '',
      carName: '',
      boughtYear: '',
      insurancePolicy: null,
      driverLicense: null,
    });
    setIsRentalModalOpen(false);
    alert("Thank you for submitting your car rental details!");
  };


    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout = async() => {
      try {
      await axios.post('http://localhost:8000/logout/')
      setAuthenticated(false)
      navigate("/")
      }catch(e){
        console.log(e)
      }
    };
  

  const images = [
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png",
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_450,w_450/v1689609697/assets/b8/c39de0-6e13-485b-ba45-66511170c62a/original/SS_Commuter.jpg",
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_450,w_450/v1692743834/assets/54/f60161-cf6b-4401-a309-8bb196c0014c/original/U_CoastalCalifornia_White_Final-%281%29.jpg"
  ];

  const features = [
    {
      title: "Safety First",
      description: "Our drivers are fully trained and follow safety protocols to ensure your peace of mind.",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_450,w_450/v1689609697/assets/b8/c39de0-6e13-485b-ba45-66511170c62a/original/SS_Commuter.jpg"
    },
    {
      title: "Affordable Pricing",
      description: "We offer competitive rates without compromising on the quality of service.",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_450,w_450/v1692743834/assets/54/f60161-cf6b-4401-a309-8bb196c0014c/original/U_CoastalCalifornia_White_Final-%281%29.jpg"
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available round the clock to assist you with any queries.",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png"
    },
    {
      title: "Eco-Friendly Options",
      description: "Choose from a range of electric and hybrid vehicles to reduce your carbon footprint.",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png"
    },
    {
      title: "Loyalty Rewards",
      description: "Earn points on every ride and redeem them for discounts and free trips.",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg"
    }
  ];

  const nextFeature = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  }, [features.length]);

  const prevFeature = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  }, [features.length]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    const featureInterval = setInterval(nextFeature, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(featureInterval);
    };
  }, [nextFeature]);

  // Create an array of features that will be displayed, ensuring continuous looping
  const displayFeatures = [...features.slice(currentIndex), ...features.slice(0, currentIndex)];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex items-center w-full text-left p-8">
        <div className="mb-8 flex-1 ms-32">
          <h1 className="text-5xl leading-normal font-bold mb-4">
            Hassle Free Travel<br /> A Few Clicks Away
          </h1>
          <p className="text-xl leading-5 text-gray-600 mb-6">
            Quick, reliable, and affordable cab service just a tap away.
          </p>
          <button className="bg-red-900 text-white px-6 py-1 rounded-md text-lg font-semibold mr-4 hover:bg-red-600  transition duration-300" onClick={() => navigator("/login")}>
                Login
          </button>

          <button className="bg-red-900 text-white px-6 py-1 rounded-md text-lg font-semibold mr-4 hover:bg-red-600  transition duration-300" onClick={() => navigator("/signup")}>
                Signup
          </button>
        </div>
        <div className="flex-1 relative h-[450px] w-full max-w-xl mx-auto me-32">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Cab Booking ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </section>


      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ride Suggestion */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ride</h3>
                <p className="text-gray-600 mb-4">Go anywhere with Uber. Request a ride, hop in, and go.</p>
                <button className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-600 " onClick={()=> navigate('/login')}>Details</button>
              </div>
              <div className="flex items-center justify-center h-32">
                <img src="https://i.pinimg.com/originals/79/80/c3/7980c3bf6882d85ff885d3f79d42c4f7.png" alt="Car" className="h-32" />
              </div>
            </div>

            {/* Package Suggestion */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Package</h3>
                <p className="text-gray-600 mb-4">Uber Connect makes same-day delivery easier than ever.</p>
                <button className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-600 ">Details</button>
              </div>
              <div className="flex items-center justify-center h-32">
                <img src="https://img.freepik.com/premium-vector/parcel-box-icon-isometric-parcel-box-vector-icon-web-design-isolated-white-background_96318-47435.jpg" alt="Package" className="h-32" />
              </div>
            </div>

            {/* Reserve Suggestion */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Reserve</h3>
                <p className="text-gray-600 mb-4">Reserve your ride in advance so you can relax on the day of your trip.</p>
                <button className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-600 ">Details</button>
              </div>
              <div className="flex items-center justify-center h-32">
                <img src="https://img.freepik.com/premium-vector/calendar-deadline-with-clock-flat-design_115464-601.jpg" alt="Calendar" className="h-32" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="mt-16 p-8 text-center w-full">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us?</h2>
        <div className="relative max-w-6xl mx-auto">
          <button 
            onClick={prevFeature} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextFeature} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(100 / 3)}%)` }}
            >
              {displayFeatures.map((feature, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full max-w-xs mx-auto mb-4 rounded-lg shadow-md"
                  />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-1/2 pr-8">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_558/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png"
              alt="Driver in car"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2 pl-8">
            <h2 className="text-5xl font-bold mb-4">Drive when you want, make what you need</h2>
            <p className="text-xl text-gray-600 mb-6">
              Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.
            </p>
            <div className="flex items-center">
              <button className="px-6 py-3 rounded-md text-lg font-semibold mr-4 bg-red-900 text-white hover:bg-red-600  transition duration-300" onClick={() => navigator("/login")}>
                Get started
              </button>
              <a href="#" className="text-red-900 text-lg font-semibold hover:underline" onClick={() => navigator("/login")}>
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-1/2 pr-8">
            <h1 className="text-5xl font-bold mb-4">Make Money by renting out your car</h1>
            <p className="text-xl text-gray-600 mb-6">
              Connect with thousands of drivers and earn more per week with Uber's free fleet management tools.
            </p>
            <div className="flex items-center">
              <button
                className="px-6 py-3 rounded-md text-lg font-semibold mr-4 bg-red-900 text-white hover:bg-red-600 transition duration-300"
                onClick={() => setIsRentalModalOpen(true)}
              >
                RENT NOW
              </button>
            </div>
          </div>
          <div className="w-1/2 pr-8">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg"
              alt="Driver in car"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full text-center mb-8 p-8 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">Ready to Ride?</h2>
        <p className="text-xl text-gray-600 mb-8">Get to your destination safely and on time with our easy-to-use app.</p>
        <button className="px-8 py-4 text-xl font-bold rounded-lg shadow-md bg-red-900 text-white hover:bg-red-600 transition duration-300" onClick={() => navigator("/login")}>
          Book a Ride Now
        </button>
      </section>

      <Modal isOpen={isRentalModalOpen} onClose={() => setIsRentalModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Rent Out Your Car</h2>
        <form onSubmit={handleRentalSubmit}>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Car Owner Name</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={rentalFormData.ownerName}
              onChange={handleRentalFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="carName" className="block text-sm font-medium text-gray-700">Car Name</label>
            <input
              type="text"
              id="carName"
              name="carName"
              value={rentalFormData.carName}
              onChange={handleRentalFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="boughtYear" className="block text-sm font-medium text-gray-700">Bought Year</label>
            <select
              id="boughtYear"
              name="boughtYear"
              value={rentalFormData.boughtYear}
              onChange={handleRentalFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="insurancePolicy" className="block text-sm font-medium text-gray-700">Insurance Policy (PDF)</label>
            <input
              type="file"
              id="insurancePolicy"
              name="insurancePolicy"
              onChange={handleRentalFormChange}
              className="mt-1 block w-full"
              accept="application/pdf"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">Driver's License (PDF)</label>
            <input
              type="file"
              id="driverLicense"
              name="driverLicense"
              onChange={handleRentalFormChange}
              className="mt-1 block w-full"
              accept="application/pdf"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsRentalModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MainComponent;