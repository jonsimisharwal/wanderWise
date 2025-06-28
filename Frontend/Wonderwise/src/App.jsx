import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelNavbar from './Traveler/TravelNavbar'
import TravelFooter from './Traveler/TravelFooter'
import StartJourney from './Traveler/StartJourney';
import Places from './Traveler/FindPlaces';
import TravelTales from './Traveler/TravelTales';
import BookRequestPage from './Traveler/Bookrequestpage';
import TripPlanner from './Traveler/Plantrip';

import './App.css'
import MyAdventures from './Traveler/MyAdventures';



function App() {
  return (
    <Router>
    
      <TravelNavbar />
      <Routes>
  
  <Route path="/" element={<>
    <StartJourney />
    <TravelFooter />
    </>
  } />
  <Route path="/TravelBlogs"element={<><TravelFooter />
    </>} />
  <Route path="/MyAdventures"element={<><MyAdventures/><TravelFooter />
    </>} />
  <Route path="/FindPlaces" element={<><Places /><TravelFooter />
    </>} />

  <Route path="/TravelTales" element={<>
    <TravelTales/><TravelFooter /></>}/>
  <Route path='/contact' element={
       <div className='mt-14'>
      < TravelFooter/>
      </div>

  }></Route>
   <Route path="/bookrequest" element={<><BookRequestPage /><TravelFooter /> </>}/>
   <Route path="/tripplanner" element={<><TripPlanner /><TravelFooter />
    </>} />
</Routes>
       
     
    </Router>
  )
}
export default App