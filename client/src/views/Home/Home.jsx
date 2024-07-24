import Footer from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"
import Aanpak from "./componets/Aanpak"
import Banner from "./componets/Banner"
import Contact from "./componets/Contact"

import '../../styles/normalize.css'
import '../../styles/webflow.css'
import '../../styles/tims.css'
import '../../styles/landing-main.css'
// import './styles/common.css'

import Voordelen from "./componets/Voordelen"
import Ervaringen from "./componets/Ervaringen"
import Faq from "./componets/Faq"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    AOS.init({
      // once: true,
      duration: 800,
      offset: 400, // Adjust this value to control the starting position
      easing: "ease-in-out",
    })
    AOS.refresh();
  }, [])

  return (
    <div style={{ background: 'white' }}>

      <Navbar />

      <Banner />

      <Aanpak />

      <Voordelen />

      <Ervaringen />

      <Faq />

      <Contact />

      <Footer />
    </div>
  )
}

export default Home