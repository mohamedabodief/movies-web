'use client';

import React, { useState, useEffect, useCallback } from 'react';
import WatchlistCard from '../../components/watchlistCard/page';
import { useFavorites } from '@/components/FavoritesContext';
import NotFound from '@/components/notAddFav';

export default function WatchlistPage() {
    const { favoriteMovieIds } = useFavorites();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '76fb730da20c26bcd7d05575d7dcf0c6';

    const fetchMovieDetails = useCallback(async (movieId) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch movie ${movieId}: ${res.status} ${errorText}`);
            }
            return await res.json();
        } catch (err) {
            console.error(`Error fetching movie details for ID ${movieId}:`, err);
            return null;
        }
    }, [API_KEY]);

    useEffect(() => {
        const getFavoriteMoviesDetails = async () => {
            setLoading(true);
            setError(null);

            if (favoriteMovieIds.length === 0) {
                setFavoriteMovies([]);
                setLoading(false);
                return;
            }

            const movies = [];
            const fetchedMovieData = await Promise.all(
                favoriteMovieIds.map(id => fetchMovieDetails(id))
            );

            fetchedMovieData.forEach(movie => {
                if (movie) {
                    movies.push(movie);
                }
            });

            setFavoriteMovies(movies);
            setLoading(false);
        };

        getFavoriteMoviesDetails();
    }, [favoriteMovieIds, fetchMovieDetails]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading your watchlist...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center py-5">
                <h1 className="text-danger">Error loading watchlist</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">My Watchlist</h1>
            {favoriteMovieIds.length === 0 ? (
                <div className="text-center py-5">
                <NotFound />
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4 py-3">
                    {favoriteMovies.map((movie) => (
                        <div className="col d-flex" key={movie.id}> 
                            <WatchlistCard movie={movie} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
