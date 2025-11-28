import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useMovieContext } from "../contexts/MoviesContext";
import {Link} from 'react-router-dom'
function MoviesCard({json, keyGiven}){
    const {addToFavorites, removeFavorites, isFavorite} = useMovieContext()
    const favorite = isFavorite(json.id)
    const handleFavoriteToggle = (e)=>{
        e.preventDefault()
        if(favorite) removeFavorites(json.id)
        else addToFavorites(json)
    }



    return(
        <div key={keyGiven}>
            <Link to={`/movie/${json.id}`} className="flex flex-col justify-start items-center gap-2.5 w-75 h-150
            bg-gray-900 relative">
                <button onClick={(e) => handleFavoriteToggle(e)} className=" absolute top-2 right-2
                z-10 text-white text-xl p-1  cursor-pointer transition hover:scale-110 
                ease-in-out">
                    {favorite ? <FaHeart/>: <FaRegHeart/>}
                </button>
                <img src={`https://image.tmdb.org/t/p/w500${json.poster_path}`} alt="Movies image" 
                className="w-75 h-125 object-cover" />
                <h3 className="text-white text-[18px] font-medium w-full px-2 truncate text-center">
                    {json.title}
                </h3>
                <p className="text-white text-6">
                    {json.release_date?.split("-")[0]}
                    </p>
            </Link>
        </div>
    )
}

export default MoviesCard;