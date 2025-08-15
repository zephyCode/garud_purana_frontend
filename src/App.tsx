import { Route, Routes } from "react-router-dom"
import Confession from "./pages/Confession"
import Result from "./pages/Result"
import Forum from "./pages/Forum"
import Home from "./pages/Home"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/forum" element={<Forum/>} />
      <Route path="/result" element={<Result/>} />
      <Route path="/confess" element={<Confession/>} />
    </Routes>
  )
}

export default App;
