'use client';

import React from 'react';
import { useFavorites } from './FavoritesContext';

export default function FavoriteToggle({ movieId, variant = 'details' }) {
    const { favoriteMovieIds, toggleFavorite } = useFavorites();
    const isFavorited = favoriteMovieIds.includes(movieId);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movieId);
    };

    // Base styles common to all variants
    const baseStyles = {
        cursor: 'pointer',
        fontSize: '28px',
        border: 'none',
        transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isFavorited ? '#f0c420' : '#495057', // Default yellow if favorited, otherwise dark gray
    };

    // Variant-specific styles
    const variantStyles = {
        details: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        },
        card: {
            fontSize: '20px',
            padding: '4px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: isFavorited ? '#f0c420' : '#666',
            borderRadius: '0',
        },
        watchlist: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '24px',
            padding: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: '#f0c420',
        },
        'watchlist-card': {
            position: 'absolute',
            top: '15px',
            right: '15px',
            zIndex: 5,
            fontSize: '28px',
            padding: '0',
            backgroundColor: 'transparent',
            borderRadius: '0',
            boxShadow: 'none',
            color: isFavorited ? '#f0c420' : '#495057',
        }
    };

    return (
        <button
            onClick={handleClick}
            style={{ ...baseStyles, ...(variantStyles[variant] || {}) }}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <i className={isFavorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
        </button>
    );
}
