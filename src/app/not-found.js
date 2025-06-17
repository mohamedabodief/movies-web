"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";


export default function NotFound() {

  
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "88vh" }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <button
          className="btn w-100 mx-auto d-block"
          style={{ backgroundColor: '#f5c518', color: '#000' }}
          onClick={() => redirect('/')}
        >
          Back to home
        </button>

      </div>
    </div>
  );
}
