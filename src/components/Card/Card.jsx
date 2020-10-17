import React from 'react'
import './Card.scss'

export const Card = ({ movie, handleGetDetail }) => {
    const image_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    return <div className="Card" onClick={() => handleGetDetail(movie.id)}>
        <div className="info">
            <h2>{movie.title}</h2>
            <span>{movie.release_date}</span>
        </div>
        <img src={image_path} />
    </div>
}