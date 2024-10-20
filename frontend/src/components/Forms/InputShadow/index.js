import React, { forwardRef } from 'react'

import styles from './style.module.css'
import { FormControl } from 'react-bootstrap'

const InputShadow = forwardRef(function ({ as: As = "input", className, children, ...prop }, ref) {
  return (
    <As ref={ref} {...prop} className={[className, "form-control shadow-sm"].join(" ")} >
      {children}
    </As>
  )
})

export default InputShadow