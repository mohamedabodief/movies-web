'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/cardHomePage';
import Pagination from '@/components/pagination/index2';

export default function NowPlayingList() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=76fb730da20c26bcd7d05575d7dcf0c6&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results.slice(0, limit));
        setTotalPages(data.total_pages);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div className='d-flex justify-content-center align-items-center h-100 py-5 my-5'><p className='fs-3 fw-bold text-danger'>Loading movies...</p></div>;

  return (
    <>
      <section className="now-playing-section my-5">
        <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 py-3">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
