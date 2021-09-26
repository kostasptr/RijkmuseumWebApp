import React, { useState, useEffect } from 'react';
import {
  Link,
  useParams
} from "react-router-dom";
import './Details.css';

function Details() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState({artObject: {}});
  let { id } = useParams();

  const key = "sbWDOeax";
  useEffect(() => {
    const fetchUrl = () => {
      fetch(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=${key}`)
      .then(response => response.json())
      .then((result) => {
        setIsLoaded(true);
        console.log(result);
        setResult(result.artObject);
      });
    };

    fetchUrl();
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const {principalMaker, title, webImage, scLabelLine, plaqueDescriptionEnglish} = result;
    return(
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>

        <h1 className="centered">{title}</h1>
        <h2 className="centered">{principalMaker}</h2>

        <img src={webImage?.url} alt={title} width="100%" />
        <p className="centered label">{scLabelLine}</p>

        <p className="description">{plaqueDescriptionEnglish}</p>
      </div>
    )
  }
}

export default Details;