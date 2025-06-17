// components/Header.js
'use client'; // Mark as client component to use hooks

import Link from 'next/link';
import React from 'react';
import { useFavorites } from '@/components/FavoritesContext'; // Import useFavorites hook

export default function Header() {
    // Get the array of favorite movie IDs from the context
    const { favoriteMovieIds } = useFavorites();
    const watchlistCount = favoriteMovieIds.length;

    return (
        <>
            <nav
                className="navbar navbar-expand-lg px-3"
                style={{ backgroundColor: '#FFE353' }} // Original background color
            >
                <div className="container-fluid fw-bold">
                    {/* Movie App Brand Link */}
                    <Link href="/" className="navbar-brand">
                        Movie App
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
                            {/* Existing Language Dropdown */}
                            <li className="nav-item dropdown fw-bold">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    En
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            EN
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            AR
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Watchlist Link with Counter */}
                            <li className="nav-item">
                                {/* Use Next.js Link component for client-side navigation */}
                                <Link
                                    href="/watchlist"
                                    className="nav-link p-0 d-flex align-items-center position-relative" // Added position-relative for badge positioning
                                    style={{ color: 'inherit' }} // Inherit text color from parent to avoid blue link color
                                >
                                    <i className="fa-solid fa-heart text-dark me-1 fa-lg fs-3 me-2"></i> {/* Original heart icon */}
                                    <span>watchlist</span>
                                    {/* Counter badge, similar to previous Navbar component */}
                                    {watchlistCount > 0 && (
                                        <span
                                            className="badge bg-light text-dark position-absolute"
                                            style={{
                                                fontSize: '0.70em', // Slightly smaller for better fit
                                                padding: '0.3em 0.5em',
                                                top: '-5px', // Adjust position to float above
                                                right: '-15px', // Adjust position to float beside
                                                transform: 'translateX(50%)', // Shift right to center on link edge
                                                border: '2px solid #FFE353', // Border color matching header background
                                            }}
                                            aria-label={`${watchlistCount} movies in watchlist`}
                                        >
                                            {watchlistCount}
                                            <span className="visually-hidden">movies in watchlist</span>
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
