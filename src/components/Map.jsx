import React, {useState, useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import {useCities} from '../context/CitiesContext';
import {useMap} from 'react-leaflet';
import {useGeolocation} from '../hooks/useGeoLocation'
import Button from '../components/Button'
import {useUrlPosition} from '../hooks/useUrlPosition';

function Map() {  
  const [mapPosition, setMapPosition] = useState([40, 0]);
  
  const {cities} = useCities();
  const {isLoading: isLoadingPosition, position: 
  geolocationPosition, getPosition} = useGeolocation();
 const [mapLat, mapLng] = useUrlPosition();
  

  useEffect(() => {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  return (
    <div className={styles.mapContainer}>
     
  <MapContainer 
  center={mapPosition}
  zoom={8} scrollWheelZoom={true}
  className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city) => (
      <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
   ) )}
  <ChangeCenter position={mapPosition} /> 
  <DetectClick />
  </MapContainer>
    </div>
  )
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}
const DetectClick = () => {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map