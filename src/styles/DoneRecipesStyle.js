import styled from 'styled-components';

const DoneRecipesStyle = styled.section`
  
  .filter-btn {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
  }

  .filter-btn button{
    border-radius: 15%;
  }

  .recipe {
    width: 120px;
  }

  ul{
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 55px;
  }

  .share-btn{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
  }
`;

export default DoneRecipesStyle;
