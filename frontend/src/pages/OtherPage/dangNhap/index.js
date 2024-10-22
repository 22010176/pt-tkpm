import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCircleCheck, faEnvelope, faKey, faMailBulk, faRightToBracket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';

import InputShadow from '../../../components/Forms/InputShadow';
import colors from '../../../utilities/colors';
import styles from './style.module.css'
import { useState } from 'react';

function DangNhap() {
  const [formData, setFormData] = useState();

  return (<>

    <div className='d-flex flex-column vw-100 vh-100 bg-light'>
      <div className='_bg-blue-3 px-5 py-3 text-light d-flex justify-content-between'>
        <h1>HỆ THỐNG QUẢN LÝ KHO HÀNG ĐIỆN THOẠI</h1>
        <div className='d-flex gap-3 align-items-center'>
          <span>Trang chủ</span>
          <FontAwesomeIcon icon={faCaretRight} />
          <span>Đăng nhập</span>
        </div>
      </div>
      <div className='d-flex h-100'>
        <div className='w-100 bg-light'></div>
        <Form className='w-100 d-flex flex-column align-items-center justify-content-center gap-5'>
          <FormLabel className='fw-bold fs-3 _text-blue-3'>Đăng nhập</FormLabel>

          <FormGroup className='d-flex gap-3 align-items-center w-50'>
            <FormLabel>
              <FontAwesomeIcon icon={faEnvelope} width={"40px"} />
            </FormLabel>
            <InputShadow placeholder="Email" type="mail" />
          </FormGroup>

          <FormGroup className='d-flex gap-3 w-50'>
            <FormLabel>
              <FontAwesomeIcon icon={faKey} width={"40px"} />
            </FormLabel>
            <InputShadow placeholder="Mật khẩu" type="password" />
          </FormGroup>

          <FormGroup className='d-flex flex-column gap-3 text-center' >
            <Button >Đăng nhập</Button>
            <Button variant='outline'>Quên mật khẩu?</Button>
          </FormGroup>
        </Form>
      </div>
    </div>


  </>
  )
}


export default DangNhap;