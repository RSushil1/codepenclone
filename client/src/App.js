import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditor from "./pages/CodeEditor";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/UserDashboard";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/code-editor" element={<CodeEditor/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/user-dashboard" element={<Dashboard/>}/>
    </Routes>
    </>
  );
}

export default App;
