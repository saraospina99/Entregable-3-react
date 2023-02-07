import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './Utils/getRandomLocation'


function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  const [listLocation, setListLocation] = useState()

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [numberLocation])


  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    } else {
      setNumberLocation(e.target.inputLocation.value.trim())
    }

    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
      .then(res => setListLocation(res.data.results))
      .catch(err => console.log(err))
  }


  return (
    <div className="App">
      <img className='app__img' src="/banner-01.png" alt="" />
      <form className='form' onSubmit={handleSubmit}>
        <input className='form__input'
          id='inputLocation'
          type="text"
          onChange={handleChange}
        />
        <button className='form__btn'>Search</button>
      </form>

      <div className='form__list-container'>
        <ul className='form__list'>
          {
            listLocation?.map(loc => (
              <li className='form__list-item' onClick={() => setNumberLocation(loc.id)} key={loc.id}>{loc.name}</li>
            )
            )
          }
        </ul>
      </div>

      





      {
        hasError ?

          <span className='app__error'>
            <div className="app__error-box">
              <span className="x"></span>
            </div> 
            <h2 className='app__text'>Hey!! you must provide an id from 1 to 126 ... sad </h2></span>

          :
          <>

            <LocationInfo location={location} />
            <div className='residents__container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>


  )
}

export default App
