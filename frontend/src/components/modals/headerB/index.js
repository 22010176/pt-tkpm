import { Modal } from 'react-bootstrap';

import styles from './style.module.css'

const HeaderModalB = function ({ children, ...prop }) {
  return (
    <Modal.Header {...prop} className='bg-primary text-light'>
      {children}
    </Modal.Header>
  )
}

export default HeaderModalB;