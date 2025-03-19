import React,{useState,useEffect} from "react";
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function MovieList({movieClicked,newMovie}){
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const newMovies=movies.map(movie =>
            movie.id === newMovie.id ? newMovie:movie
        );
        setMovies(newMovies);
    },[newMovie])

    useEffect(()=>{
        const fetchMovies = async()=>{
            try{

                const response=await fetch('http://127.0.0.1:8000/api/movies',
                    {
                        method:"GET",
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":"Token 5a944feb56cfa08a61e35e505109874257ebdceb"
                        }
                    });
                    if(!response.ok){
                        setError("Error getting movies");
                        return;
                    }
                    const result=await response.json();
                    setMovies(result)
                

            } catch{
                setError("Error getting movies");
            }
        }
            fetchMovies();
        },[])
    

    return(
        <div>
            {movies.map(movie=>{
                return(
                    <div key={movie.id} className="grid grid-cols-[1fr_auto_auto] gap-3 p-3">
                        <h2 className="text-xl cursor-pointer" onClick={(evt)=>{movieClicked(movie,false)}}>{movie.title}</h2>
                        <FaEdit onClick={(evt)=>{movieClicked(movie,true)}}/>
                        <MdDelete/>
                    </div>                
                ) 
            })}
        </div>
    )
}