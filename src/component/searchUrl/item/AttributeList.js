import styled from 'styled-components';

const dummy = {
  product_code: 1,
  region_id: 2910,
  image_url: 'https://static.pxl.ai/problem/images/VT-070.jpg',
  gender: 'gender.unisex',
  attributes: [
    {
      style: 'basic_or_minimal_or_normcore',
    },
    {
      season: 'summer',
    },
    {
      occasion: 'gym_or_outdoor',
    },
    {
      fabric: 'knit_or_angora',
    },
    {
      sense: 'sportive',
    },
    {
      pattern: 'leopard',
    },
  ],
  category_names: ['c1.tops', 'c2.outwears', 'c3.vests'],
};

const AttributeList = () => {
  return (
    <div>
      {dummy.attributes.map((data, i) => {
        let key = Object.keys(data)[0];
        return (
          <Attribute key={key}>
            <div className="container">
              <div className="hashtag">#{data[key]}</div>
              <div>{key}</div>
            </div>
          </Attribute>
        );
      })}
    </div>
  );
};

const Attribute = styled.div`
  display: inline-flex;
  .container {
    width: auto;
    padding-right: 10px;
    padding-bottom: 15px;
    .hashtag {
      color: purple;
    }
  }
`;

export default AttributeList;
