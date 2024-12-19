import { Route, Routes } from "react-router-dom"


import { Home, TodoList } from "./pages"
import { Navbar } from "./components"
import { authService } from "./services/loginService"

function App() {


  return (
    <>
          {(()=>{
            authService()
          })()}
          <Navbar/>
          <Routes>
            <Route path="/todos" element={<TodoList/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>

    </>
  )
}

export default App
