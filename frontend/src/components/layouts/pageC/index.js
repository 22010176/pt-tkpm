import style from './style.module.css'

function PageTemplateC({ sidebarWidth = 20, toolbarHeight = 15, sidebar, tools, rightSec, dataTable }) {
  return (
    <main className='overflow-hidden vh-100'>
      <div className='d-flex h-100'>
        <section className='h-100' style={{ width: sidebarWidth + "%" }}>
          {sidebar}
        </section>

        <section className='bg-info-subtle h-100 d-flex flex-column p-3 gap-4' style={{ width: (100 - sidebarWidth) + "%" }}>
          <div style={{ height: toolbarHeight + "%" }}>
            <div className='px-3 d-flex h-100 justify-content-between align-items-center bg-light border border-info-subtle border-5 rounded'>
              <div className='d-flex gap-2'>
                {tools}
              </div>

              {rightSec}
            </div>
          </div>

          <div style={{ height: 100 - toolbarHeight + "%" }}>
            <div className='h-100 bg-light mh-100 overflow-auto border border-info-subtle border-5 rounded'>
              {dataTable}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PageTemplateC