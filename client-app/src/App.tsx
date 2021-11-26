import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from "./components/home"
import LoginPage from './components/auth/login';
import RegisterPage from "./components/auth/register"
import DefaultLayout from './components/containers/defaultLayout';
import NoMatch from "./components/noMatch"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<DefaultLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="*" element={<NoMatch/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
