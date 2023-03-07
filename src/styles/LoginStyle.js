import styled from 'styled-components';

const LoginStyle = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://static.vecteezy.com/system/resources/previews/006/823/922/original/set-icons-with-foods-doodle-with-foods-icons-on-black-background-vintage-food-set-icons-sweet-elements-background-for-your-project-menu-cafe-shop-free-vector.jpg') ;
  background-size: contain;
  opacity: 1;

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
    padding: 5px;
    border-radius: 5px;
    opacity: 1;
  }

  form button:enabled {
    background: pink;
    color: black;
    font-weight: bold;
    opacity: 1;
  }

`;

export default LoginStyle;
