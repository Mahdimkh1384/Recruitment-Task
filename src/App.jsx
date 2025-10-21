import { useRoutes } from 'react-router-dom'
import './App.css'
import routes from './Routes.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <NavBar />
      <div dir='rtl' className='mt-[200px]'>
        {router}
      </div>
    </>
  )
}

export default App
