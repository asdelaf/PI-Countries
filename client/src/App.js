import './App.css';
import Home from './components/Home/home';
import { Route, Routes } from "react-router-dom";
import DetailsCountry from './components/DetailsCountry/detailsCountry';
import AddActivity from './components/AddActivity/addActivity';
import LandingPage from './components/LandingPage/landingPage'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/countries/:id' element={<DetailsCountry/>}/>
        <Route path='/addactivity' element={<AddActivity/>}/>
      </Routes>
      <p class='footer'>Countries App by Andres Sanchez de la Fuente</p>
    </div>
  );
}

export default App;

