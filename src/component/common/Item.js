import styled from 'styled-components';
import QueryString from 'qs';
import { useLocation } from 'react-router';

const HighlightedText = ({ text, HighlightedText }) => {
  
    const parts = text.split(new RegExp(`(${HighlightedText})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === HighlightedText.toLowerCase() ? (
            <span key={index} className="highlight-txt">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }


const Item = ( props ) => {
  const { imageUrl, name, price } = props;
  const tedssd = 'asdsda';
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const keyWord = queryData.key;

  
  const onClickItem = () => { 
    window.open(`${imageUrl}`, '_blank');
  }

  //console.log(keyWord);
  return (
    <Container onClick={onClickItem}>
      {/* <img src={imageUrl} alt={name + '이미지'} className="prod-img" />
      <div className="prod-txt"> */}
      <p className="prod-tit">
        <HighlightedText text={tedssd} HighlightedText={keyWord} />
      </p>
      {/* <p className="prod-price">₩{price.toLocaleString()}</p>
      </div> */}
    </Container>
  );
};

const Container = styled.li`
  width: 170px;
  border: 1px solid #ededed;
  border-radius: 5px;
  .prod-img {
    width: 170px;
    height: 210px;
    object-fit: cover;
  }
  .prod-txt {
    padding: 1em 0.5em;
    box-sizing: border-box;
    .prod-tit {
      text-align: center;
      font-size: 16px;
      margin: 0;
    }
    .prod-price {
      margin: 10px 0 0;
      text-align: right;
      font-weight: 500;
      color: #ad80fb;
    }
  }
  .highlight-txt {
    font-weight: 600;
    color: #ad80fb;
  }
`;

export default Item;
