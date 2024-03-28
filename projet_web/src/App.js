import './App.css';
import React, { createContext, useState,useEffect} from 'react';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import 'whatwg-fetch';
export const AuthContext = createContext();

const Game = () => {
  // connexion à la base de données
  const [data, setData] = useState([]);
  const [easyIds, setEasyIds] = useState([]);
  const [mediumIds, setMediumIds] = useState([]);
  const [hardIds, setHardIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/arts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrer les données par niveau et stocker les IDs dans les variables correspondantes
    const easy = data.filter(item => item.level === 'facile').map(item => item._id);
    const medium = data.filter(item => item.level === 'moyen').map(item => item._id);
    const hard = data.filter(item => item.level === 'difficile').map(item => item._id);
    
    setEasyIds(easy);
    setMediumIds(medium);
    setHardIds(hard);
  }, [data]);

  const[showStart, setShowStart] = useState(true);
  const[showChoice, setShowChoice] = useState(false);
  const[showGame, setShowGame] = useState(false);

  const [username, setUsername] = useState('');
  const [showLog, setShowLog] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [viewedArts, setViewedArts] = useState([]);
  
  const [selectedData, setSelectedData] = useState(null);
  const [level, setLevel] = useState(null);
  const [hint, setHint] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false); 
  const [inputDisabled, setInputDisabled] = useState(false);
  
  
  //const [userRank, setUserRank] = useState({ rank: "", score: null });
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

    setIsLoggedIn(false);
    setShowLog(false);
    setUsername('');

    setScoreRound(0);
    setHint(0);
    setShowAnswer(false);
    setInputDisabled(false);
    setUserAnswers({ title: '',artist: '', date: ''});
    //setCurrentIndex(0);
    //setNextIndex(0);
    setLevel(null);
    setSelectedData(null);
  }

  const ShowLog = () => {
    setShowLog(true);
  }

  const ShowSignup = () => {
    setShowSignup(true);
  }

  const login_signup= (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    setShowChoice(true);
    setViewedArts([]);
  }
  
  const ShowGame = () => {
    setShowStart(false);
    setShowChoice(false);
    setShowLog(false);
    setShowSignup(false);
    setShowGame(true);
  }
  
  const EasyGame = () => {
    setLevel('easy')
    const randomIndex = Math.floor(Math.random() * easyIds.length);
    const selectedId = easyIds[randomIndex];
    let maybeData = data.find(item => item._id === selectedId);
    if (selectedData !== null) {
      while (maybeData === selectedData) {
        const randomIndex = Math.floor(Math.random() * easyIds.length);
        const selectedId = easyIds[randomIndex];
        maybeData = data.find(item => item._id === selectedId);
      }
    }
    if (maybeData) {
      setSelectedData(maybeData); // Stockage des données sélectionnées dans l'état
      console.log(maybeData)
      ShowGame();
    } else {
      console.error('No data found for selected ID:', selectedId);
    }
  }

  const MediumGame = () => {
    setLevel('medium')
    const randomIndex = Math.floor(Math.random() * mediumIds.length);
    const selectedId = mediumIds[randomIndex];
    let maybeData = data.find(item => item._id === selectedId);
    if (selectedData !== null) {
      while (maybeData === selectedData) {
        const randomIndex = Math.floor(Math.random() * mediumIds.length);
        const selectedId = mediumIds[randomIndex];
        maybeData = data.find(item => item._id === selectedId);
      }
    }
    if (maybeData) {
      setSelectedData(maybeData); // Stockage des données sélectionnées dans l'état
      console.log(maybeData)
      ShowGame();
    } else {
      console.error('No data found for selected ID:', selectedId);
    }
  }

  const HardGame = () => {
    setLevel('hard')
    const randomIndex = Math.floor(Math.random() * hardIds.length);
    const selectedId = hardIds[randomIndex];
    let maybeData = data.find(item => item._id === selectedId);
    if (selectedData !== null){
      while (maybeData === selectedData || selectedData !== null) {
        const randomIndex = Math.floor(Math.random() * hardIds.length);
        const selectedId = hardIds[randomIndex];
        maybeData = data.find(item => item._id === selectedId);
      }
    }
    if (maybeData) {
      setSelectedData(maybeData); // Stockage des données sélectionnées dans l'état
      console.log(maybeData)
      ShowGame();
    } else {
      console.error('No data found for selected ID:', selectedId);
    }
  }

  // handleNext function to update the currentIndex and nextIndex
  const handleNext = () => {
    const alreadyViewed = viewedArts.some(art => art._id === selectedData._id);

    if (!alreadyViewed) {
      setViewedArts(prevArts => [...prevArts, { _id: selectedData._id, title: selectedData.title, artist: selectedData.artist }]);
    }

    setShowAnswer(false);
    if (level === 'easy') {
      EasyGame()
    } else if (level === 'medium') {
      MediumGame()
    } else if (level === 'hard') {
      HardGame()
    }
    //setNextIndex(nextIndex);
    //setTimeout(() => setCurrentIndex(nextIndex), 300);  // 300ms after the nextIndex is set, the currentIndex is updated,in order to show the transition effect
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

  const policestyle = {
    fontFamily: "Monotype Corsiva",
    fontSize : '30px'
  }
  
  // handleSubmission function to calculate the score
  const handleSubmission = () => {
    const retirerAccents = str =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const scoreGet = 
      (retirerAccents(userAnswers.artist).toLowerCase() === retirerAccents(selectedData.artist).toLowerCase() ? 100 : 0 )+
      (retirerAccents(userAnswers.date).toLowerCase() === retirerAccents(selectedData.date).toLowerCase() ? 100 : 0) +
      (retirerAccents(userAnswers.title).toLowerCase() === retirerAccents(selectedData.title).toLowerCase() ? 100 : 0) -
      hint * 50 ;
    
    setShowAnswer(true)
    setScoreRound(scoreGet);  
    /*setUserRank(prevState =>({
      ...prevState,
      score: prevState.score + scoreGet
    }));*/
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
      {!showChoice && !showLog && !showSignup &&(
        <div className="start-container">
          <div className="logo-title"></div>
          <div className="intro-box">
            <div className="intro-content"style ={policestyle}> Révelez votre flair artistique </div>
          </div>
          <button className="buttonStart1" onClick={ShowSignup}>Sign up</button>
          <button className="buttonStart2" onClick={ShowLog}>Login</button>
        </div>
      )}
      {/* show the login interface */}
      {showLog && (
        <AuthContext.Provider value={{isLoggedIn,login_signup, username }}>
          {isLoggedIn ? null: <Login onClose={() => setShowLog(false)} />}
        </AuthContext.Provider>
         
      )}

      {/* show the signup interface */}
      {showSignup && (
        <AuthContext.Provider value={{isLoggedIn,login_signup, username }}>
          {isLoggedIn ? null: <Signup onClose={() => setShowSignup(false)} />}
        </AuthContext.Provider>
         
      )}
    
      {/* show the choice */}
      {showChoice && (
        <div className="choice-button-container">
          <button className="choice-button-easy" onClick={EasyGame}>Facile</button>
          <button className="choice-button-medium" onClick={MediumGame}>Moyen</button>
          <button className="choice-button-hard" onClick={HardGame}>Difficile</button>
          <button className="exit-button" onClick={ShowStart}>Quitter</button>
        </div>
      )}
      </div>
    )}
    

    

    {/* show the game page */}
    {showGame && (    
      <div>  
        {/* Display welcome message and username */}
        <div className="welcome-message" style ={policestyle}>
          Bienvenue à {username} dans notre galerie d'art !
        </div>
        <div className="viewed-arts-container" style={{ ...policestyle, fontSize: '25px' }}>
          <div style={{ textAlign: 'center' }}>Les oeuvres que vous avez vu:</div>     
          <ul>
            {viewedArts.map(art => (
              <li key={art._id}>{art.title} - {art.artist}</li>
            ))}
          </ul>
        </div>
        <div className='game-title'></div>
        <div className="centered-game"> {}
          <div className="logo"></div>
          <div>
            <img src={selectedData.image} alt="Artwork" height="300"/>
          </div>
          <div className = "row">
            <input type="text" 
                  value={userAnswers.title}
                  disabled={showAnswer || inputDisabled} 
                  placeholder='Titre' 
                  className = "inputCustom" 
                  style = {{marginRight : "10px"}}
                  onChange = {(e) => handleInputChange(e, 'title')}/>
            <button className="buttonHint" onClick={() => handleHint(selectedData.title)}>Indice</button>
          </div>
          {showAnswer && <div className="answer">Bonne Réponse: {selectedData.title}</div>}
          <div className = "row">
            <input type="text" 
                  value= {userAnswers.artist}
                  disabled={showAnswer || inputDisabled} 
                  className = "inputCustom" 
                  placeholder='Artiste'
                  style = {{marginRight : "10px"}}
                  onChange= {(e) => handleInputChange(e, 'artist')}
                  />
            <button className="buttonHint" onClick={() => handleHint(selectedData.artist)}>Indice</button>
          </div>
          {showAnswer && <div className="answer">Bonne Réponse: {selectedData.artist}</div>}
          <div className = "row">
            <input type="text" 
                  value= {userAnswers.date}
                  disabled={showAnswer || inputDisabled} 
                  className = "inputCustom" 
                  placeholder='Date'
                  style = {{marginRight : "10px"}}
                  onChange = {(e) => handleInputChange(e, 'date')}
                  />
            <button className="buttonHint" onClick={() => handleHint(selectedData.date)}>Indice</button>
          </div>
          {showAnswer && <div className="answer">Bonne Réponse: {selectedData.date}</div>}
          <div className = "row" >
            <button className = "button" disabled={inputDisabled} onClick={handleSubmission} style={{marginRight:"10px"}}>Valider</button>
            <button className = "button" onClick={handleNext}>Suivant</button>
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
            <div className="infor-title">Informations complémentaires</div>
            <div className="inforcontent">{selectedData.more_info}</div>
        </div>

        <button className="exit-button" onClick={ShowStart}>Quitter</button>
      </div>
    )}
  </div>
  );
}

export default Game;

