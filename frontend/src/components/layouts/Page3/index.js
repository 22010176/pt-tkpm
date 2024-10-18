import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, CloseButton, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'

import ContentA from '../blockContent'
import Page1 from '../Page1'
import SideNavbar from '../sideBar'
import TableA from '../../tables/tableA'
import BarCodeScanner from '../../barcode'


import style from './style.module.css'

const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sp", value: "tenSP" },
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Đơn giá", value: "gia" },
]

const khoHeader = [
  { key: "Tên sp", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "tonKho" },
]

function ThemNhapKho() {
  const width = 75;
  const height = 60;

  const width2 = 60;

  const [modal, setModal] = useState("")
  const [imei, setImei] = useState({})

  function scanImei(data) {
    openModal("")
    setImei(src => ({ ...src, [data]: data }))
  }

  function openModal(key, e) {
    setModal(key)
  }

  function onInsertIMEICode(e) {
    e.preventDefault();
    const elem = document.getElementById("imei-input");
    if (!elem.value) return;

    const data = elem.value;
    setImei(src => ({ ...src, [data]: data }))

    elem.value = ""

  }
  return (
    <>
      <Page1 sidebar={<SideNavbar />}>
        <div className='w-100 h-100 d-flex p-3 gap-2'>
          <div className='h-100 d-flex flex-column' style={{ width: width + "%" }}>
            <div className='d-flex gap-2' style={{ height: height + "%" }}>
              <div className='d-flex flex-column gap-2' style={{ width: width2 + "%" }}>
                <Form>
                  <InputGroup>
                    <InputGroup.Text>Tìm kiếm</InputGroup.Text>
                    <Form.Control />
                  </InputGroup>
                </Form>

                <ContentA className='h-100 overflow-auto bg-light'>
                  <TableA headers={khoHeader} index />
                </ContentA>
              </div>

              <ContentA As={Form} className="p-3 d-flex gap-3 flex-column justify-content-around" style={{ width: 100 - width2 + "%" }}>
                <FormGroup className='d-flex justify-content-between gap-4'>
                  <FormGroup>
                    <FormLabel className='fw-bold'>Mã sp</FormLabel>
                    <FormControl type='text' disabled size='sm' />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel className='fw-bold'>Tên sp</FormLabel>
                    <FormControl size='sm' type='text' disabled />
                  </FormGroup>
                </FormGroup>

                <FormGroup>
                  <FormLabel className='fw-bold'>Cấu hình</FormLabel>
                  <FormSelect size='sm'>
                    <option>test</option>
                    <option>tes2</option>
                    <option>tes4</option>
                    <option>tes5</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel className='fw-bold'>Giá nhập</FormLabel>
                  <InputGroup>
                    <FormControl size='sm' type='number' />
                    <InputGroup.Text>VNĐ</InputGroup.Text>
                  </InputGroup>
                </FormGroup>

                <FormGroup className='d-flex gap-2 flex-column'>
                  <div className='d-flex gap-3 justify-content-between'>
                    <FormLabel className='fw-bold'>Mã IMEI</FormLabel>
                    <ButtonGroup>
                      <Button variant='primary' size="sm" onClick={openModal.bind({}, "scanIMEI")}>Scan</Button>
                      <Button variant='success' size="sm">Excel</Button>
                    </ButtonGroup>
                  </div>
                </FormGroup>

                <FormGroup className='h-100'>
                  <InputGroup size='sm'>
                    <FormControl type='text' id='imei-input' size='sm' />
                    <Button variant='primary' onClick={onInsertIMEICode}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </InputGroup>

                  <div className='h-100 overflow-auto'>
                    <ListGroup variant='flush' className='bg-light'>
                      {Object.keys(imei).map((i, j) => <ListGroupItem key={j}>{i}</ListGroupItem>)}
                    </ListGroup>
                  </div>
                </FormGroup>
              </ContentA>
            </div>

            <div className='d-flex flex-column gap-1' style={{ height: 100 - height + "%" }}>
              <div className='h-25 d-flex justify-content-between gap-5 w-100 px-1'>
                <Button size='sm' className='w-25 my-3 fw-semibold' variant='primary'>Thêm sản phẩm</Button>
                <Button size='sm' className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
                <Button size='sm' className='w-25 my-3 fw-semibold' variant='warning'>Sửa sản phẩm</Button>
                <Button size='sm' className='w-25 my-3 fw-semibold' variant='danger'>Xóa sản phẩm</Button>
              </div>

              <ContentA className='w-100 h-100' >
                <TableA headers={spHeader} />

                <div style={{ height: "10000px" }}></div>
              </ContentA>

              <p className='text-end fw-bold mx-3 fs-5'>Tổng số: <span className='sp-count'>0</span> chiếc</p>
            </div>
          </div>

          <ContentA className="d-flex justify-content-between flex-column p-3" style={{ width: 100 - width + "%" }}>
            <Form className='d-flex flex-column gap-5'>
              <FormGroup>
                <FormLabel className='fw-bold'>Mã phiếu nhập</FormLabel>
                <FormControl disabled />
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Nhân viên nhập</FormLabel>
                <FormControl disabled />
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Nhà cung cấp</FormLabel>
                <FormSelect>
                  <option>test1</option>
                  <option>test2</option>
                  <option>test3</option>
                  <option>test4</option>
                </FormSelect>
              </FormGroup>
            </Form>

            <div className='px-auto text-center'>
              <h3 className='mb-3 text-danger fw-bold'>Tổng tiền: <span>0</span>đ</h3>
              <Button className='w-100 fw-semibold' variant='success'>Nhập hàng</Button>
            </div>
          </ContentA>
        </div>
      </Page1 >

      <Modal centered size='lg' scrollable show={modal === "scanIMEI"} backdrop="static">
        <ModalHeader className='bg-primary px-3'>
          <Modal.Title className='text-center w-100 fw-bold fs-2 text-light'>
            QUÉT MÃ IMEI
          </Modal.Title>
          <CloseButton onClick={openModal.bind({}, "")} />
        </ModalHeader>

        <ModalBody className='vh-100 p-3' >
          <BarCodeScanner onChange={scanImei} />
        </ModalBody>
      </Modal>
    </>
  )
}

export default ThemNhapKho