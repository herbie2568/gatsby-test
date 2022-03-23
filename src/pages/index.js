import * as React from "react"
import {useState,useEffect} from 'react';
import { Link } from 'gatsby'
import axios from 'axios'
// markup
const IndexPage = () => {
  const [groceries, setGroceries] = useState([])

 

  useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/groceries')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])

  return (
    <>
    <h1>SUP BIOTCHES</h1>
    <Link to="/about">About</Link>
    {groceries.map((grocery)=>{
      return (
      <>
      <div key = {grocery._id} ></div>
      <div>{grocery.name}</div>
      <img src ={grocery.image}></img>
      <div>{grocery.price}</div>
      <div>{grocery.description}</div>
      
      </>
      )
    })
  }

    </>
  )
}

export default IndexPage
