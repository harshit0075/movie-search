import React from 'react';
import '../App.css'

const MovieDetails = ({selected, close}) => {
  return (
    <div className=' d-flex flex-column justify-content-center'>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12 col-md-6 text-center'>
                    <img src={selected.Poster} alt=''/>
                </div>
                <div className='col-12 col-md-6 text-red'>
                    <h2>{selected.Title}</h2>
                    <p>{selected.Year}</p>
                    <p>Rating: {selected.imdbRating}</p>
                    <p>{selected.Plot}</p>
                    <button onClick={close} className='btn btn-danger'>Close</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MovieDetails;