import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const regionDataUrl = 'https://static.pxl.ai/problem/data/regions.json';

const AttributeList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let productCode = searchParams.get('productCode');
  let imageUrl = searchParams.get('imageUrl');

  const [gender, setGender] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getResionData = async () => {
      setIsLoading(true);
      await axios
        .get(regionDataUrl)
        .then((res) => {
          if (productCode) {
            const genderIndex = res.data[productCode - 1].gender.indexOf('.');
            const genderCheck = res.data[productCode - 1].gender.substring(
              genderIndex + 1,
              res.data[productCode - 1].gender.length
            );
            setGender(genderCheck);

            const attributesList = res.data[productCode - 1].attributes.map((data, i) => {
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
            const localResult = JSON.parse(window.localStorage.getItem('result'));
            const genderIndex = localResult[0].gender.indexOf('.');
            const genderCheck = localResult[0].gender.substring(genderIndex + 1, localResult[0].gender.length);
            setGender(genderCheck);

            const attributesList = localResult[0].attributes.map((data, i) => {
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
        })
        .catch((err) => {});
    };
    // getProductData();
    return getResionData();
    return;
  }, [searchParams]);

  // useEffect(() => {
  //   const localResult = JSON.parse(window.localStorage.getItem('result'));
  //   // const productIndex = localResult[0].name.indexOf('_');
  //   // const product = localResult[0].name.substring(0, productIndex);
  //   const genderIndex = localResult[0].gender.indexOf('.');
  //   const genderCheck = localResult[0].gender.substring(genderIndex + 1, localResult[0].gender.length);
  //   setGender(genderCheck);
  //   const attributesList = localResult[0].attributes.map((data, i) => {
  //     let key = Object.keys(data)[0];
  //     return (
  //       <div key={key} className="container">
  //         <div className="hashtag">#{data[key].toUpperCase()}</div>
  //         <div>{key.toUpperCase()}</div>
  //       </div>
  //     );
  //   });

  //   setAttributes(attributesList);
  //   setIsLoading(false);
  // }, [productCode]);

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
    font-weight: 400;
    padding-right: 10px;
    padding-bottom: 15px;
    .hashtag {
      color: purple;
    }
  }
`;

export default AttributeList;