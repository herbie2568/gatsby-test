import * as React from "react"
import {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Add from './Add'
import Edit from './Edit'
// import {Planet} from './model'


const PlanetPage: React.FC = (props:any) => {
  const [planets, setPlanets] = useState<[]>([])

  
  useEffect(()=>{
    axios
    .get('https://space-meteor.herokuapp.com/planets')
    .then((response:any)=>{
      setPlanets(response.data);
    })
  }, [])

  const handleDelete = (planetData:any)=>{
        axios
        .delete(`https://space-meteor.herokuapp.com/planets/${planetData._id}`)
          .then(()=>{
            axios
            .get('https://space-meteor.herokuapp.com/planets/')
            .then((response)=>{
              setPlanets(response.data)
            })
          })
        }

        const handleUpdate = (editPlanet:any) => {
          console.log(editPlanet)
          axios
            .put('https://space-meteor.herokuapp.com/planets/' + editPlanet.id, editPlanet)
            .then((response) => {
              setPlanets(response.data)
            })
        }

  return (
    <>
    <h1>TRAVEL TO THE PLANETS!</h1>
    <Add />
    <div className = 'planetContainer'>
    {planets?.map((planet:any)=>{ 
      return (
      <>
      <div className = 'planetCard'>
      <div key = {planet._id} ></div>
      <img src ={planet.image}></img>
      <h3>{planet.name}</h3>
      <div>{planet.description}</div>
      <h4>Year discovered: {planet.date_found}</h4>
      <h4>Ticket price: ${planet.ticket_price}</h4>
      <h4>Featured activity: {planet.activity}</h4>
      <Edit handleUpdate={handleUpdate} id={planet._id}/>
      <button onClick = {(event) => {handleDelete(planet)}} >delete</button>
      </div>
      
      </>
      )
    })
  }
  </div>

    </>
  )
}

export default PlanetPage;
