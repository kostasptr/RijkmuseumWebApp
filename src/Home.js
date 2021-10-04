import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './Home.css';
import Museum from './images/image-header3.jpg';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({artObjects: [], count: 0, facets: []});
  const [language, setLanguage] = useState("en");
  const keyAPI = "sbWDOeax";
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [principalMaker, setPrincipalMaker] = useState("");
  const [typeOfObject, setTypeOfObject] = useState("");
  const [materialOfObject, setMaterialOfObject] = useState("");
  const [techniqueOfObject, setTechniqueOfObject] = useState("");
  const [periodOfObject, setPeriodOfObject] = useState("");
  const [colorOfObject, setColorOfObject] = useState("");

  const clearFilterData = () => {
    setPrincipalMaker("");

  };

  useEffect(() => {
    const fetchUrl = () => {
      console.log(query);
      fetch(`https://www.rijksmuseum.nl/api/${language}/collection?key=${keyAPI}&p=${page}&ps=${resultsPerPage}&q=${query}&involvedMaker=${principalMaker}&type=${typeOfObject}&material=${materialOfObject}&technique=${techniqueOfObject}&f.dating.period=${periodOfObject}&f.normalized32Colors.hex=${colorOfObject}`)
      .then(response => response.json())
      .then((result) => {
        setIsLoaded(true);
        console.log(result);
        setItems(result);
      });
    };

    if (query === "") {
      fetchUrl();
    } else {
      //setTimeout returns an id
      const timerId = setTimeout(() => {
        fetchUrl();
      }, 500);

      // this where we do clean up
      return () => { clearTimeout(timerId); }
    }
  }, [language, page, resultsPerPage, query, principalMaker, typeOfObject, materialOfObject, techniqueOfObject, periodOfObject, colorOfObject]);



  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const {artObjects, count, facets} = items;
    // console.log(facets[5]?.facets.map(x => x.key));
    return(
      <div>
        <div className="headerFlex">
          <p className="webpageTitle">Rijksmuseum's API</p>
          <div className="imageContainer">
            <img className="webpageImage" src={Museum} alt="Rijksmuseum draw"/>
          </div>
        </div>

        <div className="contentFlex">

          <div className="inputParameters">

            <p className="textOfSelections">Write your search term</p>
            <input
              autoFocus
              placeholder="e.g. Rembrandt"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            <p className="textOfSelections">Select your language</p>
            <div className="radioGroup">
              <input type="radio" id="EN" name="fav_language" value="en" onChange={e => setLanguage(e.target.value)}/>
              <label htmlFor="EN" className="labels">English</label>
            </div>
            <div className="radioGroup">
              <input type="radio" id="NL" name="fav_language" value="nl" onChange={e => setLanguage(e.target.value)}/>
              <label htmlFor="NL" className="labels">Netherlands</label>
            </div>

            <p className="textOfSelections">Principal Maker</p>
            <select className="formSelect" onChange={e => setPrincipalMaker(e.target.value)}>
            {/* for (index=0; index<facets.length; index++) {
              <option key={index} value={facets[index].key}>
                facets[index].key
              </option>
            } */}
            <option value="">
              All
            </option>
            {facets[0]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}

              {/* {facets[0]?.facets
                .map(x => x.key)
                .sort()
                .map((x, index) => (
                  <option key = {index} value={x}>
                {x}
                </option>
                ))
              } */}
            </select>

            <p className="textOfSelections">Type of object</p>
            <select className="formSelect" onChange={e => setTypeOfObject(e.target.value)}>
            <option value="">
              All
            </option>
            {facets[1]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select>
            
            <p className="textOfSelections">Dating Period of object</p>
            <select className="formSelect" onChange={e => setPeriodOfObject(e.target.value)}>
            <option value="">
              All
            </option>
            {facets[2]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select>
            
            {/* <p className="textOfSelections">Place of object</p>
            <select className="formSelect">
            {facets[3]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select> */}

            <p className="textOfSelections">Material of object</p>
            <select className="formSelect" onChange={e => setMaterialOfObject(e.target.value)}>
            <option value="">
              All
            </option>
            {facets[4]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select>

            <p className="textOfSelections">Technique of object</p>
            <select className="formSelect" onChange={e => setTechniqueOfObject(e.target.value)}>
            <option value="">
              All
            </option>
            {facets[5]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select>

            <p className="textOfSelections">Color of object</p>
            <select className="formSelect" onChange={e => setColorOfObject(e.target.value)}>
            <option value="">
              All
            </option>
            {facets[6]?.facets.map((x, index) => (
                <option key = {index} value={x.key}>
                {x.key}
                </option>
              ))}
            </select>
            
            <p className="textOfSelections">Results per page</p>
            <select className="formSelect" onChange={e => setResultsPerPage(e.target.value)}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            {/* <button className="button1" value=""
              onClick={e => setQuery(e.target.value)}>Reset
            </button> */}
            
            <button className="button1" value=""
              onClick={clearFilterData}>Reset
            </button>
            
            
          </div>

          <div className="resultsOfParameters">
            <div className="objectsResults">
              {artObjects.map((item) => (
                <div key={item.id}>
                  <div>
                    <img src={item.webImage?.url} alt={item.title} className="containedImage" />
                  </div>
                  <h3 className="headings">{item.principalOrFirstMaker}</h3>
                  <p className="headings"><Link to={`/details/${item.objectNumber}`}>{item.title}</Link></p>
                </div>
              ))}
            </div>
          
            <div>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(count/resultsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(data) => setPage(data.selected+1)}
                containerClassName={'pagination'}
                activeClassName={'active'}
                initialPage={0}
              />
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Home;