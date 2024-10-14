import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './style.module.css'

const ThuocTinhBtn = forwardRef(function ({ icon, title, className, ...prop }, ref) {
  return (
    <div  {...prop} ref={ref} className={[styles.btn, className, "d-flex border border-dark border-5 gap-5 align-items-center rounded-3"].join(" ")}>
      {!!icon && <FontAwesomeIcon icon={icon} width={"150px"} size='7x' />}
      <h1> {title} </h1>
    </div>
  )
})

export default ThuocTinhBtn;