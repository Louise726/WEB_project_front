import React from 'react';

function rank() {
  const fakeData = [
    { rank: 1, username: 'youngking', score: 100 },
    { rank: 2, username: 'playerunknow', score: 90 },
    { rank: 3, username: 'eric', score: 80 },
    { rank: 4, username: 'lisa', score: 70 },
    { rank: 5, username: 'xiaoming', score: 60},
    { rank: 6, username: 'owen', score: 50},
    { rank: 7, username: 'paul', score: 40 },
    { rank: 8, username: 'salsa', score: 30 },
    { rank: 9, username: 'dirac', score: 20 },
    { rank: 10, username: 'fred', score: 1 },
    
  ];

  return (
    <div className="rank">
      <h2>Ranking</h2>
      <ol>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i}>
            {fakeData[i] ? `${fakeData[i].username}: ${fakeData[i].score}` : "—"}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default rank;