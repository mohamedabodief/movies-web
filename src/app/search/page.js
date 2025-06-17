// app/search/page.js (Server Component)
import React, { Suspense } from 'react';
import SearchClient from '@/components/SearchClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center p-5">Loading search page...</p>}>
      <SearchClient />
    </Suspense>
  );
}
