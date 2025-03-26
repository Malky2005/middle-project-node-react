//import logo from './logo.svg';
import './App.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Menu from './Components/Menu';
import { Route, Routes } from 'react-router-dom'
import Todos from './Components/Todos'
import Posts from './Components/Posts'
import Users from './Components/Users'
import Home from './Components/Home'


function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/todos' element={<Todos/>} />
          <Route path='/posts' element={<Posts/>} />
          <Route path='/users' element={<Users/>} />
      </Routes>
      
    </div>
  );
}

export default App;
