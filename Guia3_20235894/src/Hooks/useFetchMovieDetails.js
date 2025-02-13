import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies";

/**
 * 
 * 
 * @param {string} selectedId
 * @returns {Object}
 * 
 * 
 */

export function useFetchMovieDetails(selectedId) {

    const [movie, setMovie] = useState({});

    const [isLoading, setIsLoading] = useState({});

    const [error, setError] = useState("");

    useEffect(() => {

        if (!selectedId) {
            setMovie({});
            setError(null);
            return;
        }

        /**
         * Función asincrónica que obtiene los detalles de la película.
         */
        async function fetchMovieDetails() {
            try {
                setIsLoading(true); // Activa el estado de carga
                setError(null); // Reinicia errores previos

                // Petición a la API de OMDb con la clave de acceso y el ID de la película
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);

                // Verifica si la respuesta HTTP es correcta
                if (!response.ok) {
                    throw new Error("Error al cargar los detalles de la película");
                }

                const data = await response.json();

                // Si la API responde con un error, lanzar una excepción
                if (data.Response === "False") {
                    throw new Error("No se encontraron detalles para esta película");
                }

                // Guardar los detalles de la película en el estado
                setMovie(data);
            } catch (err) {
                // Manejo de errores: guardar el mensaje y limpiar el estado
                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false); // Finaliza el estado de carga
            }
        }

        // Llamar a la función para obtener los datos
        fetchMovieDetails();
    }, [selectedId]); // Se ejecuta cada vez que cambia el ID seleccionado

    return { movie, isLoading, error };
}