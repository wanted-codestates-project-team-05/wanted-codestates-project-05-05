import React from 'react';
import styled from 'styled-components';

export default function TextHighlight({ text, keyword }) {
  if (keyword !== '' && text.includes(keyword)) {
    const sentence = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <>
        {sentence.map((item, index) =>
          item.toLowerCase() === keyword.toLowerCase() ? <Highlight key={index}>{item}</Highlight> : item
        )}
      </>
    );
  }
  return <p>{text}</p>;
}

const Highlight = styled.span`
  font-weight: 700;
`;
