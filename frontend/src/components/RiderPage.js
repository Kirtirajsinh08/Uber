import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import SearchLocation from './SearchLocation';
import MapBox from './MapBox';
import { hamburgerContext, sourceId, destinationId, plotOnMap, source, destination, distanceContext } from './context';
import Hamburger from './Hamburger';
import { authenticatedContext } from './context';
import NotFound from './Notfound';
import CabOptions from './CabOptions';
import { locationContext } from './context'; // Import locationContext

function RiderPage() {

  const { authenticated, setAuthenticated } = useContext(authenticatedContext);
  const { lon, lat } = useContext(locationContext); // Accessing lon and lat from context
  const [hamopen, setham] = useState(false);

  const [sourceMapboxId, setSourceMapboxId] = useState("");
  const [destinationMapboxId, setDestinationMapboxId] = useState("");
  const [plot, setPlot] = useState(false);
  const [distance, setDistance] = useState(-1);
  const [sourceCoordinates, setSourceCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const getCoordinates = async (id, set) => {
    const res = await fetch(`http://localhost:8000/getCoordinates/?id=${id}`);
    const result = await res.json();
    set({ "latitude": result.coordinates.latitude, "longitude": result.coordinates.longitude });
  };

  useEffect(() => {
    if (plot) {
      getCoordinates(sourceMapboxId, setSourceCoordinates);
      getCoordinates(destinationMapboxId, setDestinationCoordinates);
      console.log(sourceCoordinates);
      console.log(destinationCoordinates);
    }
  }, [plot]);

  return (
    <>
    { authenticated ?
      <distanceContext.Provider value={{ distance, setDistance }}>
        <sourceId.Provider value={{ sourceMapboxId, setSourceMapboxId }}>
          <destinationId.Provider value={{ destinationMapboxId, setDestinationMapboxId }}>
            <plotOnMap.Provider value={{ plot, setPlot }}>
              <hamburgerContext.Provider value={{ hamopen, setham }}>
                <div className={`${hamopen ? "backdrop-blur-md blur md:blur-none" : ""} h-[100vh] bg-[#FFFFFF] transition-opacity`}>
                  <Navbar />
                  <div className='h-fit grid grid-cols-[24rem_auto] grid-rows-[16rem_auto] pt-4 px-4 gap-x-5'>
                    <div className='place-content-center'>
                      <SearchLocation />
                    </div>
                    <destination.Provider value={destinationCoordinates}>
                      <source.Provider value={sourceCoordinates}>
                        <div className='row-span-2 place-content-center'>
                          <MapBox />
                        </div>
                        <CabOptions distance={distance} />
                      </source.Provider>
                    </destination.Provider>
                  </div>
                </div>
                <Hamburger />
              </hamburgerContext.Provider>
            </plotOnMap.Provider>
          </destinationId.Provider>
        </sourceId.Provider>
      </distanceContext.Provider>
      : <NotFound />}
    </> 
  );
}

export default RiderPage;
