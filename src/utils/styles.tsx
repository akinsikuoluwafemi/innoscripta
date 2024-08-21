import styled from 'styled-components';

export const NewListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 15px;
  justify-content: center;
  align-items: start; /* Align items to the start of each grid cell */

  /* maintain a consistent aspect ratio */
  grid-auto-rows: minmax(320px, auto);
  /* Adjust the auto-flow to control how items fill the grid */
  grid-auto-flow: row;

  & > .item {
    background: #f9f9f9;
    height: 400px;
    // min-width: 320px;
    border-radius: 5px;
    margin: 0 auto;

    & .news-image {
      border-radius: 5px;
      height: 200px;
      object-fit: cover;
    }

    & .content {
      padding: 10px;

      & h3 {
        font-size: 1.2rem;
        margin: 0;
        font-weight: 600;
      }
      & span {
        font-size: 0.9rem;
        color: #333;
      }

      & .source-time {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 0.8rem;
      }
      & button {
        padding: 5px 10px;
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
        margin-top: 11px;
        border-radius: 5px;
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      width: 90%;
      margin: 0 auto;
    }
  }
`;

export const NewsListItem = styled.div`
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 0 auto;
    min-height: inherit;
    height: auto;

    @media (max-width: 768px) {
      width: -webkit-fill-available;
    }


    & .news-image {
      border-radius: 5px;
      height: 200px;
      object-fit: cover;
    }

    & .content {
      padding: 10px;
      display: flex;
      flex-direction: column;
      height: 200px;
      position: relative;
      min-width: 320px;
      & .news-title {
        font-size: 1.2rem;
        margin: 0;
        font-weight: 600;
      }
      & span {
        font-size: .9rem;
        color: #333;
      }

      & .source-time {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: .8rem;
      }
      & button {
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
        width: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px;

        & a {
          color: #fff;
          text-decoration: none;
        }
`;
