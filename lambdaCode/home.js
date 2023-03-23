import React from "react";
import Navbar from "./component/Navbar";
import Banner from "./component/Banner/Banner";
import Portfolio from "./component/Portfolio";
import About from "./component/About";
import Education from "./component/Education/Education";
import Testimonial from "./component/Testimonial/Testimonial";
import Blog from "./component/Blog/Blog";
import Contact from "./component/Contact";
import HighlightedSkills from "./component/Skills/HighlightedSkills";
import Skills from "./component/Skills/Skills";
import MapContainer from "./component/Map";
import Footer from "./component/Footer";
import data from "./component/data";

export const Home = () => (
  <div className="body_wrapper">
    <Navbar
      mClass="menu_two"
      mainlogo="logo-blue.png"
      stickylogo="logo-blue.png"
    />
    <Banner />
    <About rowFlex="flex-row-reverse" />
    <Portfolio />
    <HighlightedSkills />
    <Skills cClass="bg_w" />
    <Education />
    <Testimonial />
    <Blog />
    <MapContainer />
    <Contact />
    <Footer data={data} />
  </div>
);
