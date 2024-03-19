import './App.css';
import React, { useState, useEffect } from 'react';


const xappToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI3MWQzNzM0Zi0xMDdjLTQwNDctYjIxYi03ZTU0YTBlNzYwYmMiLCJleHAiOjE3MTEwMzk3NzksImlhdCI6MTcxMDQzNDk3OSwiYXVkIjoiNzFkMzczNGYtMTA3Yy00MDQ3LWIyMWItN2U1NGEwZTc2MGJjIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY1ZjMyYWEzYWJhMjFiMDAwZDM5N2VkNCJ9.7DO8ErU2wLmmU08k3tL4mv_0obfIS0GMS_j9pwduB9M';
const URL = 'https://api.artsy.net/api/artists/4d8b92b34eb68a1b2c0003f4' //andy warhol
//const URL = 'https://api.artsy.net/api/artists/leonardo-da-vinci' //léonard de vinci

function App() {

  const [attributs, setAPI] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        method : 'GET',
        headers : {
          'X-Xapp-Token': xappToken
        },
      })
        .then(response => response.json())
        .then(response => {
          setAPI(response)
        })
    }
    fetchData();
  }, []); // on rajoute des brackets vide pour n'appeler l'API qu'une seule fois

  return (
    <div className="App">
      {attributs.name} est né en {attributs.birthday} à {attributs.hometown}
    </div>
  )
}



const imageData = [
  {
    url: 'url_to_image1',
    artist: 'Artist 1',
    date: 'Date 1',
    type: 'Type 1'
  },
  {
    url: 'url_to_image2',
    artist: 'Artist 2',
    date: 'Date 2',
    type: 'Type 2'
  },
  
];

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { url, artist, date, type } = imageData[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex(currentIndex === imageData.length - 1 ? 0 : currentIndex + 1);
  };
  

  return (
   <div className = "backGround"> 
    <div className="centered"> {}
      <h1>Guessing Game</h1>
      <div className = "row">
        <img src={url} alt="Artwork" />
      </div>
      <div className = "row">
        <label>Artist: </label>
        <input type="text" disabled={showAnswer} className = "inputCustom" style = {{marginRight : "10px"}}/>
        <button className="buttonHint" onClick={() => alert(artist)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {artist}</div>}
      </div>
      <div className = "row">
        <label>Date: </label>
        <input type="text" disabled={showAnswer} className = "inputCustom" style = {{marginRight : "10px"}}/>
        <button className="buttonHint" onClick={() => alert(date)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {date}</div>}
      </div>
      <div className = "row">
        <label>Type: </label>
        <input type="text" disabled={showAnswer} className = "inputCustom" style = {{marginRight : "10px"}}/>
        <button className="buttonHint" onClick={() => alert(type)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {type}</div>}
      </div>
      <div className = "row" style ={{marginLeft:"40px"}}>
        <button className = "button" onClick={() => setShowAnswer(true)} style= {{marginRight : "25px"}}>Show Answer</button>
        <button className = "button" onClick={handleNext}>Next</button>
      </div>
    </div>
    <div className="ranking-container">
        <div className="ranking-title">Ranking</div>
        <div className="ranking-list">
          {/* create 10 rows */}
          {[...Array(10)].map((_, index) => (
            <div className="ranking-item" key={index}>
              <span>#{index + 1}</span>
              <span>Score</span>
            </div>
          ))}
        </div>
    </div>
  </div>
  );
};

export default Game;

