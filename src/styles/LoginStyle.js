import styled from 'styled-components';

const LoginStyle = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://a-static.mlcdn.com.br/1500x1500/papel-de-parede-adesivo-gourmet-menu-restaurantes-cardapio-gf-casa-decor/gfcasadecor/gfc-gourmet-27/f02b063800ef0c5858ff601456b9b236.jpg") ;
  background-repeat: round;
  background-size: contain;
  opacity: 0.85;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    input {
      padding: 10px;
      border-radius: 5px;
      outline: none;
    }

  }

  @media (max-width: 300px){
    form {
      width: 70%;
    }
  }

  @media (max-width: 1300px){
    form {
      width: 30%;
    }
  }

  @media (min-width: 1300px){
    form {
      width: 20%;
    }
  }

  form button {
    margin-top: 5px;
    overflow: hidden; 
  }

  form button:enabled {
    background: pink;
    color: black;
    font-weight: bold;
  }

`;

export default LoginStyle;
