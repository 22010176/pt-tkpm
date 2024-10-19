import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { navLinks } from '../utilities/navLinks';
import ErrorPage from './UtilitesPage/error';

import './style.css'

function App() {
  const links = navLinks.map(({ link, Component, links }) => {
    if (links.length === 0) return Component && { path: link, element: <Component /> }
    return links.map(({ href, Component }) => Component && ({ path: href, element: <Component /> }))
  }).flat().filter(i => !!i)

  return (
    <BrowserRouter>
      <Routes>
        {links.map((i, j) => <Route key={j} {...i} />)}
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
