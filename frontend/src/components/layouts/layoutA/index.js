import styles from './style.module.css'

function LayoutA({ children, className, ...prop }) {
  return (
    <main {...prop} className={[className, "container-fluid vw-100 vh-100 p-0 m-0"].join(" ")} >
      <div className='row h-100 w-100 m-0'>
        {children}
      </div>
    </main>
  )
}

LayoutA.Col = function ({ children, className, ...prop }) {
  return (
    <section {...prop} className={[className, 'col-auto p-0'].join(" ")}  >
      {children}
    </section>
  )
}

export default LayoutA