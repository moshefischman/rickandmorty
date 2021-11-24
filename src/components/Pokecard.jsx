import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'

const Pokecard = () => {

    const {parname} = useParams()
    //console.log(parname)

    const [poke, setPoke] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${parname}`)
            const thePoke = await data.json()
            //console.log(thePoke, thePoke.sprites.back_default)
            setPoke(thePoke)
        }
        getData()
    },[parname])


    return (
        <div>
            <h3>{poke.name}</h3>
            {poke.sprites &&
                (
                    <img src={poke.sprites.back_default} alt={poke.name} />
                )
            }
            
            {poke.types &&
                (
                    <div>
                        Types
                        <ul>
                        {
                        poke.types.map(objType => (
                        
                            <li key={objType.slot}>
                                {objType.type.name} 
                            </li>
                        
                        ))
                        }
                        </ul>
                    </div>
                )
            }
            
        </div>
    )
}

export default Pokecard
