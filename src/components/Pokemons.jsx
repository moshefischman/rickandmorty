import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const Pokemons = () => {
    
  const [pokemons, setPokemons] = useState([])
  const [orderlist, setOrderList] = useState('Ascending')
  const [strsearch, setStrSearch] = useState('')
  
    useEffect(() => {

      const getPokemons = async() => {
        try {
          const res = await fetch('https://pokeapi.co/api/v2/pokemon')
          const data = await res.json()
          let arrayPokes = data.results
          
          arrayPokes = arrayPokes.sort((a, b) => (a.name > b.name) ? 1 : -1) //First time ascending

          setPokemons(arrayPokes)
        } catch(error) {
          console.log(error)
        }
      }
      
      getPokemons()
  
    }, [])

    //FOR USE IN CASE WE WANT TO STORE THE ORDER LOCALLY
    // const storeDBOrder = (theorder) =>{
    //   localStorage.setItem('myorder', JSON.stringify(orderlist)); 
    // }
  
    // const readDBOrder = () => {
    //   return JSON.parse(localStorage.getItem('myorder'));
    // }

    const ChangeOrder = () => {
      //console.log(orderlist);
      let arrayPokes = pokemons
      if (orderlist === 'Ascending') {
        setOrderList('Descending')
        arrayPokes = arrayPokes.sort((a, b) => (a.name < b.name) ? 1 : -1)
      } else {
        setOrderList('Ascending')
        arrayPokes = arrayPokes.sort((a, b) => (a.name > b.name) ? 1 : -1)
      }
      setPokemons(arrayPokes)

    }

    //TO DO: 
    //PAGINATION: https://pokeapi.co/api/v2/pokemon?offset=10&limit=10
    //Check "next" and "previous" properties

    return (
        <div>
            <div className="mb-3">
            Order is {orderlist} - <button className="btn btn-secondary" onClick={() =>ChangeOrder()}>Change</button>
            </div>
            <div className="mb-3">
              Search by: &nbsp;
              <input type="text" placeholder="Search.." value={strsearch}  onChange={(e)=>setStrSearch(e.target.value)} /> &nbsp;
            </div>
           <ul>
                {
                pokemons.filter( (obj) => 
                  strsearch === '' ? obj : obj.name.toLowerCase().includes(strsearch.toLowerCase()) 
                ).map(objPoke => (
                
                    <li key={objPoke.name}>
                      <Link to={`/pokecard/${objPoke.name}`}>
                                {objPoke.name} 
                        </Link>
                    </li>
                
                ))
                }
            </ul>
        </div>
        
    )
}

export default Pokemons
