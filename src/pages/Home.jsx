import React from "react";
import Navbar from "../components/Navbar";
import Tagline from "../components/Tagline";
import Input from "../components/Input";
import Benefit from "../components/Benefit";
import Explore from "../components/Explore";
import ChartsContainer from "../components/Charts/ChartsContainer";

function Home() {
  return (
    <>
      <Navbar />
      <Tagline />
      <Input />
      <Benefit />
      <Explore />
      <ChartsContainer chartsToShow={["linechartbasic", "area", "column"]} />
      <ChartsContainer chartsToShow={["bar", "pie", "radial"]} />
    </>
  );
}

export default Home;
