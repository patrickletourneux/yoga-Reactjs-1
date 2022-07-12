// == Import
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeSearchText } from './actions';

import Header from './components/Header';
import Listcard from './components/Listcard';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import data from './data/yoga_api';
// import reactLogo from './react-logo.svg';

import './styles.css';

// == Composant
function App() {
  const dispatch = useDispatch();

  const allPositions = useSelector((state) => state.allPositions);
  const searchText = useSelector((state) => state.searchText);

  const [filteredPositions, setfilteredPositions] = useState(allPositions);
  const [favoritesPositions, setfavoritesPositions] = useState([]);
  const [detailCard, setdetailCard] = useState([]);
  // const [searchText, setsearchText] = useState('');


  const handleDeleteFilter = (event) => {
    console.log('handleDeleteFilter');
    setfilteredPositions(allPositions);
    const action = changeSearchText('');
    dispatch(action);
    // setsearchText('');
  }
  
  const handlesearchTextChange = (event) => {
    console.log('handlesearchTextChange');
    event.preventDefault();
    // setsearchText(event.target.value);
    const action = changeSearchText(event.target.value);
    dispatch(action);
  };
  const handlesubmitSearchText = (event) => {
    console.log('handlesubmitSearchText');
    event.preventDefault();
    console.log(searchText);
    const filteredPositionsSanskrit = allPositions.filter((item) => {
      return item.sanskrit_name.toLowerCase().includes(searchText.toLowerCase())
    });
    const filteredPositionsEnglish = allPositions.filter((item) => {
      return item.english_name.toLowerCase().includes(searchText.toLowerCase())
    });
    const filteredPositionsSanskritEnglish = [...filteredPositionsSanskrit,...filteredPositionsEnglish];
    const filteredPositionsSanskritEnglishwithoutDouble = [...new Set(filteredPositionsSanskritEnglish)]
    setfilteredPositions([...filteredPositionsSanskritEnglishwithoutDouble]);
  };

  const handleAddFavoritesPositions = (event) => {
    console.log('clic add');
    const position = allPositions.find((item) => item.id.toString() === event.target.id);
    let positions = [...favoritesPositions];
    positions.push(position);
    // delete double
    positions = [...new Set(positions)];
    setfavoritesPositions(positions);
    // setsearchText('');
    console.log('favoritesPositions ', favoritesPositions);
  };

  const handleDeleteFavoritesPositions = (event) => {
    // delete the position selected
    console.log('clic delete');
    const positions = favoritesPositions.filter((item) => item.id.toString() !== event.target.id);
    setfavoritesPositions(positions);
    console.log('favoritesPositions ', favoritesPositions);
  };

  const handleDetailCard = (event) => {
    // changeDetailCard
    console.log('clic detail ', event.target.id);
    const position = allPositions.find((item) => item.id.toString() === event.target.id);
    setdetailCard(position);
    console.log('detailCard ', detailCard);
  };

  useEffect(() => {
    console.log('APP NOUVEAU RENDU');
    console.log('filteredPositions ',filteredPositions);
 
  });

  return (
    <div className="app">
      {/* <img src={reactLogo} alt="react logo" /> */}
      {/* <h1>Composant : App</h1> */}
      <Header />
      <Routes>
        <Route
          exact
          path=""
          element={(
            <Listcard
              data={filteredPositions}
              addToFavoritesPositions={handleAddFavoritesPositions}
              seeDetailCardOnClick={handleDetailCard}
              homePage
              onSubmitSearchText={handlesubmitSearchText}
              onSearchTextChange={handlesearchTextChange}
              searchText={searchText}
              filteredPositions={filteredPositions}
              handleDeleteFilter = {handleDeleteFilter}
            />
          )}
        />
        <Route
          exact
          path="/favorites"
          element={(
            <Listcard
              data={favoritesPositions}
              deleteToFavoritesPositions={handleDeleteFavoritesPositions}
              seeDetailCardOnClick={handleDetailCard}
              favoritesPage
            />
          )}
        />
        <Route
          exact
          path="/singleCard"
          element={(
            <div>
              details Page of the posture
              <Listcard
                data={[detailCard]}
                seeDetailCardOnClick={handleDetailCard}
                detailPage
              />
            </div>
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

// == Export
export default App;
