import Footer from "./Footer";
import Navbar from "./Navbar";
import Hero from './MainComponent'
import { useEffect } from "react";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage;
