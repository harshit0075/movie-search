import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Pages/Search';
import axios from 'axios';
import Result from './Pages/Result';
import MovieDetails from './Pages/MovieDetails';

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {}
  });

  const handleInput = (event) => {
    let search = event.target.value;
    setState((prevState) => {
      return { ...prevState, search: search }
    });
  }

  const openDetails = (id) => {
    axios.get('https://www.omdbapi.com/?i=' + id + '&apikey=b5382e81')
      .then(({ data }) => {
        setState((prevState) => {
          return { ...prevState, selected: data }
        });
      })
      .catch(err => console.log(err));
  }

  const SearchResult = (event) => {
    if (event.key === 'Enter') {
      axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=b5382e81' + '&s=' + state.search)
        .then(res => {
          setState(prevState => {
            return { ...prevState, results: res.data.Search }
          });
        })
        .catch(err => console.log(err));
    }
  }

  const close = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="w-100 main-wrapper d-flex flex-column align-items-center min-vh-100">
      {typeof state.selected.Title !== "undefined" ? (
        <MovieDetails selected={state.selected} close={close} />
      ) : (
        <header className="w-100 text-center text-white mt-5">
          <h2>Movie Search</h2>
          <Search handleInput={handleInput} SearchResult={SearchResult} />
          <div className="container">
            <div className="row">
              {state.results && state.results.map((result, i) => (
                <div className="col-12 col-sm-6 col-md-3 col-lg-3 my-2" key={i}>
                  <Result result={result} openDetails={openDetails} />
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;
