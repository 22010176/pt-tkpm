import { forwardRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from './style.module.css'

const btnStyle = "btn d-grid gap-2 text-center align-self-center"
const btnTitleStyle = "m-0 fw-bold"

const ToolBtn = forwardRef(function ({ className, icon, color, title, ...prop }, ref) {
  return (
    <button {...prop} ref={ref} className={[btnStyle, "btn ", className].join(" ")}  >
      <FontAwesomeIcon icon={icon} className='mx-auto' color={color} size='3x' />
      <p className={[btnTitleStyle].join(" ")}> {title?.toUpperCase()} </p>
    </button>
  )
})

export default ToolBtn