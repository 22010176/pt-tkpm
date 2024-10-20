import styles from './style.module.css'

function Div({ children, ...prop }) {
  return <div {...prop}>{children}</div>
}

const ContentA = function ({ As = Div, children, className, ...prop }) {
  return (
    <As {...prop} className={[styles.element, className, 'rounded-3 bg-light border border-1 shadow-sm mh-100 overflow-auto'].join(" ")} >
      {children}
    </As>
  )
}

export default ContentA;