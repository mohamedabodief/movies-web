// "use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Not Found Page",
  description: "Rendering Not Found Page",
};


export default function NotFound() {
//   const goHome = () => {
//     redirect("/");
//   };
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "88vh" }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link className="btn btn-primary" href="/" >
          Go Home
        </Link>
        {/* <button className="btn btn-primary" onClick={goHome}>
          Go Home
        </button> */}
      </div>
    </div>
  );
}
// programaticlly
