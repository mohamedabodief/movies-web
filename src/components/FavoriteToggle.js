'use client';

import React, { useState, useEffect } from 'react';

export default function FavoriteToggle({ movieId }) {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        try {
            const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
            setIsFavorited(favorites.includes(movieId));
        } catch (error) {
            console.error("Failed to parse favorites from localStorage:", error);
            setIsFavorited(false);
        }
    }, [movieId]);

    const handleClick = () => {
        let favorites = [];
        try {
            favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
        } catch (error) {
            console.error("Failed to parse favorites from localStorage during click:", error);
            favorites = [];
        }

        let updatedFavorites;
        if (isFavorited) {
            updatedFavorites = favorites.filter((id) => id !== movieId);
        } else {
            updatedFavorites = [...favorites, movieId];
        }

        try {
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Failed to update favorites in localStorage:", error);
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer',
                fontSize: '28px',
                color: isFavorited ? '#f0c420' : '#495057', // Yellow when filled, dark gray when empty
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Lighter background
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
        >
            <i className={isFavorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
        </div>
    );
}