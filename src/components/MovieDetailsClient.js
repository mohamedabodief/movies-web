'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RecommendationCard from '@/components/RecommendationCard';
import FavoriteToggle from '@/components/FavoriteToggle';

// This client component will receive movie and recommendations as props
export default function MovieDetailsClient({ movie, recommendations }) {
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const formattedDate = new Date(movie.release_date).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        }
    );

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

    const displayRecommendations = shuffleArray(recommendations || []).slice(0, 6);

    return (
        <div className="m-5">
            <section
                className="movie-details-section p-5 d-flex flex-column flex-lg-row align-items-start gap-4 position-relative"
                style={{
                    backgroundColor: '#F3F1F1',
                    borderRadius: '10px',
                }}
            >
                <FavoriteToggle movieId={movie.id} variant="details" />

                <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                    <div>
                        {movie.poster_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="rounded-2 shadow-lg"
                                style={{ objectFit: 'cover' }}
                                priority
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/300x450/cccccc/333333?text=No+Image';
                                }}
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

                    {/* Marvel Studios Logo */}
                    <div className="my-4">
                        <Image
                            src="/marvel_studios_logo.png"
                            alt="Marvel Studios"
                            width={150}
                            height={60}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* Website Button and Link Icon - With yellow outline */}
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
                </div>
            </section>

            {/* Recommendations Section */}
            {displayRecommendations.length > 0 && (
                <section className="recommendations-section my-5">
                    <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 py-3">
                        {displayRecommendations.map((recMovie) => (
                            <RecommendationCard key={recMovie.id} movie={recMovie} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
