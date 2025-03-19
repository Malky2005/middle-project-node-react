//import logo from './logo.svg';
import './App.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Router from './Components/Menu';
import { Route, Routes } from 'react-router-dom'
import Todos from './Components/Todos'
import Posts from './Components/Posts'
import Users from './Components/Users'



function App() {
  return (
    <div className="App">
      <Router></Router>
      <Routes>
          <Route path='/todos' element={<Todos/>} />
          <Route path='/posts' element={<Posts/>} />
          <Route path='/users' element={<Users/>} />
      </Routes>
      
    </div>
  );
}

export default App;
