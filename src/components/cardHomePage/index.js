'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // ✅ استيراد Image من next/image
import FavoriteToggle from '../FavoriteToggle'; // تأكد من المسار الصحيح

export default function Card({ movie }) {
  const formattedDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const vote = Math.round(movie.vote_average * 10);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (vote / 100) * circumference;

  let strokeColor = 'red';
  if (vote >= 70) strokeColor = 'green';
  else if (vote >= 40) strokeColor = 'orange';

  return (
    <Link href={`/movie_details/${movie.id}`} key={movie.id} className="p-0">
      <div className="col mb-2 px-3" style={{ height: '400px' }}>
        <div
          className="card bg-transparent shadow-none"
          style={{
            height: '100%',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <div className="position-relative">
            {/* ✅ صورة الفيلم باستخدام <Image /> */}
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://placehold.co/500x750/cccccc/333333?text=No+Image'
              }
              alt={movie.title}
              width={500}
              height={750}
              className="card-img-top"
              style={{
                height: '300px',
                objectFit: 'fill',
                borderRadius: '8px',
              }}
              unoptimized // ⬅️ ضرورية لو مصدر الصورة مش مضاف في next.config.js
            />

            {/* تقييم الفيلم */}
            <div
              className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
              style={{
                bottom: '-20px',
                left: '10px',
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
              <FavoriteToggle movieId={movie.id} variant="card" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}