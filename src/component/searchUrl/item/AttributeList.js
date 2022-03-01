import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const regionDataUrl = 'https://static.pxl.ai/problem/data/regions.json';

const AttributeList = () => {
  const params = new URLSearchParams(window.location.search);
  let searchkey = params.get('searchkey');

  const [gender, setGender] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getResionData = async () => {
      setIsLoading(true);
      await axios
        .get(regionDataUrl)
        .then((res) => {
          const genderIndex = res.data[searchkey - 1].gender.indexOf('.');
          const genderCheck = res.data[searchkey - 1].gender.substring(
            genderIndex + 1,
            res.data[searchkey - 1].gender.length
          );
          setGender(genderCheck);

          const attributesList = res.data[searchkey - 1].attributes.map((data, i) => {
            let key = Object.keys(data)[0];
            return (
              <div key={key} className="container">
                <div className="hashtag">#{data[key].toUpperCase()}</div>
                <div>{key.toUpperCase()}</div>
              </div>
            );
          });

          setAttributes(attributesList);
          setIsLoading(false);
        })
        .catch((err) => {});
    };
    getResionData();
  }, []);

  if (isLoading) return <div>loading</div>;

  return (
    <div>
      <Title>ATTRIBUTES</Title>
      <Attribute>
        <div className="container">
          <div className="hashtag">#{gender.toUpperCase()}</div>
          <div>GENDER</div>
        </div>
        {attributes}
      </Attribute>
    </div>
  );
};

const Title = styled.div`
  font-size: 2.5vh;
  margin-bottom: 3vh;
`;

const Attribute = styled.div`
  .container {
    display: inline-block;

    padding-right: 10px;
    padding-bottom: 15px;
    .hashtag {
      color: purple;
    }
  }
`;

export default AttributeList;
