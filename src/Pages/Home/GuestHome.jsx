import React from "react";
import AboutSection from "../../Components/AboutSection";
import PackageList from "../../Components/PackageList";
import Slider from "../../Components/Slider";

const GuestHome = () => {
  return (
    <div>
      <div className="my-4 space-y-6">
        <Slider></Slider>
        <AboutSection></AboutSection>
        <PackageList></PackageList>
      </div>
    </div>
  );
};

export default GuestHome;
