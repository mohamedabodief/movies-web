import React, { Suspense } from 'react';
import Search from '@/components/search/index1';
import NowPlayingList from '@/components/NowPlayingList';

export default function Home() {
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
          <Search />
        </div>
      </section>


      <Suspense fallback={<p>Loading now playing movies...</p>}>
        <NowPlayingList />
      </Suspense>
    </div>
  );
}




