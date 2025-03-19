import React, { useState,useEffect } from "react";
import API from "../services/api-service";


export default function MovieForm({movie,updateMovie}){

    const [title,setTitle]=useState(movie.title);
    const[description,setDescription]=useState(movie.description);

    useEffect(()=>{
        setTitle(movie.title);
        setDescription(movie.description);
    },[movie])

    const saveMovie=async() =>{
        const resp=await API.updateMovie(movie.id,{title,description});
        if (resp) updateMovie(resp);
    };

    const createMovie=async() =>{
        const resp=await API.createMovieMovie(movie.id,{title,description});
        //if (resp) updateMovie(resp);
    };
    


    return(
        <React.Fragment>
            {movie && 
            <div className="grid grid-cols-2 gap-2">
                <label htmlFor="title">Title</label>
                <input id='title' type="text" placeholder="Title" className=' text-gray-950'value={title}
                onChange={(evt)=>setTitle(evt.target.value)}/>

                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Description" className=' text-gray-950' value={description}
                onChange={(evt)=>setDescription(evt.target.value)}/>
                
                {movie.id ? 
                    <button onClick={()=>saveMovie()}> Update movie </button>
                    :<button onClick={()=>createMovie()}> Create movie </button>
                }
            </div>
        }
        </React.Fragment>
    )
}