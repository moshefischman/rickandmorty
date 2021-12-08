
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'


const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default App
