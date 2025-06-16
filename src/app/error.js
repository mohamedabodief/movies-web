'use client'
import React from 'react'


export const metadata = {
  title: "Error Page",
  description: "Rendering Error Page",
};

export default function Error() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{height: "88vh" }}>
      <h1>Something Went Wrong!</h1>
    </div>
  )
}
