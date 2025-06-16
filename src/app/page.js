import Image from 'next/image';
import styles from './page.module.css';
import { Button, Form } from 'react-bootstrap';
import card from '@/components/cardHomePage';

export default async function Home() {
  // Fetching the now playing movies from TMDB API
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=76fb730da20c26bcd7d05575d7dcf0c6&language=en-US`
  );
  const data = await res.json();
  const allMovies = data.results;

  return (
    <div className="m-5">
      <section
        className="search-section p-5"
        style={{
          backgroundColor: '#F3F1F1',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        <h1 className="text-3xl font-bold py-3">Welcome to Our Movie App</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <div className="py-3 d-flex gap-4">
          <Form.Control
            type="text"
            id="searchInput"
            placeholder="Search and explore...."
            aria-describedby="searchHelpBlock"
            className="fs-5"
          />
          <Button className="px-5" type="submit" variant="warning">
            Search
          </Button>
        </div>
      </section>
      <section className="now-playing-section my-5">
        <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 py-3">
          {allMovies.map((movie) => card(movie))}
        </div>
      </section>
    </div>
  );
}
