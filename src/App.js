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
import { Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import SearchKeyword from './component/searchKeyword/SearchKeyword';
import SearchUrl from './component/searchUrl/SearchUrl';

function App() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:name" element={<SearchKeyword />} />
      <Route path="/search/:image_url" element={<SearchUrl />} />
      <Route path="/searchUrl" element={<SearchUrl />} />
    </Routes>
    // </BrowserRouter>
  );
}

export default App;
