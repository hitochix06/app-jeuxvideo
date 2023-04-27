import Select from 'react-select'
import styles from '../styles/page.module.scss'
import Card from 'react-animated-3d-card'
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState, useId } from 'react';

export default function Home() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState([]);
  const selectOption = (game) => {
    router.push(`/game/${game.value}`);
  };

  //code  jeux aléatoire
  const loadRandomGames = async (nb) => {
    const response = await fetch(`/api/igdb/randomgames?nb=${nb}`);
    const data = await response.json();
    setGames(data);
  }
  useEffect(() => {
    loadRandomGames(10);
  }, []);

  //code pour choisir taille image
  const convertImage = (url, size) => {
    const result = url.replace(/thumb/g, size);
    return result;
  }

  //code pour limiter le nombre de requête à l'API en fonction de la recherche 
  const handleInputChange = _.debounce(function (value) {
    setSearchValue(value);
  }, 300);



  //code  qui propose des jeux en fonction de la recherche
  const handleSelectedOption = (selectedOption) => {
    router.push(`/games/${selectedOption.value}`);
  };

  const SearchGames = async (query) => {
    const response = await fetch(`/api/igdb/games?query=${query}`);
    const data = await response.json();
    const result = data.map((game) => ({ label: game.name, value: game.slug }));
    setOptions(result);
  };



  // Quand "searchValue" est mis à jour, lance la fonction searchGames
  useEffect(() => {
    if (searchValue.length) {
      SearchGames(searchValue);
    }
  }, [searchValue]);



  return (
    <main className={styles.background}>
      <div className="container text-center">
        <div className="row">
          <div className="col-7 mt-5">
            <div className="card ">
              <div classn="card-body">
                <h1 className={styles.titre}>Et si vous découvriez un nouveau jeux ?</h1>
              </div>
            </div>
          </div>
          <Select className='mt-5'
            placeholder="Rechercher un jeu..."
            instanceId={useId()}
            value={searchValue}
            options={options}
            onInputChange={handleInputChange}
            onChange={selectOption}
          />
        </div>
        {/* code pour afficher le card 3d avec les jeux */}
        <div className="row mt-5 gy-4 ">
          {games.map((game, i) => (
            <div className="col" key={i}>
              <Card
                style={{
                  backgroundColor: 'blue',
                  width: '200px',
                  height: '250px',
                  cursor: 'pointer',
                }}
                onClick={() => selectOption({ value: game.slug })}
              >
                <img src={convertImage(game.cover.url, "720p")} alt={game.name} style={{ width: '100%', height: 'auto', maxHeight: '300px' }} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
