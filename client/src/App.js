import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditor from "./pages/CodeEditor";
import SignIn from "./pages/SignIn";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/code-editor" element={<CodeEditor/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
    </>
  );
}

export default App;
