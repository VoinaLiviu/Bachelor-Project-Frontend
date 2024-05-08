import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import QuizPage from "./pages/quizPage/QuizPage";
import './common.css'
import EncryptPage from "./pages/encryptPage/EncryptPage";
import ImplementPage from "./pages/implementPage/ImplementPage";
import LearnPage from "./pages/learnPage/LearnPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route exact path="/quizzes" element={<PrivateRoute><QuizPage /></PrivateRoute>}></Route>
            <Route exact path="/encrypt" element={<PrivateRoute><EncryptPage /></PrivateRoute>}></Route>
            <Route exact path="/implement" element={<PrivateRoute><ImplementPage /></PrivateRoute>}></Route>
            <Route exact path="/learn" element={<PrivateRoute><LearnPage /></PrivateRoute>}></Route>
          </Routes>
        </AuthProvider>
      </Router>

    </>
  );
}

export default App;
