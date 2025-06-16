'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNum);
    router.push(`?${params.toString()}`);
  };

  const maxVisible = 5;
  let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisible + 1, 1);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="d-flex justify-content-center my-4 gap-2 flex-wrap">
      {currentPage > 1 && (
        <button
          className="btn btn-sm"
          onClick={() => goToPage(currentPage - 1)}
          style={{
            color: '#000000',
            backgroundColor: 'white',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: 'bold',
          }}
        >
          &laquo;
        </button>
      )}


      {startPage > 1 && <span className="d-flex align-items-center px-2">...</span>}

      {visiblePages.map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            border: num === currentPage ? '2px solid #0d6efd': '0px',
            backgroundColor: num === currentPage ? '#FFD700' : 'white', 
            color: num === currentPage ? '#000' : '#000', 
            fontWeight: 'bold',
          }}
        >
          {num}
        </button>
      ))}
      
      {endPage < totalPages && <span className="d-flex align-items-center px-2">...</span>}

      {currentPage < totalPages && (
        <button
          className="btn btn-sm"
          onClick={() => goToPage(currentPage + 1)}
          style={{
            color: '#000',
            backgroundColor: 'white',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: 'bold',
          }}
        >
          &raquo;
        </button>
      )}
    </div>
  );
}
