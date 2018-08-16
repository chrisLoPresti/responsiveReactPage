import React from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import LandingPage from './LandingPage/LandingPage';
import InfoDivider from './InfoDivider/InfoDivider';
import AboutUs from './AboutUs/AboutUs';
import Juices from './Juices/Juices';
import Devices from './Devices/Devices';
import Location from './Location/Location';
import Contact from './Contact/Contact';

const App = () => (
    <div>
        <NavigationBar/>
        <LandingPage/>
        <InfoDivider/>
        <AboutUs/>
        <Juices/>
        <Devices/>
        <Location/>
        <Contact/>
    </div>
);

export default App;