import { useState } from 'react'
import { Image, Form, FormGroup, FormLabel, FormControl, FormSelect, Button } from 'react-bootstrap'

import ContentA from '../../../components/layouts/blockContent'
import Page1 from '../../../components/layouts/Page1'
import SideNavbar from '../../../components/layouts/sideBar'
import InputShadow from '../../../components/Forms/InputShadow'

import styles from './style.module.css'


function TaiKhoan() {

  return (
    <Page1 sidebar={<SideNavbar />}>
      <div className='d-flex p-3 gap-3 flex-column w-100 h-100 _bg-blue-0'>
        <div className='_bg-blue w-auto p-2 mx-auto text-center text-light px-5 rounded-3 shadow-sm'>
          <h2 className='m-0'>
            Tài khoản
          </h2>
        </div>

        <div class="d-flex gap-0 gap-3 vh-100">
          <ContentA as={Form} className="w-25 h-100 d-flex flex-column p-3 gap-4">
            <FormGroup className='h-50 d-flex flex-column gap-2'>
              <Image src='test' className='h-100 w-100 bg-dark border border-dark border-3' />
              <InputShadow type="file" />
            </FormGroup>

            <FormGroup className='d-flex gap-1 align-items-center'>
              <FormLabel className='fw-bold w-100'>Mã nhân viên</FormLabel>
              <InputShadow disabled />
            </FormGroup>

            <FormGroup className='d-flex gap-1 align-items-center'>
              <FormLabel className='fw-bold w-100'>Vị trí</FormLabel>
              <InputShadow disabled />
            </FormGroup>
          </ContentA>

          <ContentA as={Form} className="d-flex flex-column justify-content-between p-3 w-75">

            <FormGroup className='d-flex flex-column gap-3'>
              {/*  Thông tin tài khoản cá nhân */}
              <FormGroup className='d-flex flex-column gap-2'>
                <FormLabel className='fw-bold w-100 fs-4 border-bottom border-2 border-dark pb-2'>
                  Thông tin tài khoản
                </FormLabel>

                <FormGroup className='d-flex gap-5 justify-content-around'>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Họ Tên</FormLabel>
                    <InputShadow as={FormControl} />
                  </FormGroup>

                  <FormGroup className='w-25'>
                    <FormLabel className='fw-bold'> Giới tính</FormLabel>
                    <InputShadow as={FormSelect}>
                      <option>Nam</option>
                      <option>Nam1</option>
                      <option>Nam2</option>
                      <option>Nam3</option>
                    </InputShadow>
                  </FormGroup>
                </FormGroup>

                <FormGroup className='d-flex gap-5 justify-content-around'>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Ngày sinh</FormLabel>
                    <InputShadow as={FormControl} type="date" />
                  </FormGroup>

                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>CCCD</FormLabel>
                    <InputShadow as={FormControl} />
                  </FormGroup>
                </FormGroup>

                <FormGroup className='d-flex gap-5 justify-content-around'>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Email</FormLabel>
                    <InputShadow as={FormControl} type="email" />
                  </FormGroup>

                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Số điện thoại</FormLabel>
                    <InputShadow as={FormControl} type="tel" />
                  </FormGroup>
                </FormGroup>
              </FormGroup>

              {/* Địa chỉ */}
              <FormGroup className='d-flex w-100 flex-wrap gap-2'>
                <FormLabel className='fw-bold w-100 fs-4 border-bottom border-2 border-dark pb-2'>
                  Địa chỉ
                </FormLabel>

                <FormGroup className='d-flex gap-5 w-100'>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Tỉnh/Thành phố</FormLabel>
                    <InputShadow as={FormControl} />
                  </FormGroup>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Quận/huyện</FormLabel>
                    <InputShadow as={FormControl} />
                  </FormGroup>
                  <FormGroup className='w-100'>
                    <FormLabel className='fw-bold'>Phường/Xã</FormLabel>
                    <InputShadow as={FormControl} />
                  </FormGroup>
                </FormGroup>

                <FormGroup className='w-100'>
                  <FormLabel className='fw-bold'>Thôn, làng/Đường, ngõ, hẻm</FormLabel>
                  <InputShadow as={FormControl} />
                </FormGroup>
              </FormGroup>

              {/* <div style={{ height: "1000px" }}></div> */}
            </FormGroup>

            <FormGroup className='justify-content-end d-flex gap-3 w-100 '>
              <Button className='px-5' variant='success'>Lưu</Button>
              <Button className='px-5' variant='danger' >Hủy</Button>
            </FormGroup>
          </ContentA>
        </div>
      </div>
    </Page1 >
  )
}

export default TaiKhoan