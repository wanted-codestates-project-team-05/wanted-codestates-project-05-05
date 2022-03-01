// import './App.css';
// import './reset.css';
// import SearchUrl from './component/searchUrl/SearchUrl';

// function App() {
//   return (
//     <div className="App">
//       <SearchUrl />
//     </div>
//   );
// }

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
      <Route path="searchKeyword" element={<SearchKeyword />} />
      <Route path="searchUrl" element={<SearchUrl />} />
      <Route path="searchitem" element={<Item />} />
    </Routes>
  );
}

export default App;
