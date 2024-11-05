import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from "./assets/200180283.png"
import { AssignmentInd, Campaign, Lan, MeetingRoom, Person, Phone, Poll } from '@mui/icons-material'
import { Link, Route, Routes } from 'react-router-dom'
import Announcements from './pages/Announcements/Announcements'
import Anketler from './pages/Anketler/Anketler'
import Mudurlukler from './pages/Mudurlukler/Mudurlukler'
import Girisler from './pages/Girisler/Girisler'
import Telephones from './pages/Telephones/Telephones'
import Personeller from './pages/Personeller/Personeller'
import Anket from './pages/Anketler/Anket'
import { useSelector } from 'react-redux'
import LoginPage from './pages/Login/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Clients from './pages/Clients/Clients'
function App() {

  const { logged, loggedUser } = useSelector(state => state.auth)


  return (
    <>
      {
        logged ?
          <div style={{ height: "100vh" }} className='row m-0'>
            <div className='col-3 border-end d-flex flex-column align-items-center p-2'>
              <img  onClick={() => {window.location.href = 'https://atakum.bel.tr/'}} style={{ width: "65%", cursor: "pointer" }} src={logo} alt="" />
              <div className='w-60 d-flex flex-column align-items-center'>
                <Link to={"/"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <Campaign></Campaign>
                  </div>
                  <span className='mx-2'>
                    Duyurular
                  </span>
                </Link>
                <Link to={"/numaralar"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <Phone></Phone>
                  </div>
                  <span className='mx-2'>
                    Dahili Numaralar
                  </span>
                </Link>
                <Link to={"/ipler"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <Lan></Lan>
                  </div>
                  <span className='mx-2'>
                    IP'ler
                  </span>
                </Link>
                <Link to={"/personeller"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <Person></Person>
                  </div>
                  <span className='mx-2'>
                    Personeller
                  </span>
                </Link>
                <Link to={"/anketler"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <Poll></Poll>
                  </div>
                  <span className='mx-2'>
                    Anketler
                  </span>
                </Link>
                <Link to={"/mudurlukler"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <AssignmentInd></AssignmentInd>
                  </div>
                  <span className='mx-2'>
                    Müdürlükler
                  </span>
                </Link>
                {/* <Link to={"/giriscikislar"} className='buttonmainpage'>
                  <div className='iconmainpagebutton'>

                    <MeetingRoom></MeetingRoom>
                  </div>
                  <span className='mx-2'>
                    Giriş Çıkış
                  </span>
                </Link> */}

              </div>
            </div>
            <div className='col-9 overflow-auto'>

              <Routes>


                <Route path="/" element={<Announcements />} />
                <Route path="/numaralar" element={<Telephones />} />
                <Route path="/personeller" element={<Personeller />} />
                <Route path="/anketler" element={<Anketler />} />
                <Route path="/mudurlukler" element={<Mudurlukler />} />
                <Route path="/giriscikislar" element={<Girisler />} />
                <Route path="/ipler" element={<Clients />} />
                <Route path="/anket/:id" element={<Anket />} />

              </Routes>
            </div>

          </div>
          :
          <div>
            <LoginPage />
          </div>
        
        

      }
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
