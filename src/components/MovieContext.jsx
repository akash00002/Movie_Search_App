import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Initialize state from localStorage
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('movie-favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const OMDB_API_KEY = 'c7e6a92c';

    // 2. Save to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setSearchResults([]);

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.Response === "True") {
                setSearchResults(data.Search);
            } else {
                setError(data.Error);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch movies. Please check your connection");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorites = (movie) => {
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

        if (isFavorite) {
            // 3. Corrected syntax: .filter() with parentheses
            setFavorites(prevFavorites =>
                prevFavorites.filter(fav => fav.imdbID !== movie.imdbID)
            );
        } else {
            setFavorites(prevFavorites => [...prevFavorites, movie]);
        }
    };

    return (
        <MovieContext.Provider value={{
            searchResults,
            loading,
            error,
            favorites,
            handleSearch,
            toggleFavorites
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => useContext(MovieContext);
