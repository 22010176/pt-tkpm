import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './style.module.css'

const IconBtn = forwardRef(function ({ icon, title, className = "btn-outline-dark", ...prop }, ref) {
  return (
    <button ref={ref} type="button" className={[className, "btn d-flex gap-2 align-items-center"].join(" ")} {...prop}>
      {!!icon && <FontAwesomeIcon icon={icon} />}
      <span> {title} </span>
    </button>
  )
})

export default IconBtn;