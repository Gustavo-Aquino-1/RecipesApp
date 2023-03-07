import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { setItem, getItem } from '../services/LocalStorageFuncs';
import RecipesContext from '../context/RecipesContext';
import '../styles/RecipeInProgress.css';
import heartWhite from '../images/whiteHeartIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';
import clickFavorite from '../services/RecipeInProgressFuncs';

const RecipeInProgressArea = styled.div`
  #recipe {
    display: block;
    width: 100%;
    text-align: center;
    img {
      width: 80%;
    }
  }
`;

const copy = require('clipboard-copy');

function RecipeInProgressCard() {
  const [clipboard, setClipBoard] = useState();
  const { findRecipeById, favoriteRecipes,
    setFavoriteRecipes, setDoneRecipes, doneRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [control, setControl] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [checks, setChecks] = useState([]);
  const [type, setType] = useState('');
  const { push } = useHistory();
  useEffect(() => {
    if (type !== '') {
      const saveIngredients = getItem('inProgressRecipes')[type];
      if (typeof saveIngredients === 'object'
        && Object.keys(saveIngredients).includes(id)) {
        setChecks(saveIngredients[id]);
      }
    }
  }, [id, type]);
  useEffect(() => {
    const func = async () => {
      let typeFood = '';
      let dados = {};
      const asyncOperation = async () => {
        if (pathname.includes('drinks')) {
          typeFood = 'drinks';
          setType(typeFood);
          dados = await findRecipeById(id, typeFood);
          setData(dados);
        } else {
          typeFood = 'meals';
          setType(typeFood);
          dados = await findRecipeById(id, typeFood);
          setData(dados);
        }
      };
      await asyncOperation();
      if (dados !== undefined && !control) {
        setControl(true);
        const keysDataIngredients = Object.keys(dados)
          .filter((e) => e.includes('strIngredient'));
        const filterIngredients = keysDataIngredients.filter((e) => dados[e] !== null);
        const filterVazios = filterIngredients.filter((e) => dados[e] !== '');
        setIngredients(filterVazios);
      }
    };
    func();
  }, [pathname, findRecipeById, id, control]);
  useEffect(() => {
    if (checks.length > 0 && type !== '') {
      const saveObj = getItem('inProgressRecipes');
      saveObj[type][id] = checks;
      setItem('inProgressRecipes', saveObj);
    } else if (checks.length === 0 && type) {
      const saveObj = getItem('inProgressRecipes');
      saveObj[type][id] = [];
      setItem('inProgressRecipes', saveObj);
    }
  }, [checks, id, type]);
  const handleCheck = (ingredient) => {
    if (!checks.some((e) => e === ingredient)) {
      setChecks([...checks, ingredient]);
    } else {
      setChecks(checks.filter((e) => e !== ingredient));
    }
  };
  const clickClipBoard = async () => {
    try {
      setClipBoard(true);
      let url = `http://localhost:3000${pathname}`;
      url = url.replace('/in-progress', '');
      await copy(url);
    } catch (error) {
      console.log(error);
      setClipBoard(false);
    }
  };
  const cond = ingredients.length !== 0 ? ingredients.length === checks.length : false;
  const handleClick = () => {
    if (type === 'drinks') {
      const condicao = doneRecipes.every((e) => +e.id !== +id);
      if (condicao) {
        setDoneRecipes([...doneRecipes, {
          id: data.idDrink,
          nationality: '',
          name: data.strDrink,
          category: data.strCategory,
          image: data.strDrinkThumb,
          tags: data.strTags ? data.strTags.split(',') : [],
          alcoholicOrNot: data.strAlcoholic,
          type: type.replace('s', ''),
          doneDate: new Date().toISOString(),
        }]);
      }
    } else {
      const condicao = !doneRecipes.some((e) => +e.idMeal === +id);
      if (condicao) {
        setDoneRecipes([...doneRecipes, {
          id: data.idMeal,
          nationality: data.strArea,
          name: data.strMeal,
          category: data.strCategory,
          image: data.strMealThumb,
          tags: data.strTags.split(','),
          alcoholicOrNot: '',
          type: type.replace('s', ''),
          doneDate: new Date().toISOString(),
        }]);
      }
    }
    push('/done-recipes');
  };
  return (
    <RecipeInProgressArea>
      {
        clipboard && <div data-testid="msg_copy_sucess">Link copied!</div>
      }
      <button
        type="button"
        onClick={ clickClipBoard }
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        onClick={ () => (
          clickFavorite({ favoriteRecipes, setFavoriteRecipes, data, type, id })) }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipes.some((e) => e.id === id) ? heartBlack : heartWhite }
          alt={ id }
        />
      </button>
      <div id="recipe">

        {
          data !== undefined
            && (
              pathname.includes('drinks') ? (
                <section>
                  <h1 data-testid="recipe-title">
                    { data.strGlass }
                  </h1>
                  <h3 data-testid="recipe-category">
                    { data.strCategory }
                  </h3>
                  <h5>
                    { data.strAlcoholic }
                  </h5>
                  <img
                    data-testid="recipe-photo"
                    src={ data.strDrinkThumb }
                    alt={ data.strDrink }
                  />
                  <section id='ingredients'>
                    {
                      ingredients.map((steps, index) => (
                        <label
                          className={ checks
                            .some((e) => e === data[steps]) ? 'done' : undefined }
                          key={ index }
                          htmlFor={ `${index} - check` }
                          data-testid={ `${index}-ingredient-step` }
                        >
                          { data[steps] }
                          <input
                            type="checkbox"
                            id={ `${index} - check` }
                            onClick={ () => handleCheck(data[steps]) }
                            defaultChecked={ checks.some((e) => e === data[steps]) }
                          />
                        </label>
                      ))
                    }
                  </section>
                  <p data-testid="instructions">
                    { data.strInstructions }
                  </p>
                </section>
              ) : (
                <section>
                  <h1 data-testid="recipe-title">
                    { data.strMeal }
                  </h1>
                  <h3 data-testid="recipe-category">
                    { data.strCategory }
                  </h3>
                  <img
                    data-testid="recipe-photo"
                    src={ data.strMealThumb }
                    alt={ data.strMeal }
                  />
                  <section id='ingredients'>
                    {
                      ingredients.map((mealStep, index) => (
                        <label
                          className={ checks
                            .some((e) => e === data[mealStep]) ? 'done' : undefined }
                          key={ index }
                          htmlFor={ `${index} - check` }
                          data-testid={ `${index}-ingredient-step` }
                        >
                          { data[mealStep] }
                          <input
                            type="checkbox"
                            id={ `${index} - check` }
                            onClick={ () => handleCheck(data[mealStep]) }
                            defaultChecked={ checks.some((e) => e === data[mealStep]) }
                          />
                        </label>
                      ))
                    }
                  </section>

                  <p data-testid="instructions">
                    { data.strInstructions }
                  </p>
                </section>
              )
            )
        }
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish"
        disabled={ !cond }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </RecipeInProgressArea>
  );
}
export default RecipeInProgressCard;
