import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GoalForm from './components/GoalForm';
import Progress from './components/Progress';
import Login from './components/Login';
import Register from './components/Register';
import DailyIntake from './components/DailyIntake';
import './App.css';

interface User {
  username: string;
  password: string;
  goal: number; // Meta en litros
  intake: number; // Consumo en mililitros
  dailyIntake: { date: string, time: string, amount: number }[];
}

const App = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleLogin = (username: string, password: string) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = (username: string, password: string) => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('El nombre de usuario ya está en uso');
      return;
    }
    const user = { username, password, goal: 2, intake: 0, dailyIntake: [] }; // Meta inicial de 2 litros
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    setCurrentUser(user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleAddIntake = (amount: number) => {
    if (currentUser) {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      const updatedDailyIntake = [...currentUser.dailyIntake, { date, time, amount }];
      const updatedUser = { ...currentUser, intake: currentUser.intake + amount, dailyIntake: updatedDailyIntake };
      const updatedUsers = users.map(user => user.username === currentUser.username ? updatedUser : user);
      setUsers(updatedUsers);
      setCurrentUser(updatedUser);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      if (updatedUser.intake >= updatedUser.goal * 1000) {
        alert('¡Felicidades! Has alcanzado tu meta diaria de hidratación.');
      }
    }
  };

  const handleSetGoal = (newGoal: number) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, goal: newGoal };
      const updatedUsers = users.map(user => user.username === currentUser.username ? updatedUser : user);
      setUsers(updatedUsers);
      setCurrentUser(updatedUser);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App container">
        {!currentUser ? (
          isRegistering ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login onLogin={handleLogin} />
          )
        ) : (
          <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/">Inicio</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/daily-intake">Registro Diario</Link>
                  </li>
                </ul>
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </nav>
            <Routes>
              <Route path="/" element={
                <div className="mt-4">
                  <h1>Registro de Consumo de Agua</h1>
                  <GoalForm onSetGoal={handleSetGoal} />
                  <DailyIntake dailyIntake={currentUser.dailyIntake} onAddIntake={handleAddIntake} />
                  <Progress intake={currentUser.intake} goal={currentUser.goal} />
                </div>
              } />
              <Route path="/daily-intake" element={<DailyIntake dailyIntake={currentUser.dailyIntake} onAddIntake={handleAddIntake} />} />
            </Routes>
          </>
        )}
        <button className="btn btn-link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </div>
    </Router>
  );
};

export default App;