import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const key = "sbWDOeax";
  useEffect(() => {
  fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${key}&q=Rembrandt`)
          .then(response => response.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              console.log(result);
            })
          // .then((data) => console.log(data));
  },[])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
  
    return(
        <h1>{items}</h1>
    )
    }
  
}
  export default App;