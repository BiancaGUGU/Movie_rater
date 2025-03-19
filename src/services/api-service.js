const API_URL="http://127.0.0.1:8000/api";
const TOKEN='5a944feb56cfa08a61e35e505109874257ebdceb';


export default class API{
    static async updateMovie(movie_id,body){
        const response=await fetch(`${API_URL}/movies/${movie_id}/`,
            {
                method:"PUT",
                headers :{
                    "Content-Type":`application/json`,
                    "Authorization":`Token ${TOKEN}`
                },
                body:JSON.stringify(body)
        });
        if(!response.ok){
                return null;
        }
        return await response.json();
     
    }

    static async createMovie(body){
        const response=await fetch(`${API_URL}/movies/`,
            {
                method:"POST",
                headers :{
                    "Content-Type":`application/json`,
                    "Authorization":`Token ${TOKEN}`
                },
                body:JSON.stringify(body)
        });
        if(!response.ok){
                return null;
        }
        return await response.json();
     
    }

}