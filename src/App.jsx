import { BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './components/Home'
import Signup from './components/Signup'
import DashboardAdmin from "./components/DashboardAdmin"
import DashboardUser from "./components/DashboardUser"
import Header from "./components/Header"
import ForgetPassword from "./components/ForgetPassword"
import ResetPassword from "./components/ResetPassword"

function App() {
 

  return <>
     <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home/>}></Route>
       <Route path="/signup" element={<Signup/>} ></Route>
       <Route path="/Dashboardadmin" element={<><Header/><DashboardAdmin/></>} ></Route>
       <Route path="/DashboardUser" element={<><Header/><DashboardUser/></>} ></Route>
       <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
       <Route path="/resetpassword/:id/:token" element={<ResetPassword/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  
}

export default App
