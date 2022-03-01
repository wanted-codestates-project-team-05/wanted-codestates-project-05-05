import React from 'react';
import './App.css';
import './reset.css';
import { Routes, Route } from 'react-router-dom';
import Home from './component/home/Home';
import SearchUrl from './component/searchUrl/SearchUrl';
import SearchKeyword from './component/searchKeyword/SearchKeyword';
import Item from './component/common/Item';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="searchKeyword/:keyword" element={<SearchKeyword />} />
      <Route path="searchUrl/:url" element={<SearchUrl />} />
    </Routes>
  );
}

export default App;
