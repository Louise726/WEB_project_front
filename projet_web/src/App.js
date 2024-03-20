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
    title: 'Title 1',
    artist: 'Artist 1',
    date: 'Date 1',
  },
  {
    url: 'url_to_image2',
    title: 'Title 2',
    artist: 'Artist 2',
    date: 'Date 2',
  },
  {
    url: 'url_to_image3',
    title: 'Title 3',
    artist: 'Artist 3',
    date: 'Date 3',
  },
  {
    url: 'url_to_image4',
    title: 'Title 4',
    artist: 'Artist 4',
    date: 'Date 4', 
  }
  
];

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  
  const [showAnswer, setShowAnswer] = useState(false); 
  const [inputDisabled, setInputDisabled] = useState(false);
  
  const { url, title, artist, date } = imageData[currentIndex];
  
  const [userRank, setUserRank] = useState({ rank: 111, score: 11 });
  const [scoreRound, setScoreRound] = useState(0);
  const [userAnswers, setUserAnswers] = useState({
    title: '',
    artist: '',
    date: '',
  });


  // handleNext function to update the currentIndex and nextIndex
  const handleNext = () => {
    setShowAnswer(false);
    const nextIndex=currentIndex === imageData.length - 1 ? 0 : currentIndex + 1;
    setNextIndex(nextIndex);
    setTimeout(() => setCurrentIndex(nextIndex), 300);  // 300ms after the nextIndex is set, the currentIndex is updated,in order to show the transition effect
    setUserAnswers({ title: '',artist: '', date: ''}); 
    setInputDisabled(false);
  };

  // handleInputChange function to update the userAnswers
  const handleInputChange = (e, key) => {
    setUserAnswers({ ...userAnswers, [key]: e.target.value });
  };
  
  // handleSubmission function to calculate the score
  const handleSubmission = () => {
    const scoreGet = 
      (userAnswers.artist.toLowerCase() === artist.toLowerCase() ? 1 : 0 )+
      (userAnswers.date.toLowerCase() === date.toLowerCase() ? 1 : 0) +
      (userAnswers.title.toLowerCase() === title.toLowerCase() ? 1 : 0);
    
    setScoreRound(scoreGet);  
    setUserRank(prevState =>({
      ...prevState,
      score: prevState.score + scoreGet
    }));
    setInputDisabled(true);
  };

  return (
   <div className = "backGround"> 
    <h1>Guessing Game</h1>
    <div className="centered"> {}
      <div className = "row">
        <img src={url} alt="Artwork" height="400" className={nextIndex !== currentIndex ? "fade-out" : ""}/>
      </div>
      <div className = "row">
        <label>Title: </label>
        <input type="text" 
               value={userAnswers.title}
               disabled={showAnswer || inputDisabled} 
               className = "inputCustom" 
               style = {{marginRight : "10px"}}
               onChange = {(e) => handleInputChange(e, 'title')}/>
        <button className="buttonHint" onClick={() => alert(title)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {title}</div>}
      </div>
      <div className = "row">
        <label>Artist: </label>
        <input type="text" 
               value= {userAnswers.artist}
               disabled={showAnswer || inputDisabled} 
               className = "inputCustom" 
               style = {{marginRight : "10px"}}
               onChange= {(e) => handleInputChange(e, 'artist')}
               />
        <button className="buttonHint" onClick={() => alert(artist)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {artist}</div>}
      </div>
      <div className = "row">
        <label>Date: </label>
        <input type="text" 
               value= {userAnswers.date}
               disabled={showAnswer || inputDisabled} 
               className = "inputCustom" 
               style = {{marginRight : "10px"}}
               onChange = {(e) => handleInputChange(e, 'date')}
               />
        <button className="buttonHint" onClick={() => alert(date)}>Hint</button>
        {showAnswer && <div className="answer">Answer: {date}</div>}
      </div>
      <div className = "row" style ={{marginLeft:"40px"}}>
        <button className = "button" onClick={() => setShowAnswer(true)} style= {{marginRight : "10px"}}>Show Answer</button>
        <button className = "button" disabled={inputDisabled} onClick={handleSubmission} style={{marginRight:"10px"}}>Submit</button>
        <button className = "button" onClick={handleNext}>Next</button>
      </div>
      <div className="row">
        {inputDisabled && (
          <div className='custom-box'>
            <div className='extraInfor'>Score of this round: {scoreRound}</div>
            <div className='extraInfor'>Information of this image:</div>
            <div className='extraInfor'></div>
          </div>
        )}
      </div>
    </div>
    <div className="ranking-container">
        <div className="ranking-title">Ranking</div>
        <div className="ranking-list">
          {/* create 10 rows */}
          {[...Array(15)].map((_, index) => (
            <div className="ranking-item" key={index}>
              <span>#{index + 1}</span>
              <span>Score</span>
            </div>
          ))}
        </div>
        <div className="ranking-item user-rank">
            <span>#{userRank.rank}</span>
            <span>Score: {userRank.score}</span>
        </div>
    </div>
  </div>
  );
};

export default Game;

