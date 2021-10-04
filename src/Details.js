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
    const { title, webImage, scLabelLine, plaqueDescriptionEnglish} = result;
    return(
      <div className="flexDetailContent">


          <div className="detailImageContainer">
            <img src={webImage?.url} alt={title} className="detailImage"/>
          </div>

          <div className="detailTextContainer">
            {/* <div className="centerInnerContainer"> */}
              <h1 className="titleOfImage">{title}</h1>
              <p className="labelOfImage">{scLabelLine}</p>
              <p className="descriptionOfImage">{plaqueDescriptionEnglish}</p>
              <div>
              <Link to="/">
                <button className="button2">BACK</button>
              </Link>
              </div>
            {/* </div> */}
          </div> 


      </div>
    )
  }
}

export default Details;