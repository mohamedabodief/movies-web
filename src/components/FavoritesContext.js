'use client'; 

import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context for favorites
export const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        // Hook is only used insided FavoritesProvider
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

// Favorites Provider component
export function FavoritesProvider({ children }) {
    // State to hold the array of favorite movie IDs
    const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);
    // State to track if the initial load from localStorage is complete
    const [isLoaded, setIsLoaded] = useState(false);

    // useEffect to load favorite movie IDs from localStorage on initial component mount
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem('favoriteMovies');
            if (storedFavorites) {
                // Parse the stored JSON string back into an array
                setFavoriteMovieIds(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Error loading favorites from localStorage:", error);
            setFavoriteMovieIds([]);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // save favorite movie IDs when favoriteMovieIds changes
    useEffect(() => {
        // Only save if the initial load is complete to prevent overwriting on first render
        if (isLoaded) {
            try {
                localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds));
            } catch (error) {
                console.error("Error saving favorites to localStorage:", error);
            }
        }
    }, [favoriteMovieIds, isLoaded]); 

    const toggleFavorite = (movieId) => {
        setFavoriteMovieIds((prevFavorites) => {
            if (prevFavorites.includes(movieId)) {
                // If already favorited, remove it from the array
                return prevFavorites.filter((id) => id !== movieId);
            } else {
                // If not favorited, add it to the array
                return [...prevFavorites, movieId];
            }
        });
    };

    // The context value provides the current list of favorite IDs and the toggle function
    const contextValue = {
        favoriteMovieIds,
        toggleFavorite,
    };

    // Render the children components
    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
}
