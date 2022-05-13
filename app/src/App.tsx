import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Counter } from './pages/Counter';
import { FetchData } from './pages/FetchData';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/counter' element={<Counter />} />
          <Route path='/fetch-data' element={<FetchData />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
