import { createContext, useEffect, useState } from 'react'
import './App.css'
import Navigator from './view/navigator'
import Home from './view/home'
import BottomNavigator from './view/bottom_navigator'

export const LangContext = createContext()

function App() {
  const [lang, setLang] = useState('vi')

  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && !browserLang.toLowerCase().includes('vi')) {
      setLang('en');
    }
  })

  return (
    // <BrowserRouter>
    <div className='main-body'>
      <LangContext.Provider value={{ lang, setLang }}>
        <Navigator />
        <div className="App">
          {/* <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/projects' element={<Projects />} />
          </Routes> */}
          <Home />
        </div>
        <BottomNavigator />
      </LangContext.Provider>
    </div>
    // {/* </BrowserRouter> */}
  );
}


export default App
