import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditor from "./pages/CodeEditor";
import Dashboard from "./pages/UserDashboard";
import SignIn from './pages/auth/SignIn';
import Signup from './pages/auth/SignUp';
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./routes/Private";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
