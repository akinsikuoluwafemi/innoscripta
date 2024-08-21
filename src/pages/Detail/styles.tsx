import styled from 'styled-components';

export const DetailWrapper = styled.div`
  height: auto;

  @media (max-width: 1024px) {
    height: auto;
  }
`;
export const DetailContent = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 5px;
  padding: 10px;
  align-items: flex-start;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  & > .full-image {
    width: 50%;
    height: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  & > .description {
    // background: pink;
    width: 50%;
    height: 100%;
    padding: 10px;
    height: auto;
    margin-left: 10px;

    & > h1 {
      font-size: 1.6rem;
      margin: 0;
    }

    & > p {
      font-size: 1rem;
    }

    & > .detail-sourcetime {
      margin: 10px 0;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  @media (max-width: 1300px) {
    flex-direction: column;
    height: 100%;

    & > .full-image {
      flex: 1 1 50%;
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain; /* or cover */
    }

    & > .description {
      height: 50%;
      flex: 1 1 50%;
      width: 100%;
    }
  }
`;

export const GuardianNewsWrapper = styled.div`
  margin-top: 400px;
  padding: 10px;
  background: #f0f0f0;

  & h2 {
    font-size: 1.6rem;
    margin: 10px 0;
    text-align: center;
  }

  & .content {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    height: auto;
    gap: 10px;

    & .detail {
      height: 100px;
      width: 100px;
      background: pink;
      margin: 0 auto;
    }
  }
`;
