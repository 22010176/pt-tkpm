import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ErrorPage from './UtilitesPage/error';
import { navLinks } from '../utilities/navLinks';
import { getPermissions, getUserData } from '../api/authentication';

import { UserContext } from '../api/authentication';

function App() {
  const [token, setToken] = useState()
  const [perm, setPerm] = useState([])
  const [user, setUser] = useState()
  const links = navLinks.map(({ link, Component, links }) => {
    if (links.length === 0) return Component && { path: link, element: <Component /> }
    return links.map(({ href, Component }) => Component && ({ path: href, element: <Component /> }))
  }).flat().filter(i => !!i)

  useEffect(function () {
    const token = sessionStorage.getItem("accountToken");


    if (!token && document.location.pathname !== "/dang-nhap")
      document.location.replace("/dang-nhap")

    setToken(token)
    getPermissions(token).then(data => setPerm(data))
    getUserData(token).then(data => setUser(data))
  }, [token])
  // console.log(token, perm, user)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, perm, user }}>
        <Routes>
          {links.map((i, j) => <Route key={j} {...i} />)}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
