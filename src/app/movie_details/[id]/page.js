// src/app/movie_details/[id]/page.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import RecommendationCard from '@/components/RecommendationCard';

export default async function MovieDetails({ params }) {
  const { id } = params;
  // It's highly recommended to store your API key in a .env.local file:
  // NEXT_PUBLIC_TMDB_API_KEY=YOUR_ACTUAL_API_KEY_HERE
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '76fb730da20c26bcd7d05575d7dcf0c6';

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Fetching the specific movie details
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
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

  // Fetching movie recommendations
  const recommendationsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
  );
  const recommendationsData = await recommendationsRes.json();

  // Get all recommendations, shuffle them, and take the first 6
  let allRecommendations = recommendationsData.results || [];
  const shuffledRecommendations = shuffleArray(allRecommendations);
  const recommendations = shuffledRecommendations.slice(0, 6); // Limit to 6 random films

  // Format release date
  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  );

  // Helper to render stars (matching design's outline stars)
  const renderStars = (voteAverage) => {
    const totalStars = 5;
    const ratingOutOf5 = movie.vote_average / 2;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(ratingOutOf5)) {
        stars.push(<i key={`star-${i}`} className="fa-solid fa-star me-1" style={{ color: '#f0c420' }}></i>);
      } else if (i - 1 < ratingOutOf5 && ratingOutOf5 < i) {
        stars.push(<i key={`star-half-${i}`} className="fa-solid fa-star-half-stroke me-1" style={{ color: '#f0c420' }}></i>);
      } else {
        stars.push(<i key={`star-empty-${i}`} className="fa-regular fa-star me-1" style={{ color: '#f0c420' }}></i>);
      }
    }
    return stars;
  };

  return (
    <div className="m-5">
      <section
        className="movie-details-section p-5 d-flex flex-column flex-lg-row align-items-start gap-4"
        style={{
          backgroundColor: '#F3F1F1',
          borderRadius: '10px',
        }}
      >
        <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-2 shadow-lg"
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div
              className="rounded-2 d-flex align-items-center justify-content-center bg-secondary text-white"
              style={{ width: 300, height: 450 }}
            >
              No Image
            </div>
          )}
        </div>

        <div className="col-12 col-lg-8">
          <h2 className="fw-bold mb-2">{movie.title}</h2>
          <small className="text-muted">{formattedDate}</small>

          {/* Star Rating and Votes */}
          <div className="mb-3 d-flex align-items-center mt-2">
            <div className="d-flex me-3">
              {renderStars(movie.vote_average)}
            </div>
            <strong className="me-3">{movie.vote_count.toLocaleString()}</strong>
          </div>

          <p className="mt-3 fs-5">{movie.overview}</p>

          {/* Genres */}
          <div className="mb-3 d-flex flex-wrap gap-2">
            {movie.genres && movie.genres.map((genre) => (
              <button
                key={genre.id}
                className="btn btn-warning rounded-pill px-3 btn-sm"
              >
                {genre.name}
              </button>
            ))}
          </div>

          <div className="duration d-flex flex-wrap gap-3 my-3">
            {movie.runtime && <h6 className="me-3 mb-0 fw-bold">Duration: <span className='fw-normal'>{movie.runtime} Min.</span></h6>}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <h6 className="mb-0 fw-bold">Languages: <span className='fw-normal'>{movie.spoken_languages[0].english_name}</span></h6>
            )}
          </div>

          {/* Marvel Studios Logo - Ensure you have public/marvel_studios_logo.png */}
          {/* {movie.production_companies && movie.production_companies.some(company => company.name.includes('Marvel Studios')) && ( */}
            <div className="my-4">
              <Image
                src="/marvel_studios_logo.png" // Path to your Marvel Studios logo in public folder
                alt="Marvel Studios"
                width={150} // Already a smaller size
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </div>

          {/* )} */}

          {/* Website Button and Link Icon - Already implemented */}
          {movie.homepage && (
            <div className='website-link mt-4'>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-warning rounded-pill px-4 btn-sm"
              >
                <span className='text-black'>Website <i className="fa-solid fa-link" style={{ color: "#000000" }}></i></span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="recommendations-section my-5">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 py-3">
            {recommendations.map((recMovie) => (
              <RecommendationCard key={recMovie.id} movie={recMovie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}