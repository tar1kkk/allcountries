import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';
import NotFound from './pages/NotFound';


function App() {
 


  return (
    <div>
      <Header/>
      <Main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/country/:name" element={<Details />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Main>
    </div>
  );
}

export default App;
