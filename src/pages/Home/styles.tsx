import styled from 'styled-components';

export const Wrapper = styled.div`
  height: auto;

  & > .form {
    display: flex;
    margin: 20px 0;
    width: 100%;

    & > input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #333;
      background: #f9f9f9;

      &:focus {
        outline: none;
      }
    }
    & > .btn {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #333;
      color: #fff;
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;

export const SourceWrapper = styled.div`
  display: flex;
  // background: red;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;

  & > span {
    margin-right: 10px;
  }

  & > select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #333;
    background: #f9f9f9;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  // background: red;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;

  & > span {
    margin-right: 10px;
  }
`;
