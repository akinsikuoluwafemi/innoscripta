import styled from 'styled-components';

export const ClearErrorBtn = styled.span`
  color: red;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  // background: teal;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  margin-bottom: 20px;

  .active {
    background: #333;
    color: #fff;
    padding: 10px;
  }

  & > * {
    // margin: 0px 20px;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }
`;
