import React from 'react';
import MovieDetailsClient from '@/components/MovieDetailsClient'; // Import the new client component

// This is a Server Component
export default async function MovieDetailsPage({ params }) {
    const { id } = params;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '76fb730da20c26bcd7d05575d7dcf0c6';

    const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        { cache: 'no-store' }
    );

    if (!movieRes.ok) {
        return (
            <div className="container p-5 text-center">
                <h1>Movie not found!</h1>
                <p>Please check the movie ID or try again later.</p>
            </div>
        );
    }

    const movie = await movieRes.json();

    // Fetch recommendations
    const recommendationsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`,
        { cache: 'no-store' } 
    );
    const recommendationsData = await recommendationsRes.json();
    const recommendations = recommendationsData.results || [];

    // Render the client component and pass the fetched data as props
    // The MovieDetailsClient will then handle all client-side interactions
    return (
        <MovieDetailsClient movie={movie} recommendations={recommendations} />
    );
}
