import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './components/CityList'
//import data from '../data/cities.json';

const BASE_URL = "http://localhost:8000";
     
     function App() {
      const [cities, setCities] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

    useEffect(function(){
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch {
          alert('There was an error');
        } finally{
          setIsLoading(false);
        }
      }
      fetchCities();
    }, []);

       return ( 
         <BrowserRouter>
         <Routes>
         <Route path='/' element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
              <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
              <Route path = 'cities' element={<CityList 
              cities={cities} isLoading={isLoading} />} />
              <Route path='countries' element={<p>List of Countries</p>} />
              <Route path='form' element={<p>Form</p>} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
         </Routes>
         </BrowserRouter>
        
       )
     }
     
     export default App