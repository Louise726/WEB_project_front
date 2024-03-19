import React, { useState } from 'react';
import './App.css'; 

/*
import { getImageData } from './mongoUtils';

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


async function getImageData() {
  const client = new MongoClient(uri, options);

  try {
    await client.connect(); 
    const database = client.db('your_database_name'); 
    const collection = database.collection('images'); 

    const imageData = await collection.find({}).toArray();
    return imageData;
  } finally {
    await client.close(); 
  }
}

*/

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
      </div>
      <div className = "row">
        <label>Date: </label>
        <input type="text" disabled={showAnswer} className = "inputCustom" style = {{marginRight : "10px"}}/>
        <button className="buttonHint" onClick={() => alert(date)}>Hint</button>
      </div>
      <div className = "row">
        <label>Type: </label>
        <input type="text" disabled={showAnswer} className = "inputCustom" style = {{marginRight : "10px"}}/>
        <button className="buttonHint" onClick={() => alert(type)}>Hint</button>
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

