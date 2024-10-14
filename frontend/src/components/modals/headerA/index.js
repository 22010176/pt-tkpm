import { Modal } from 'react-bootstrap';

import styles from './style.module.css'

const HeaderModalA = function ({ title, ...prop }) {
  return (
    <Modal.Header {...prop} className='bg-primary text-light'>
      <Modal.Title className='text-center w-100 fw-bold fs-2'>
        {title}
      </Modal.Title>
    </Modal.Header>
  )
}

export default HeaderModalA;