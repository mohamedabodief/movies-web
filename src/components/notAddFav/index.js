"use client";
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';


export default function NotFound() {
  //   const goHome = () => {
  //     redirect("/");
  //   };
  return (
    <div
      className=""
      style={{ height: "auto" }}
    >
        <h1 className="fw-bold px-5 py-5">Watch list</h1>
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <Image
            src="/🦆 icon _heart slash_.png"
            width={211.6}
            height={211.62}
            alt='Not Found Page'
            className="img-fluid mb-4 rounded-2 mx-auto d-block"
          />
        <p className="fs-3 text-center mb-4">
          No Movies in watch list 
        </p>
        <button
          className="btn btn w-25 mx-auto d-block"
          style={{ backgroundColor: '#f5c518', color: '#000' }}
          onClick={() => redirect('/')}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
