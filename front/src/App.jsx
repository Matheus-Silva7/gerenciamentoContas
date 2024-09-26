import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './routes/Login'
import Cadastro from './routes/Cadastro'
import Contas from './routes/Contas'

function App() {

  return (
<Routes>
<Route path='/' element={<Contas/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/cadastro' element={<Cadastro/>}/>
</Routes>
  )
}

export default App
