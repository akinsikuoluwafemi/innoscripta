import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 70vw;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #333;

  .contentWrapper {
    flex-grow: 1;
  }

  .active {
    font-weight: 600;
  }

  .not-active {
    font-weight: 400;
  }

  @media (max-width: 768px) {
    width: auto;
    margin: 10px;
    padding: 20px;
  }
`;

export const Header = styled.header`
  display: flex;
  margin-bottom: 20px;

  & > ul {
    margin: 0;
    padding: 10px;
    display: flex;
    width: 100%;
    & > .logo {
      margin-right: auto;
      text-align: center;
      margin-left: auto;
    }
  }
`;
