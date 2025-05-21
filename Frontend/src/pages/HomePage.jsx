// src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import HomeIntro from '../components/HomeIntro';
import ServicesIntro from '../components/ServicesIntro';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSearch  />   
      <HomeIntro />
      <ServicesIntro />
      <Footer />
    </>
  );
}
