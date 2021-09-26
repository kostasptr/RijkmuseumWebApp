import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './Home.css';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({artObjects: [], count: 0});
  const [query, setQuery] = useState("Rembrandt");
  const [page, setPage] = useState(1);

  const key = "sbWDOeax";
  useEffect(() => {
    const fetchUrl = () => {
      console.log(query);
      fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${key}&q=${query}&p=${page}`)
      .then(response => response.json())
      .then((result) => {
        setIsLoaded(true);
        console.log(result);
        setItems(result);
      });
    };

    if (query === "Rembrandt") {
      fetchUrl();
    } else {
      //setTimeout returns an id
      const timerId = setTimeout(() => {
        fetchUrl();
      }, 500);

      // this where we do clean up
      return () => { clearTimeout(timerId); }
    }
  }, [query, page]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const {artObjects, count} = items; 
    return(
      <div className="center">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}/>

        {artObjects.map((item) => (
          <div key={item.id} className="center margin1">
            <h3 className="margin0">{item.principalOrFirstMaker}</h3>
            <p className="margin0"><Link to={`/details/${item.objectNumber}`}>{item.title}</Link></p>
          </div>
        ))}

        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(count/10)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={(data) => setPage(data.selected+1)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          initialPage={0}
        />
      </div>
    )
  }
}

export default Home;