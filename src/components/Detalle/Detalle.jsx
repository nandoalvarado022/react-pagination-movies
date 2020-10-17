import React from 'react'
import './Detalle.scss'

export const MovieDetail = ({ movieInfo }) => {
    const image_path = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
    return <div className="MovieDetail">
        <h1>Detalle de la pelicula {movieInfo.title} </h1>
        <div className="genres">
            {
                movieInfo.genres.map(item => {
                    return <span>{item.name}</span>
                })
            }
        </div>
        <img src={image_path} />
        .
        <p>
            {movieInfo.overview}
        </p>
    </div>
}
