import './App.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import 'whatwg-fetch';


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
  
  // choix level
  const [level, setLevel] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  
  // jeu
  const [hint, setHint] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false); 
  const [inputDisabled, setInputDisabled] = useState(false);
  //const [userRank, setUserRank] = useState({ rank: 111, score: 11 });
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
    setScoreRound(0);
    setHint(0);
    setShowAnswer(false);
    setInputDisabled(false);
    setUserAnswers({ title: '',artist: '', date: ''});
    setLevel(null);
    setSelectedData(null);
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
    //setTimeout(() => setCurrentIndex(nextIndex), 300);  // 300ms after the nextIndex is set, the currentIndex is updated,in order to show the transition effect
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
   <div className = "backGround"> 
    {/* show the start page */}
    {showStart && !showGame && (
      <div className="centered">
        <div className="sliding-images-container">
          <div className="sliding-images" />
        </div>
      {/* introduction */}
      {!showChoice && (
        <div className="start-container" style={policestyle}>
          <div className="logo-title"></div>
          <div className="intro-box">
            <div className="intro-content" style ={policestyle}> Révelez votre flair artistique </div>
          </div>
          <button className="buttonStart" onClick={ShowChoice}>Démarrer</button>
        </div>
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
    {showGame && !showStart && !showChoice && (    
      <div>  
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
            {showAnswer && retirerAccents(userAnswers.title).toLowerCase() !== retirerAccents(selectedData.title).toLowerCase() &&<div className="answer">{selectedData.title}</div>}
          </div>  
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
            {showAnswer && retirerAccents(userAnswers.artist).toLowerCase() !== retirerAccents(selectedData.artist).toLowerCase() && <div className="answer">{selectedData.artist}</div>}
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
            <button className="buttonHint" onClick={() => handleHint(selectedData.date)}>Indice</button>
            {showAnswer && retirerAccents(userAnswers.date).toLowerCase() !== retirerAccents(selectedData.date).toLowerCase() &&<div className="answer">{selectedData.date}</div>}
          </div>
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

