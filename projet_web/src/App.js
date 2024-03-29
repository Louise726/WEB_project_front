import './App.css';
import './transition.css';
import React, { createContext, useState,useEffect} from 'react';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import 'whatwg-fetch';
import { CSSTransition } from 'react-transition-group';
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
        const response = await axios.get('/api/arts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const easy = data.filter(item => item.level === 'facile').map(item => item._id);
    const medium = data.filter(item => item.level === 'moyen').map(item => item._id);
    const hard = data.filter(item => item.level === 'difficile').map(item => item._id);
    
    setEasyIds(easy);
    setMediumIds(medium);
    setHardIds(hard);
  }, [data]);

  // concernant l'affichage
  const[showStart, setShowStart] = useState(true);
  const[showChoice, setShowChoice] = useState(false);
  const[showGame, setShowGame] = useState(false);
  
  const [username, setUsername] = useState('');
  const [showLog, setShowLog] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [viewedArts, setViewedArts] = useState([]);

  // choix level
  const [level, setLevel] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  
  // jeu
  const [hint, setHint] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false); 
  const [inputDisabled, setInputDisabled] = useState(false);
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
  
  const ShowChoice = () => {
    setShowChoice(true);
  }
  
  const ShowGame = () => {
    setShowStart(false);
    setShowChoice(false);
    setShowGame(true);
  }
  
  // différents niveaux
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
      setSelectedData(maybeData);
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
      setSelectedData(maybeData);
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
      while (maybeData === selectedData) {
        const randomIndex = Math.floor(Math.random() * hardIds.length);
        const selectedId = hardIds[randomIndex];
        maybeData = data.find(item => item._id === selectedId);
      }
    }
    if (maybeData) {
      setSelectedData(maybeData);
      console.log(maybeData)
      ShowGame();
    } else {
      console.error('No data found for selected ID:', selectedId);
    }
  }

  // mettre à jour les réponses de l'utilisateur
  const handleInputChange = (e, key) => {
    setUserAnswers({ ...userAnswers, [key]: e.target.value });
  };
  
  // gestion des indices
  const handleHint = (info) => {
    setHint(hint + 1)
    alert(info);
  }

  const retirerAccents = str => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // calcul du score en fonction des réponses 
  const handleSubmission = () => {
    
    const scoreGet = 
      (retirerAccents(userAnswers.title).toLowerCase() === retirerAccents(selectedData.title).toLowerCase() ? 100 : 0 )+
      (retirerAccents(selectedData.artist).toLowerCase().includes(retirerAccents(userAnswers.artist).toLowerCase()) && retirerAccents(userAnswers.artist).toLowerCase() !== "" && retirerAccents(userAnswers.artist).toLowerCase() !== " "? 100 : 0) +
      (userAnswers.date > selectedData.date-5 && userAnswers.date < selectedData.date+5 ? 100 : 0) -
      hint * 50 ;

    const alreadyViewed = viewedArts.some(art => art._id === selectedData._id);

    if (!alreadyViewed) {
      setViewedArts(prevArts => [...prevArts, { _id: selectedData._id, title: selectedData.title, artist: selectedData.artist, score: scoreGet}]);
    }
    
    setShowAnswer(true)
    setScoreRound(scoreGet);  
    setInputDisabled(true);
  };

  // passez à l'oeuvre suivante
  const handleNext = () => {

    setShowAnswer(false);
    if (level === 'easy') {
      EasyGame()
    } else if (level === 'medium') {
      MediumGame()
    } else if (level === 'hard') {
      HardGame()
    }
    
    setUserAnswers({ title: '',artist: '', date: ''}); 
    setInputDisabled(false);
    setScoreRound(0);
    setHint(0);
  };

  const policestyle = {
    fontFamily: "Monotype Corsiva",
    fontSize : '30px'
  }
  
  return (
    <div className="backGround">
      {/* show the start page */}
      {showStart && !showGame && (
        <div className="centered">
          <div className="sliding-images-container">
            <div className="sliding-images" />
          </div>
          {/* introduction */}
          <CSSTransition
            in={showStart && !showChoice && !showLog && !showSignup}
            timeout={300}
            classNames="component"
            unmountOnExit
          >
            <div className="start-container" style={policestyle}>
              <div className="logo-title"></div>
              <div className="intro-box">
                <div className="intro-content" style={policestyle}>
                  Révelez votre flair artistique
                </div>
              </div>
              <button className="buttonStart" onClick={ShowSignup}>
                Inscription
              </button>
              <button className="buttonStart" onClick={ShowLog}>
                Connexion
              </button>
            </div>
          </CSSTransition>
          {/* show the login interface */}
          <CSSTransition
            in={showLog}
            timeout={300}
            classNames="component"
            unmountOnExit
          >
            <AuthContext.Provider value={{isLoggedIn,login_signup, username }}>
              {isLoggedIn ? null: <Login onClose={() => setShowLog(false)} />}
            </AuthContext.Provider>
          </CSSTransition>

          {/* show the signup interface */}
          <CSSTransition
            in={showSignup}
            timeout={300}
            classNames="component"
            unmountOnExit
          >
            <AuthContext.Provider value={{isLoggedIn,login_signup, username }}>
              {isLoggedIn ? null: <Signup onClose={() => setShowSignup(false)} />}
            </AuthContext.Provider>
          </CSSTransition>

          {/* show the choice */}
          <CSSTransition
            in={showChoice}
            timeout={300}
            classNames="component"
            unmountOnExit
          >
            <div className="choice-button-container">
              <button className="choice-button-easy" onClick={EasyGame}>
                Facile
              </button>
              <button className="choice-button-medium" onClick={MediumGame}>
                Moyen
              </button>
              <button className="choice-button-hard" onClick={HardGame}>
                Difficile
              </button>
              <button className="exit-button" onClick={ShowStart}>
                Quitter
              </button>
            </div>
          </CSSTransition>
        </div>
      )}

      {/* show the game page */}
      {showGame && !showStart && !showChoice && (
      <div>  
        <div className="game-title"></div>
          <div className="centered-game">
            {}
            <div className="logo"></div>
            <div>
              <img src={selectedData.image} alt="Artwork" height="300" />
            </div>
            <div className="row">
              <input
                type="text"
                value={userAnswers.title}
                disabled={showAnswer || inputDisabled}
                placeholder="Titre"
                className="inputCustom"
                style={{ marginRight: "10px" }}
                onChange={(e) => handleInputChange(e, "title")}
              />
              <button
                className="buttonHint"
                onClick={() => handleHint(selectedData.title_hint)}
              >
                Indice
              </button>
              {showAnswer &&
                retirerAccents(userAnswers.title).toLowerCase() !==
                  retirerAccents(selectedData.title).toLowerCase() && (
                  <div className="answer">{selectedData.title}</div>
                )}
            </div>
            <div className="row">
              <input
                type="text"
                value={userAnswers.artist}
                disabled={showAnswer || inputDisabled}
                className="inputCustom"
                placeholder="Artiste"
                style={{ marginRight: "10px" }}
                onChange={(e) => handleInputChange(e, "artist")}
              />
              <button
                className="buttonHint"
                onClick={() => handleHint(selectedData.artist_hint)}
              >
                Indice
              </button>
              {showAnswer &&
                retirerAccents(userAnswers.artist).toLowerCase() !==
                  retirerAccents(selectedData.artist).toLowerCase() && (
                  <div className="answer">{selectedData.artist}</div>
                )}
            </div>
            <div className="row">
              <input
                type="text"
                value={userAnswers.date}
                disabled={showAnswer || inputDisabled}
                className="inputCustom"
                placeholder="Année (à + ou - 5 ans)"
                style={{ marginRight: "10px" }}
                onChange={(e) => handleInputChange(e, "date")}
              />
              <button
                className="buttonHint"
                onClick={() => handleHint(selectedData.date_hint)}
              >
                Indice
              </button>
              {showAnswer &&
                userAnswers.date !== String(selectedData.date) && (
                  <div className="answer">{selectedData.date}</div>
                )}
            </div>
            <div className="row">
              {!inputDisabled &&
              <button className="button" disabled={inputDisabled} onClick={handleSubmission}>
                Valider
              </button>}
              {inputDisabled &&
              <button className="button" onClick={handleNext}>
                Suivant
              </button>}
            </div>
            <div className="row">
              <div className={inputDisabled ? "score-box visible" : "score-box"}>
                <div className="scoreround">Score: {scoreRound}</div>
              </div>
            </div>
          </div>

          <div className={inputDisabled ? "extraInfor visible" : "extraInfor"}>
            <div className="infor-title">Informations complémentaires</div>
            <div className="inforcontent">{selectedData.more_info}</div>
          </div>

          {/* Display welcome message and username */}
          <div className="welcome-message" style ={policestyle}>
            Bienvenue {username} dans notre galerie d'art !
          </div>
          
          <div className="viewed-arts-container">
            <div className='viewed-arts-title'>Les oeuvres que vous avez vues :</div>
            <div className='viewed-arts-content'>     
                {viewedArts.map(art => (
                  <li key={art._id}>{art.title} - {art.artist} - {art.score} point(s)</li>
                ))}
            </div>
          </div> 
          
            <button className="return-button" onClick={ShowStart}>
              Retour
            </button>
            <button className="exit-button" onClick={ShowStart}>
              Quitter
            </button>


        </div>
      )}
    </div>
  );
}

export default Game;

