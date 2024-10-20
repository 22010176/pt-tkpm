import SideNavbar from '../sideBar'

import style from './style.module.css'

function Page1({ sidebar, children }) {
  const sidebarWidth = 20
  return (
    <main className='overflow-hidden vh-100'>
      <div className='d-flex h-100'>
        <section className='h-100' style={{ width: sidebarWidth + "%" }}>
          {sidebar}
        </section>

        <section className={['h-100 _bg-blue-0'].join(" ")} style={{ width: (100 - sidebarWidth) + "%" }}>
          {children}
        </section>
      </div>
    </main>
  )
}

export default Page1