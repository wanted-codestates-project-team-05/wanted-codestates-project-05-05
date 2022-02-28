import logo from './logo.svg';
import './App.css';
import './reset.css';
import { Routes, Route } from 'react-router-dom';
import Home from './component/home/Home';
import SearchUrl from './component/searchUrl/SearchUrl';
import SearchKeyword from './component/searchKeyword/SearchKeyword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="searchKeyword" element={<SearchKeyword />} />
      <Route path="searchUrl" element={<SearchUrl />} />
    </Routes>
  );
}

export default App;
