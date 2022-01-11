import { useEffect, useState } from 'react'
import './App.css'
import { Movie } from './types/Movie';

function App() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovie();
  },[]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      let response = await fetch('https://api.b7web.com.br/cinema/');
      let json = await response.json();
      setLoading(false);
      setMovie(json);
    } catch (error) {
      setLoading(false);
      setMovie([]);
      alert('Problemas ao acessar o servidor, tente mais tarde');
    }
  }

  return (
    <div>
      {loading &&
        <div>Carregando...</div>
      }

      {!loading && movie.length > 0 &&
        <>
          Total de filmes: {movie.length}
          <div className='grid grid-cols-6 gap-3'>
            {movie.map((item, index) => (
              <div key={index}>
                <img src={item.avatar} className='w-32 block'/>
                {item.titulo}
              </div>
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default App
