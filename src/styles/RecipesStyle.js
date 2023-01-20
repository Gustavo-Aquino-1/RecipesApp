import styled from 'styled-components';

const RecipesStyle = styled.section`
  background: rgb(208,167,134);
  background: linear-gradient(0deg, rgba(208,167,134,0.928991579541973) 0%,
  rgba(218,102,0,0.5928571257604605) 52%, rgba(255,186,124,0.4696078260405725) 100%);
  height: 100vh;
  overflow: scroll;

  button {
    background-color: white;
    /* color: rgb(255,123,0); */
    border-radius: 10%;
  }

  .div-btn-filters {
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    margin: 20px 0 0 50px;
  }

  .div-btn-filters button {
    height: 30px;
    width: 27%;
    overflow: hidden;
  }

  .div-recipe {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    gap: 15px;
    margin: 20px;
  }

  .div-recipe img {
    width: 150px;
  }
`;

export default RecipesStyle;
