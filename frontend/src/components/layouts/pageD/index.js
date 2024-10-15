import style from './style.module.css'

function PageTemplateD({ sidebarWidth = 20, sidebar, children }) {
  return (
    <main className='overflow-hidden vh-100'>
      <div className='d-flex h-100'>
        <section className='h-100' style={{ width: sidebarWidth + "%" }}>
          {sidebar}
        </section>

        <section className='bg-info-subtle h-100' style={{ width: (100 - sidebarWidth) + "%" }}>
          {children}
        </section>
      </div>
    </main>
  )
}

export default PageTemplateD