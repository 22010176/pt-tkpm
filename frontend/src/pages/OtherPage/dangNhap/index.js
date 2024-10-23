import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCircleCheck, faEnvelope, faKey, faMailBulk, faRightToBracket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap';

import InputShadow from '../../../components/Forms/InputShadow';
import colors from '../../../utilities/colors';
import styles from './style.module.css'

import { authAccount } from '../../../utilities/authentication';

function DangNhap() {
  const [formData, setFormData] = useState({ mail: "admin2@g", password: "admin" });

  async function onSubmit(e) {
    e.preventDefault()
    const result = await authAccount(formData.mail, formData.password)
    if (!result.body.length) return alert("Fail")

    sessionStorage.setItem("accountToken", result.body[0].token)
    document.location.replace("/")
  }

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
        <Form className='w-100 d-flex flex-column align-items-center justify-content-center gap-5' onSubmit={onSubmit}>
          <FormLabel className='fw-bold fs-3 _text-blue-3'>Đăng nhập</FormLabel>

          <FormGroup className='d-flex gap-3 align-items-center w-50'>
            <FormLabel>
              <FontAwesomeIcon icon={faEnvelope} width={"40px"} />
            </FormLabel>
            <InputShadow placeholder="Email" type="mail" value={formData.mail} onChange={e => setFormData(src => ({ ...src, mail: e.target.value }))} />
          </FormGroup>

          <FormGroup className='d-flex gap-3 w-50'>
            <FormLabel>
              <FontAwesomeIcon icon={faKey} width={"40px"} />
            </FormLabel>
            <InputShadow placeholder="Mật khẩu" type="password" value={formData.password} onChange={e => setFormData(src => ({ ...src, password: e.target.value }))} />
          </FormGroup>

          <FormGroup className='d-flex flex-column gap-3 text-center' >
            <Button type='submit'>Đăng nhập</Button>
            <Button variant='outline'>Quên mật khẩu?</Button>
          </FormGroup>
        </Form>
      </div>
    </div>


  </>
  )
}


export default DangNhap;