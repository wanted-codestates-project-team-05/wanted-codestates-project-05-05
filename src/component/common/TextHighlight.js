import React from 'react';
import styled from 'styled-components';

export default function TextHighlight({ text, keyword }) {
  if (keyword !== '' && text.includes(keyword)) {
    const sentence = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <>
        {sentence.map((item, index) =>
          item.toLowerCase() === keyword.toLowerCase() ? (
            <Highlight key={index}>{item}</Highlight>
          ) : (
            <span key={index}>{item}</span>
          )
        )}
      </>
    );
  }
  return <span>{text}</span>;
}

const Highlight = styled.span`
  font-weight: 700;
`;
