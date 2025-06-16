'use client';
import Search from '@/components/search/index1';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Card from '@/components/cardHomePage';
function Page() {
  const searchParams = useSearchParams();
  const searchWord = searchParams.get('q');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(searchWord || '');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        if (!input) {
          setResult([]);
          return;
        }

        setLoading(true);
        try {
          const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=76fb730da20c26bcd7d05575d7dcf0c6&language=en-US');
          const data = await res.json();
          const filterItems = data.results.filter((item) =>
            item.title.toLowerCase().includes(input.toLowerCase())
          );
          setResult(filterItems);
        } catch (error) {
          console.error(error);
          setResult([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 100); 

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <div className="container py-5">
      <Form className="input-group w-100 mb-4">
        <Form.Control
          type="text"
          placeholder="Search and explore...."
          className="fs-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="px-5" variant="warning" style={{ backgroundColor: '#FFE353' }} type="button">
          Search
        </Button>
      </Form>
      {loading && <div className=" mt-5 fw-bold fs-3 text-center p-5"> <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div></div>}

      {!loading && result.length === 0 && input && (
        <p className="text-danger mt-5 fw-bold fs-3 text-center p-5">No results found</p>
      )}

      <div className="row h-100 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 py-3">
        {result.map((item) => (
          <div key={item.id} className="col-md-3">
            <Card movie={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
