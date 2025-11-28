import MoviesCard from "./MovieCard";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovie } from "../services/api";
function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            }catch(err){
                console.log(err)
                setError("We could not load your movie")
            } finally{
                setLoading(false)
            }

        }


    useEffect(()=>{
        loadPopularMovies();
    },[])

    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!searchQuery.trim()){
            loadPopularMovies();
            return
        } 
        if(loading) return
        setLoading(true)
        try{
            const data = await searchMovie(searchQuery);
            setMovies(data)
            setError(null)
        }catch(err){
                console.log(err)
                setError("We could not load your movie")
        }finally{
            setLoading(false)
        }
    }
   


    return( 
        <div className="flex flex-col justify-center gap-15 mt-10">
            <div className="flex justify-center items-center">
                <section className="flex justify-center items-center w-100 h-10">
                    <form onSubmit={handleSubmit} className="flex justify-center items-center w-100 h-10 gap-5">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value) } placeholder="Search Movie" className="w-full h-full text-white placeholder-gray-400 rounded-xl pl-3 bg-gray-900" />
                        <button type="submit" className="w-30 h-10 p-2 bg-gray-900 rounded-xl text-white
                        cursor-pointer transition hover:scale-103 ease-in-out">

                            Search
                        </button>
                    </form>
                </section>
            </div>
            {error && 
                <div>
                    <p className="text-red-600 font-bold font-15">{error}</p>
                </div>
            }
            {loading ? 
            (
                <p className="text-white font-bold font-15">Loading....</p>
            )
            : 
            (
             <div className="flex justify-center flex-wrap items-center gap-4 mb-50">
                   {movies.map((movie, index)=>(
                         <MoviesCard json={movie} key={index}/>
                   ))}
            </div>
            )}
        </div>
    )
}

export default Home;