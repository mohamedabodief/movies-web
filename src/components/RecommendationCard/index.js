import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function RecommendationCard({ movie }) {
  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }
  );

  const vote = Math.round(movie.vote_average * 10);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (vote / 100) * circumference;

  let strokeColor = 'red';
  if (vote >= 70) strokeColor = 'green';
  else if (vote >= 40) strokeColor = 'orange';

  return (
    <Link href={`/movie_details/${movie.id}`} className="text-decoration-none text-dark">
      <div
        className="col mb-4 px-2"
        style={{
          height: '350px',
        }}
        key={movie.id}
      >
        <div
          className="card bg-transparent shadow-none"
          style={{
            height: '400px%',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <div className="position-relative">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
                width={150}
                height={300}
                style={{
                  objectFit: 'cover',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div
                className="rounded-2 d-flex align-items-center justify-content-center bg-secondary text-white"
                style={{ width: 150, height: 225 }}
              >
                No Image
              </div>
            )}


            {/* Vote Circle Overlay */}
            <div
              className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
              style={{
                bottom: '-17px',
                left: '8px',
                width: '45px',
                height: '45px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#222"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  transform="rotate(-90 18 18)"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="8"
                  fill="white"
                  fontWeight="bold"
                >
                  {vote}%
                </text>
              </svg>
            </div>
          </div>

          <div className="card-body px-1 pt-4 text-start">
            <h6 className="fw-bold mb-0" style={{ fontSize: '0.95rem' }}>
              {movie.title}
            </h6>
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ fontSize: '0.9rem', color: '#666' }}
            >
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}