import { useMovieContext} from "../contexts/MoviesContext";
import MoviesCard from "./MovieCard";
function Favorites(){
    const {favorites} = useMovieContext();
    if(favorites){
        return(
            <div className="flex justify-center flex-wrap items-center gap-4 mb-50 mt-20">
                   {favorites.map((movie, index)=>(
                         <MoviesCard json={movie} key={index}/>
                   ))}
            </div>
        )
    } else{
        return(
            <div className="flex flex-col w-80 h-30 border-2 mt-40 border-red-500 bg-red-400 opacity-75">
                <div className="p-5 pl-2">
                    <h3 className="font-bold text-6 text-white">There's no favorites movies yet</h3>
                    <p className="font-light text-6 text-white">
                        If you want to apear some movies so mark some
                    </p>
                </div>
            </div>
        )
    }
}
export default Favorites;