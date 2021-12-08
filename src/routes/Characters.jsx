import {useState, useEffect} from 'react';
import { useDebounce } from 'use-debounce'
import { Modal } from "react-bootstrap";
import '../styles/custom.css'


const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [previous, setPrevious] = useState(null)
    const [next, setNext] = useState(null)
    const [strsearch, setStrSearch] = useState('')
    const [nametosearch] = useDebounce(strsearch, 1000);
    const [showmodal, setShowModal] = useState(false);
    const [actualchar, setActualChar] = useState({})
    const [optionGender, setOptionGender] = useState('')
    const [optionStatus, setOptionStatus] = useState('')


    useEffect(() => {

        const GetChars = async() => {
          try {
            var api = `https://rickandmortyapi.com/api/character`;
            if (nametosearch || optionGender || optionStatus) {
                api += '?'
                let hasParam = true;
                if (nametosearch) {
                    if (hasParam) api += '&';
                    api += `name=${nametosearch}`; 
                    hasParam = true;
                };
                if (optionGender) {
                    if (hasParam) api += '&';
                    api += `gender=${optionGender}`;
                    hasParam = true;
                }
                if (optionStatus) {
                    if (hasParam) api += '&';
                    api += `status=${optionStatus}`;
                    hasParam = true;
                }
            }
            //console.log('api readed: '+api);
            const res = await fetch(api)
            const data = await res.json()

            if (data.error) {
                setCharacters([])
                setPrevious(null)
                setNext(null)
            } else {
                let arrayChars = data.results
                setPrevious(data.info.prev)
                setNext(data.info.next)
                setCharacters(arrayChars)
            }

          } catch(error) {
            console.log('THERE WAS AN ERROR: '+error)
          }
        }
        
        GetChars()
    
    }, [nametosearch, optionGender, optionStatus])    


    const getNameEpisode = async (urlepisode) => {
        var episodename = '';
        try {
            const res = await fetch(urlepisode)
            const data = await res.json()
            episodename = data.name
        } catch (error) {
            episodename = "Server error: " + error 
        }
            
        return episodename;
    }

    const handleClose = () => {
        setActualChar({})
        setShowModal(false)
    }
    const handleShow = async (obj) => {
        //setActualChar(obj)
        const resumeObj = {
            name: obj.name,
            image: obj.image,
            firstEpisode: '',
            lastEpisode: ''
        }

        resumeObj.firstEpisode = await getNameEpisode(obj.episode[0]);
        if (obj.episode.length > 1) {
            resumeObj.lastEpisode = await getNameEpisode(obj.episode[obj.episode.length - 1])
        }
                
        setActualChar(resumeObj)
        setShowModal(true)
    }




    const getCharsNewPage =  async (url) => {
        //console.log('Getting new url: '+url);
        try {
            if (url !== '') {
                const res = await fetch(url)
                const data = await res.json()
                let arrayChars = data.results
      
                setPrevious(data.info.prev)
                setNext(data.info.next)
      
                setCharacters(arrayChars)
            }
        } catch(error) {
          console.log(error)
        }
    }

    const clearAll = () => {
        setStrSearch('')
        setOptionGender('')
        setOptionStatus('')
    }

   

    return (
        <div>
            <h1>Rick & Morty Characters</h1>
            <div className="mb-5">
                <input
                    className="me-5"
                    placeholder="Search.."
                    value={strsearch}
                    onChange={(e) => {setStrSearch(e.target.value)}}
                />
                <select className="me-5" value={optionGender} onChange={ (e) => setOptionGender(e.target.value)}>
                    <option value="">Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Genderless">Genderless</option>
                    <option value="Unknow">Unknow</option>
                </select>
                <select value={optionStatus} onChange={ (e) => setOptionStatus(e.target.value)}>
                    <option value="">Status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Unknow">Unknow</option>
                </select>
                <button className="btn btn-primary ms-5" onClick={() => clearAll()}>
                    Clear All
                </button>
            </div>

            <div className="container">
                <div className="row row-cols-6 border">  
                    <div className="col"></div>   
                    <div className="col">NAME</div>
                    <div className="col">ORIGIN</div>
                    <div className="col">STATUS</div>
                    <div className="col">SPECIES</div>
                    <div className="col">GENDER</div>
                </div>
                {characters.length === 0 &&
                    (
                        <h3>No characters found</h3>
                    )
                }
                
                {characters.length > 0 &&
                    (
                        <>
                            {characters.map((item) => (
                                <div className="row row-cols-6 border-bottom pointer hoverDiv"  role="button" key={item.id}  onClick={() =>handleShow(item)}>
                                    <div className="col"><img alt="" src={item.image} width="30px" className="rounded-circle" /></div>
                                    <div className="col">{item.name}</div>
                                    <div className="col">{item.origin.name}</div>
                                    <div className="col">{item.status}</div>
                                    <div className="col">{item.species}</div>
                                    <div className="col">{item.gender}</div>
                                </div>
                            ))}
                        </>
                    )
                }

            </div>

            <div className="pagination justify-content-center">   
                {previous !== null &&
                    (
                        <button className="btn btn-secondary" onClick={() => getCharsNewPage(previous)}>
                            Prev
                        </button>
                    )
                }

                {next !== null &&
                    (
                        <button className="btn btn-secondary ms-5" onClick={() => getCharsNewPage(next)}>
                            Next
                        </button>
                    )
                } 
            </div>

            <Modal show={showmodal} onHide={() => handleClose()} parentSelector={() => document.querySelector('#root')}>
                <Modal.Body>
                    <img src={actualchar.image} alt="" width="100%" />
                    <h3>{actualchar.name}</h3>
                    <p>{actualchar.firstEpisode}</p> 
                    {actualchar.lastEpisode !== '' &&
                        (
                            <p>{actualchar.lastEpisode}</p> 
                        )
                    }

                    
                </Modal.Body>

            </Modal>           
                     
        </div>
    )
};

export default Characters;