import React, { useState } from 'react';
import Search from './components/Search'
import axios from 'axios'
import { Results } from './components/Results';
import Popup from './components/Popup'



function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  })
  const apiurl = 'http://www.omdbapi.com/?apikey=a63d1e8d'

  const search = e => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then((data) => {
        let results = data.data.Search
        console.log(data)
        console.log(results)

        setState(prevState => {
          return { ...prevState, results: results }
        })
      })
    }
  }

  const handleInput = (e) => {
    let s = e.target.value

    setState(prevState => {
      return { ...prevState, s: s }
    })
    // cg po co to prevState??
    console.log(state.s)

  }

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      // cg / czemu data musi być w {} a wyżej już nie musi
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    })

  }
  return (
    <div className="App">
      <header >
        <h1>Movie DataBase</h1>
      </header>
      <main>
        <Search
          handleInput={handleInput}
          search={search}
        />
        <Results
          results={state.results}
          openPopup={openPopup}
        />

        {(typeof state.selected.Title != "undefined") ? <Popup
          selected={state.selected}
          closePopup={closePopup}
        /> : false}
      </main>
    </div>
  );
}

export default App;
