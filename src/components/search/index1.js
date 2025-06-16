
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
function Search() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const goToSearch = () => {
    if (input.trim()) {
      router.push(`/search?q=${input}`);
    }
  };

  return (
    <>
    {/* add div */}
    <div className='input-group w-100'>
          <Form.Control
                 type="text"
                 id="searchInput"
                 placeholder="Search and explore...."
                 aria-describedby="searchHelpBlock"
                 className="fs-5"
                 value={input}
                 onChange={(e)=>{
                    setInput(e.target.value)
                 }}
               />

               <Button className="px-5" type="submit" variant="warning" style={{backgroundColor:'#FFE353'}} onClick={goToSearch}>
                 Search
               </Button>
    </div>
     
    </>
  );
}

export default Search;
