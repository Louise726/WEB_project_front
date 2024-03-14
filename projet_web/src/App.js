import './App.css';
import { useState, useEffect } from 'react';


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

export default App;
