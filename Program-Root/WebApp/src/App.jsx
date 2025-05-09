import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <header>
        <h1>
          HomePage
        </h1>
        <p>
          Login to get started
        </p>

      </header>
      <Router>
        <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/Login" element={ <LoginPage/>}></Route>
            <Route path="/GroupCollection" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </Router>
      <footer>
      </footer>
    </div>
  );
}

export default App;