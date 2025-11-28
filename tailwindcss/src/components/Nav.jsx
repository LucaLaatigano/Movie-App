import { Link } from "react-router-dom";

function Nav(){
    return(
            <section className='bg-gray-900 flex flex-row justify-between w-full space-x-6 p-4 h-[80px] border-0.2 border-solid border-white'>
                <div>
                    <Link to="/"className="text-white text-[25px] font-bold">Movie App</Link>
                </div>
                <div className="flex justify-center items-center gap-3.5">
                    <Link to="/" className="text-white text-[21px]">Home</Link>
                    <Link to="/favorites" className="text-white text-[21px]">Favorites</Link>
                </div>
            </section>
        
    )
}
export default Nav;