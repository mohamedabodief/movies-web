'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteToggle from '@/components/FavoriteToggle'; 

export default function WatchlistCard({ movie }) {
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

    return (
        <div className="mb-4 d-flex">
            <Link href={`/movie_details/${movie.id}`} className="flex-grow-1" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                    className="card flex-row flex-grow-1 shadow-sm rounded-lg overflow-hidden position-relative" // Added position-relative here
                    style={{
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        height: '100%', 
                    }}
                >
                    <FavoriteToggle movieId={movie.id} variant="watchlist-card" />

                    <div style={{ width: '120px', flexShrink: 0 , padding: '8px' }}>
                        {/* Movie Poster Image */}
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            width={120}
                            height={180}
                            className="rounded-2"
                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            priority
                            onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/120x180/cccccc/333333?text=No+Image';
                            }}
                        />
                    </div>

                    <div className="card-body p-3 flex-grow-1 d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', lineHeight: '1.3' }}>
                                {movie.title}
                            </h5>
                            <small className="text-muted" style={{ fontSize: '0.85rem' }}>{formattedDate}</small>
                            <div className="d-flex align-items-center my-1" style={{ fontSize: '0.8rem' }}>
                                <div className="d-flex me-2">
                                    {renderStars(movie.vote_average)}
                                </div>
                                <span className="text-muted">{movie.vote_count.toLocaleString()}</span>
                            </div>
                            <p className="card-text text-muted" style={{ fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
