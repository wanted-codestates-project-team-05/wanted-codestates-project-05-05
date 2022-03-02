import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../common/Loading';
import useLocalStorage from '../../../hooks/useLocalStorage';

const AttributeList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let productCode = searchParams.get('productCode');

  const [gender, setGender] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allRegions, setAllRegions] = useLocalStorage('regions');
  const [result, setResult] = useLocalStorage('result');
  useEffect(() => {
    setIsLoading(true);
    if (productCode) {
      const genderIndex = allRegions[productCode - 1].gender.indexOf('.');
      const genderCheck = allRegions[productCode - 1].gender.substring(
        genderIndex + 1,
        allRegions[productCode - 1].gender.length
      );
      setGender(genderCheck);

      const attributesList = allRegions[productCode - 1].attributes.map((data, i) => {
        let key = Object.keys(data)[0];
        return (
          <div key={key} className="container">
            <div className="hashtag">#{data[key].toUpperCase()}</div>
            <div>{key.toUpperCase()}</div>
          </div>
        );
      });
      setAttributes(attributesList);
    } else {
      const genderIndex = result[0].gender.indexOf('.');
      const genderCheck = result[0].gender.substring(genderIndex + 1, result[0].gender.length);
      setGender(genderCheck);

      const attributesList = result[0].attributes.map((data, i) => {
        let key = Object.keys(data)[0];
        return (
          <div key={key} className="container">
            <div className="hashtag">#{data[key].toUpperCase()}</div>
            <div>{key.toUpperCase()}</div>
          </div>
        );
      });
      setAttributes(attributesList);
    }
    setIsLoading(false);
    return () => (setGender(null), setAttributes(null));
  }, [searchParams]);

  if (isLoading) return <Loading />;

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
    font-weight: 400;
    padding-right: 10px;
    padding-bottom: 15px;
    .hashtag {
      color: purple;
    }
  }
`;

export default AttributeList;
