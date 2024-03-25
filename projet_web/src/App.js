import './App.css';
import React, { useState, useEffect } from 'react';


/*const URL = 'https://api.artsy.net/api/artists/4d8b92b34eb68a1b2c0003f4' //andy warhol
//const URL = 'https://api.artsy.net/api/artists/leonardo-da-vinci' //léonard de vinci

function App() {

  const [attributs, setAPI] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        method : 'GET',
        headers : {
          'X-Xapp-Token': process.env.TOKEN
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
}*/

const imageData = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Les_Deux_S%C5%93urs_ou_Sur_la_Terrasse.jpg/390px-Les_Deux_S%C5%93urs_ou_Sur_la_Terrasse.jpg',
    title: 'Title 1',
    artist: 'Artist 1',
    date: 'Date 1',
    info: 'Info on painting 1'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/1024px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg',
    title: 'Le radeau de la méduse',
    artist: 'Théodore Géricault',
    date: '1819',
    info: 'Info on painting 2'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg/390px-Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg',
    title: 'Title 3',
    artist: 'Artist 3',
    date: 'Date 3',
    info: 'Info on painting 3'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg/390px-Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg',
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
  const [hint, setHint] = useState(0);

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
    setScoreRound(0);
    setHint(0);
  };

  // handleInputChange function to update the userAnswers
  const handleInputChange = (e, key) => {
    setUserAnswers({ ...userAnswers, [key]: e.target.value });
  };

  const handleHint = (info) => {
    setHint(hint + 1)
    alert(info);
  }
  
  // handleSubmission function to calculate the score
  const handleSubmission = () => {
    const retirerAccents = str =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const scoreGet = 
      (retirerAccents(userAnswers.artist).toLowerCase() === retirerAccents(artist).toLowerCase() ? 100 : 0 )+
      (retirerAccents(userAnswers.date).toLowerCase() === retirerAccents(date).toLowerCase() ? 100 : 0) +
      (retirerAccents(userAnswers.title).toLowerCase() === retirerAccents(title).toLowerCase() ? 100 : 0) -
      hint * 50 ;
    
    setShowAnswer(true)
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
        <div className='game-title'>Art Guessr</div>
        <div className="centered-game"> {}
          <div>
            <img src={url} alt="Artwork" height="300" className={nextIndex !== currentIndex ? "fade-out" : ""}/>
          </div>
          <div className = "row">
            <input type="text" 
                  value={userAnswers.title}
                  disabled={showAnswer || inputDisabled} 
                  placeholder='Title' 
                  className = "inputCustom" 
                  style = {{marginRight : "10px"}}
                  onChange = {(e) => handleInputChange(e, 'title')}/>
            <button className="buttonHint" onClick={() => handleHint(title)}>Hint</button>
            {showAnswer && <div className="answer">Right answer: {title}</div>}
          </div>
          <div className = "row">
            <input type="text" 
                  value= {userAnswers.artist}
                  disabled={showAnswer || inputDisabled} 
                  className = "inputCustom" 
                  placeholder='Artist'
                  style = {{marginRight : "10px"}}
                  onChange= {(e) => handleInputChange(e, 'artist')}
                  />
            <button className="buttonHint" onClick={() => handleHint(artist)}>Hint</button>
            {showAnswer && <div className="answer">Right answer: {artist}</div>}
          </div>
          <div className = "row">
            <input type="text" 
                  value= {userAnswers.date}
                  disabled={showAnswer || inputDisabled} 
                  className = "inputCustom" 
                  placeholder='Date'
                  style = {{marginRight : "10px"}}
                  onChange = {(e) => handleInputChange(e, 'date')}
                  />
            <button className="buttonHint" onClick={() => handleHint(date)}>Hint</button>
            {showAnswer && <div className="answer">Right answer: {date}</div>}
          </div>
          <div className = "row" >
            <button className = "button" disabled={inputDisabled} onClick={handleSubmission} style={{marginRight:"10px"}}>Submit</button>
            <button className = "button" onClick={handleNext}>Next</button>
          </div>
          <div className="row">
              <div className={inputDisabled ? 'score-box visible' : 'score-box'}>
                <div className='scoreround'>Score: {scoreRound}</div>
              </div>
            
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
        
        <div className={inputDisabled? "extraInfor visible" : "extraInfor"}> 
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

