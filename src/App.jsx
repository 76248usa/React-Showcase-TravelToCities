import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form';
import { CitiesProvider } from './context/CitiesContext'
//import data from '../data/cities.json';
     
function App() {
  
       return ( 
        <CitiesProvider>
          <BrowserRouter>
         <Routes>
         <Route path='/' element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
              <Route index replace element={<Navigate to='cities' /> } />
              <Route path = 'cities' element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path='countries' element={<CountryList  />} />
              <Route path='form' element={<Form />} />
          </Route>
          
          <Route path='*' element={<PageNotFound />} />
         </Routes>
         </BrowserRouter>     

        </CitiesProvider>
            
       )
     }
     
     export default App
