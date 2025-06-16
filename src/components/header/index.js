import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg px-3"
        style={{ backgroundColor: '#FFE353' }}
      >
        <div className="container-fluid fw-bold">
          <a className="navbar-brand " href="#">
            Movie App
          </a>
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

              <li className="nav-item d-flex align-items-center">
                <i className="fa-solid fa-heart text-dark me-1 fa-lg fs-3 me-2"></i>
                <span className="nav-link p-0">watchlist</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
