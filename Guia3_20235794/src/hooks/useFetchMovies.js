import { useEffect, useState } from "react";


export const API_KEY = '2a2f6b7b';

/**  
 * Hook personalizado para obtener películas desde la API de OMDb.  
 * @param {string} query - Término de búsqueda ingresado por el usuario. 
 * @returns {Object} - Retorna un objeto con:  
 * - movies: Lista de películas encontradas.  
 * - isLoading: Estado de carga de la solicitud.  
 * - error: Mensaje de error en caso de fallo.  
 */ 

export function useFetchMovies(query){
    //estado para almacenar las peliculas obtenidas
    const [movies, setMovies] = useState([]);

    //estado para indicar si la solicitud esta en curso
    const [isLoading, setIsLoading] =useState(false);

    //estado para manejar errores
    const [error, setError] = useState("");

    useEffect(()=>{
        //Si la busqueda tiene menos de 3 caracteres, limpiar resultados y error
        if (query.length < 3){
            setMovies([]);
            setError("");
            return;
        }
        /***
         * Funcion asincrona que obtiene las peliculas de la API
         */
        async function fetchMovies() {
            try {
                setIsLoading(true); //Inicia el estado de carga
                setError(null) //reinicia errores previos

                //peticion a la api de ombd con la clave de acceso y la consulta
                const response = await
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);

                //verificar si la respuesta HTTP es correcta
                if(!response.ok)
                    throw new Error("Error al cargar peliculas");

                const data = await response.json();

                //si la api responde con un error, lanzar la excepcion
                if(data.Response === "False")
                    throw new Error("No se encontraron resultados");

                //guardar las peliculas obtenidas en el estado
                setMovies(data.Search);
            }catch(err) {
                //manejo de errores: guardar el mensaje de error y limpiar la lista de peliculas
                setError(err.message);
                setMovies([]);
            } finally {
                setIsLoading(false); //Finaliza el estado de carga
            }
        }

        //llamar a la funcion para obtener los datos
        fetchMovies();

    }, [query]) //se ejecuta cada vez que cambia la consulta (query)

    return{movies, isLoading, error}
}