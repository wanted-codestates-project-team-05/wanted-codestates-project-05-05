import styled from 'styled-components';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import TextHighlight from './TextHighlight'

const Item = ( props ) => {
  const { image_url, name, price } = props;
  const location = useLocation();
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const keyWord = queryData.keyword;

  
  const onClickItem = () => { 
    window.open(`${image_url}`, '_blank');
  }

  //console.log(keyWord);
  return (
    <Container onClick={onClickItem}>
      <img src={image_url} alt={name + '이미지'} className="prod-img" />
      <div className="prod-txt">
        <p className="prod-tit">
          <TextHighlight text={name} keyword={keyWord} />
        </p>
        <p className="prod-price">₩{price.toLocaleString()}</p>
      </div>
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
