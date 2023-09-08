import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditor from "./pages/CodeEditor";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/code-editor" element={<CodeEditor/>}/>
    </Routes>
    </>
  );
}

export default App;
