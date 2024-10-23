import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ErrorPage from './UtilitesPage/error';
import { navLinks } from '../utilities/navLinks';
import { authToken } from '../utilities/authentication';

import { UserContext } from '../utilities/authentication';

function App() {
  const [token, setToken] = useState()

  const links = navLinks.map(({ link, Component, links }) => {
    if (links.length === 0) return Component && { path: link, element: <Component /> }
    return links.map(({ href, Component }) => Component && ({ path: href, element: <Component /> }))
  }).flat().filter(i => !!i)

  useEffect(function () {
    authToken()
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={token}>
        <Routes>
          {links.map((i, j) => <Route key={j} {...i} />)}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
