import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Favorites from './components/Favorites'
import Nav from './components/Nav'
import ScrollToTop from './components/window components/ScrollToTop'
import { MovieProvider } from './contexts/MoviesContext'
import MovieDetails from './components/MovieDetails'
function App() {
  
    return( 
        <MovieProvider>
            <div className=' bg-gray-950 min-h-screen w-full items-center justify-center'>
                <Nav />
                <ScrollToTop />
                <div className='flex justify-center items-center'>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/favorites" element={<Favorites/>}/>
                            
                                
                            {/*Dynamic route for the movie details */}
                            <Route path="/movie/:id" element={<MovieDetails/>}/>
                            {/*Route when you are on the favorite slash */}
                            <Route path="/favorites/movie/:id" element={<MovieDetails />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </MovieProvider>
    )
 
}

export default App
