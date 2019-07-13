import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: #f00;
  font-size: 32px;
`;

const App = () => (
  <div className="app">
    <Title>Hello World!</Title>
  </div>
);

export default App;
