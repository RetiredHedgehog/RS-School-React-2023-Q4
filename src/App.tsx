import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import FormHook from './components/FormHook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="form-hook" element={<FormHook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
