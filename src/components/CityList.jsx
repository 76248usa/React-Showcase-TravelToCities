import React from 'react'
import styles from './CityList.module.css'
import Spinner from '../components/Spinner';
import CityItem from './CityItem';
import Message from '../components/Message'

function CityList({isLoading, cities}) {
  if(isLoading) {
    return <Spinner />
  }
  if(!cities.length){return <Message message='Add a city by clicking on the map'/>}

  return (
    <ul className={styles.cityList}>
        {cities.map((city) => {
          return <CityItem city={city} key={city.id} />
        })}
    </ul>
  )
}

export default CityList



  
