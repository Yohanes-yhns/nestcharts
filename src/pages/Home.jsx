import React from "react";
import Navbar from "../components/Navbar";
import Tagline from "../components/Tagline";
import Benefit from "../components/Benefit";
import Explore from "../components/Explore";
import ChartsContainer from "../components/Charts/ChartsContainer";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Tagline />
      <Benefit />
      <Explore />
      <ChartsContainer chartsToShow={["linechartbasic", "area", "column"]} />
      <ChartsContainer chartsToShow={["bar", "pie", "radial"]} />
      <Footer />
    </>
  );
}

export default Home;
