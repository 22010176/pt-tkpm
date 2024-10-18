import SideNavbar from '../sideBar'

import style from './style.module.css'

function PageTemplateD({ children }) {
  const sidebarWidth = 20
  return (
    <main className='overflow-hidden vh-100'>
      <div className='d-flex h-100'>
        <section className='h-100' style={{ width: sidebarWidth + "%" }}>
          <SideNavbar />
        </section>

        <section className='bg-primary-subtle h-100' style={{ width: (100 - sidebarWidth) + "%" }}>
          {children}
        </section>
      </div>
    </main>
  )
}

export default PageTemplateD