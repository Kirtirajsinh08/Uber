import React, { useState, useContext } from 'react';
import { locationContext } from './context';
import {
  MapPin,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from './Navbar';

const DriverDashboard = () => {
  const [activeRideRequests, setActiveRideRequests] = useState([
    { id: 1, user: 'John Doe', pickup: '123 Main St', dropoff: '456 Elm St' },
    { id: 2, user: 'Jane Smith', pickup: '789 Oak Ave', dropoff: '321 Pine Rd' },
    { id: 3, user: 'Michael Brown', pickup: '987 Cedar St', dropoff: '654 Birch Rd' },
    { id: 4, user: 'Emily White', pickup: '159 Spruce St', dropoff: '753 Walnut St' },
    { id: 5, user: 'Chris Green', pickup: '258 Maple St', dropoff: '951 Oak St' },
  ]);

  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);

  const [viewport, setViewport] = useState({
    longitude: -74.006, // Default center longitude
    latitude: 40.7128,  // Default center latitude
    zoom: 12,           // Default zoom level
  });

  const { lon, lat } = useContext(locationContext);

  const handleAccept = (id) => {
    const acceptedRide = activeRideRequests.find((request) => request.id === id);
    setAcceptedRides([...acceptedRides, acceptedRide]);
    setActiveRideRequests(
      activeRideRequests.filter((request) => request.id !== id)
    );
  };

  const handleReject = (id) => {
    const rejectedRide = activeRideRequests.find((request) => request.id === id);
    setRejectedRides([...rejectedRides, rejectedRide]);
    setActiveRideRequests(
      activeRideRequests.filter((request) => request.id !== id)
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Column: Ride Requests */}
        <div className="w-1/3 lg:w-1/4 bg-white shadow-lg p-4 border-r border-gray-200 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">Ride Requests</h1>
          {activeRideRequests.map((request) => (
            <div
              key={request.id}
              className="bg-gray-50 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
            >
              <p className="font-medium text-black text-lg">{request.user}</p>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span className="truncate">{request.pickup}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <ChevronRight size={16} className="mr-2 flex-shrink-0" />
                <span className="truncate">{request.dropoff}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-end mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <XCircle size={18} className="mr-2" />
                  Reject
                </button>
              </div>
            </div>
          ))}

          {/* Accepted Rides Section */}
          {acceptedRides.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-6 text-black">Accepted Rides</h2>
              {acceptedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-green-50 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
                >
                  <p className="font-medium text-black text-lg">{ride.user}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{ride.pickup}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ChevronRight size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{ride.dropoff}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Rejected Rides Section */}
          {rejectedRides.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-6 text-black">Rejected Rides</h2>
              {rejectedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-red-50 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
                >
                  <p className="font-medium text-black text-lg">{ride.user}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{ride.pickup}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ChevronRight size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{ride.dropoff}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Column: Map */}
        <div className="flex-1 bg-white shadow-lg p-4 border-gray-200">
          <div className="h-full">
            {lat === 0 && lon === 0 ? <></> : (
              <Map
                initialViewState={{ longitude: lon, latitude: lat, zoom: 12 }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1Ijoia2lydGlyYWowOCIsImEiOiJjbTEzNTFnMmkwdGVqMnJyNXZ3Z24zeG5nIn0.g2tqmDepmvxeKQlFeQrijA"
              >
                <Marker longitude={lon} latitude={lat} anchor="bottom">
                  <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"></path>
                  </svg>
                </Marker>
              </Map>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
