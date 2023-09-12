import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditor from "./pages/CodeEditor";
import SignIn from "./pages/SignIn";
import SignUn from "./pages/SignUp";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/code-editor" element={<CodeEditor/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUn/>}/>
    </Routes>
    </>
  );
}

export default App;
