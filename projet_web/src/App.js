import './App.css';
import React, { useState, useEffect } from 'react';

const xappToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiIyYWI0YWQwMS0yNzVhLTQxMDQtYjZlOC1mOTYyMjc3Mzk4ZTAiLCJleHAiOjE3MTE3MDczODAsImlhdCI6MTcxMTEwMjU4MCwiYXVkIjoiMmFiNGFkMDEtMjc1YS00MTA0LWI2ZTgtZjk2MjI3NzM5OGUwIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY1ZmQ1YTc0NDVjNjE1MDAwYjRkNzFkZCJ9.nVFYDBd7LIpr9ovqPJnk6hOWhCAduwrD6RnuUYNqAf8';
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
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Les_Deux_S%C5%93urs_ou_Sur_la_Terrasse.jpg/390px-Les_Deux_S%C5%93urs_ou_Sur_la_Terrasse.jpg',
    title: 'Title 1',
    artist: 'Artist 1',
    date: 'Date 1',
    info: 'Info on painting 1'
  },
  {
    url: 'url_to_image2',
    title: 'Title 2',
    artist: 'Artist 2',
    date: 'Date 2',
    info: 'Info on painting 2'
  },
  {
    url: 'url_to_image3',
    title: 'Title 3',
    artist: 'Artist 3',
    date: 'Date 3',
    info: 'Info on painting 3'
  },
  {
    url: 'url_to_image4',
    title: 'Title 4',
    artist: 'Artist 4',
    date: 'Date 4',
    info: 'Info on painting 4'
  }
  
];

const Game = () => {
  const[showStart, setShowStart] = useState(true);
  const[showChoice, setShowChoice] = useState(false);
  const[showGame, setShowGame] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  
  const [showAnswer, setShowAnswer] = useState(false); 
  const [inputDisabled, setInputDisabled] = useState(false);
  
  const { url, title, artist, date, info } = imageData[currentIndex];
  
  const [userRank, setUserRank] = useState({ rank: 111, score: 11 });
  const [scoreRound, setScoreRound] = useState(0);
  const [userAnswers, setUserAnswers] = useState({
    title: '',
    artist: '',
    date: '',
  });

  
  // fonctions to show the different pages
  const ShowStart = () => {
    setShowStart(true);
    setShowChoice(false);
    setShowGame(false);
  }
  
  const ShowChoice = () => {
    setShowChoice(true);
  }
  
  const ShowGame = () => {
    setShowStart(false);
    setShowChoice(false);
    setShowGame(true);
  }
  
  const EasyGame = () => {
    // easymode()
    ShowGame();
  }

  const MediumGame = () => {
    // mediummode()
    ShowGame();
  }

  const HardGame = () => {
    // hardmode()
    ShowGame();
  }

  

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
    {/* show the start page */}
    {showStart && !showGame && (
      <div className="centered">
        <div className="sliding-images-container">
          <div className="sliding-images" />
        </div>
      {/* introduction */}
      {!showChoice && (
        <div className="start-container">
          <div className="start-title">Artwork Guessing</div>
          <div className="intro-box">
            <div className="intro-content">Introduction here, auto new-line </div>
          </div>
          <button className="buttonStart" onClick={ShowChoice}>Start Game</button>
        </div>
      )}
      {/* show the choice */}
      {showChoice && (
        <div className="choice-button-container">
          <button className="choice-button-easy" onClick={EasyGame}>Easy</button>
          <button className="choice-button-medium" onClick={MediumGame}>Medium</button>
          <button className="choice-button-hard" onClick={HardGame}>Hard</button>
        </div>
      )}
      </div>
    )}
    

    

    {/* show the game page */}
    {showGame && !showStart && !showChoice && (    
      <div>  
        <h1>Art Guessr</h1>
        <div className="centered"> {}
          <div className = "row">
            <img src={url} alt="Artwork" height="200" className={nextIndex !== currentIndex ? "fade-out" : ""}/>
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
                <div className='scoreround'>Score of this round: {scoreRound}</div>
              </div>
            )}
          </div>
        </div>
        
        {/* show the ranking */}
        {/*
        <div className="ranking-container">
            <div className="ranking-title">Ranking</div>
            <div className="ranking-list">
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
        */}
        
        <div className="extraInfor"> 
            <div className="infor-title">Extra Information</div>
            <div className="inforcontent">{info}</div>
        </div>

        <button className="exit-button" onClick={ShowStart}>Exit</button>
      </div>
    )}
  </div>
  );
}

export default Game;

