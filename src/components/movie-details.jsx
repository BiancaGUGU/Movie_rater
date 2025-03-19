import React,{useState,useEffect} from "react";
import {FaRegStar,FaStar} from "react-icons/fa";


export default function MovieDetails({movie,updateMovie}){
     
    const[highlighted,setHighlighted]=useState(-1);
    const [error,setError]=useState(null);
    

    const rateMovie=async(rate) =>{
        try{

            const response=await fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`,
                {
                    method:"POST",
                    headers :{
                        "Content-Type":"application/json",
                        "Authorization":"Token 5a944feb56cfa08a61e35e505109874257ebdceb"
                    },
                    body:JSON.stringify({stars:rate})
                });
                if(!response.ok){
                    setError("Error setting rating");
                    return;
                }
                const result=await response.json();
                setError("Succesfully updated");
                getNewMovie();
                

        } catch{
            setError("Error setting rating");
        }
    }

    const getNewMovie=async(rate) =>{
        try{

            const response=await fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`,
                {
                    method:"GET",
                    headers :{
                        "Content-Type":"application/json",
                        "Authorization":"Token 5a944feb56cfa08a61e35e505109874257ebdceb"
                    },
                });
                if(!response.ok){
                    setError("Error setting rating");
                    return;
                }
                const result=await response.json();
                updateMovie(result);          

        } catch{
            setError("Error setting rating");
        }
    }


    
    
    return(
        <React.Fragment>
            {movie && 
                <div>
                    <h1 className="text-2xl pb-3">{movie && movie.title }</h1>
                    <p className="text-xl pb-3">{movie && movie.description}</p>
                    <div className="flex pt-2">
                        <FaStar className={movie.avg_rating >0 && 'text-orange-400'}/>
                        <FaStar className={movie.avg_rating >1 && 'text-orange-400'}/>
                        <FaStar className={movie.avg_rating >2 && 'text-orange-400'}/>
                        <FaStar className={movie.avg_rating >3 && 'text-orange-400'}/>
                        <FaStar className={movie.avg_rating >4 && 'text-orange-400'}/>
                        <p>({movie.no_of_ratings})</p>
                    </div>
                    <h1 className='border-t-2 border-purple-600 mt-5'>Rate the movie!</h1>
                    <div className="flex text-3xl">
                        {[...Array(5)].map((el,indx)=>{
                            return <FaStar className={highlighted >indx && 'text-purple-400'}
                                        onMouseEnter={()=>setHighlighted(indx+1)}
                                        onMouseLeave={()=>setHighlighted(-1)}
                                        onClick={()=>rateMovie(indx+1)}
                            />
                        })}
                    </div>
                    { error && <p>{error}</p>}
                </div>

            }
        </React.Fragment>
    );
}