import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import heartBlack from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

const FavoriteArea = styled.div`
  margin-top: 50px;
  width: 100% ;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  img {
    width: 100px;
  }

  ul {
    list-style-type: none;
  }

  .icon {
    width: 30px;
    background-color: transparent;
    border: none;
    margin: 0 0 0 10px;
  }
`;

function FavoriteRecipes() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const [type, setType] = useState('');
  const [clipboard, setClipBoard] = useState();

  const { push } = useHistory();

  const clickClipBoard = async (pathname) => {
    try {
      setClipBoard(true);
      const url = `http://localhost:3000${pathname}`;
      await copy(url);
    } catch (error) {
      console.log(error);
      setClipBoard(false);
    }
  };

  const removeFavorite = (id) => {
    setFavoriteRecipes(favoriteRecipes.filter((e) => +e.id !== +id));
  };

  return (
    <div>
      <Header />
      <FavoriteArea>
        <div>

          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setType('') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setType('meal') }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setType('drink') }
          >
            Drinks
          </button>
        </div>
        {
          (favoriteRecipes !== undefined && favoriteRecipes.length > 0) && (
            <ul>
              {
                favoriteRecipes?.filter((e) => e.type.includes(type))
                  .map((dr, index) => (
                    <li key={ dr.id }>
                      <img
                        src={ dr.image }
                        alt={ dr.name }
                        data-testid={ `${index}-horizontal-image` }
                        onClick={ () => push(`${dr.type}s/${dr.id}`) }
                        aria-hidden="true"
                      />
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { dr.category }
                      </p>
                      <p
                        data-testid={ `${index}-horizontal-name` }
                        onClick={ () => push(`${dr.type}s/${dr.id}`) }
                        aria-hidden="true"
                      >
                        { dr.name }
                      </p>
                      <p
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        { dr.doneDate }
                      </p>
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {
                          dr.type === 'meal'
                            ? `${dr.nationality} - ${dr.category}`
                            : `${dr.alcoholicOrNot}`
                        }
                      </p>
                      <button
                        type="button"
                        className="icon"
                        onClick={ () => clickClipBoard(`/${dr.type}s/${dr.id}`) }
                      >
                        <img
                          src={ shareIcon }
                          alt="Compartilhar"
                          className="icon"
                          data-testid={ `${index}-horizontal-share-btn` }
                        />
                      </button>

                      <button
                        type="button"
                        onClick={ () => removeFavorite(dr.id) }
                        className="icon"
                      >
                        <img
                          src={ heartBlack }
                          alt="Favoritar"
                          data-testid={ `${index}-horizontal-favorite-btn` }
                          className="icon"
                        />
                      </button>

                      { clipboard && <p>Link copied!</p>}
                    </li>
                  ))
              }
            </ul>
          )
        }
      </FavoriteArea>
    </div>
  );
}

export default FavoriteRecipes;
