import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import DoneRecipesStyle from '../styles/DoneRecipesStyle';
import Footer from '../components/Footer';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const { doneRecipes: recipes } = useContext(RecipesContext);
  const [clipboard, setClipBoard] = useState();
  const [type, setType] = useState();

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

  return (
    <DoneRecipesStyle>
      { clipboard && <p>Link copied!</p>}
      <Header />
      <div className="filter-btn">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setType() }
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
      <ul>
        {
          recipes?.filter((recipe) => (type ? recipe.type === type : true))
            ?.map((dr, index) => (
              (
                <li key={ `${dr.id} - ${index}` }>
                  <a
                    href={ `http://localhost:3000/${dr.type}s/${dr.id}` }
                  >
                    <img
                      className="recipe"
                      src={ dr.image }
                      alt={ dr.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </a>
                  <Link to={ `/${dr.type}s/${dr.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ dr.name }</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {
                      dr.type === 'meal'
                        ? `${dr.nationality} - ${dr.category}`
                        : `${dr.alcoholicOrNot}`
                    }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    { dr.doneDate }
                  </p>
                  <div>
                    {
                      dr.tags.filter((_t, i) => i < 2)
                        .map((tag) => (
                          <p
                            key={ tag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </p>
                        ))
                    }
                  </div>
                  <button
                    className="share-btn"
                    type="button"
                    onClick={ () => clickClipBoard(`/${dr.type}s/${dr.id}`) }
                  >
                    <img
                      src={ shareIcon }
                      alt="Compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                </li>
              )
            ))
        }
      </ul>
      <Footer />
    </DoneRecipesStyle>
  );
}

export default DoneRecipes;
