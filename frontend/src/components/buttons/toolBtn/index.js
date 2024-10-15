import { forwardRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from './style.module.css'

const btnStyle = "btn d-grid gap-2 text-center align-self-center"
const btnTitleStyle = "m-0 fw-bold"

const ToolBtn = forwardRef(function ({ icon, color, title, ...prop }, ref) {
  return (
    <div ref={ref} className={[btnStyle].join(" ")} {...prop} >
      <FontAwesomeIcon icon={icon} className='mx-auto' color={color} size='3x' />
      <p className={[btnTitleStyle].join(" ")}> {title?.toUpperCase()} </p>
    </div>
  )
})

export default ToolBtn