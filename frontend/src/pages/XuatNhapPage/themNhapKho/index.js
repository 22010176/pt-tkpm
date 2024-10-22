import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, CloseButton, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'

import SideNavbar from '../../../components/layouts/sideBar'
import TableA from '../../../components/tables/tableA'
import BarCodeScanner from '../../../components/barcode'
import Page4 from '../../../components/layouts/Page4'

import style from './style.module.css'
import InputShadow from '../../../components/Forms/InputShadow'
import GroupShadow from '../../../components/Forms/GroupShadow'

const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sp", value: "tenSP" },
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Đơn giá", value: "gia" },
  { key: "Số lượng", value: "soLuong" },
]

const khoHeader = [
  { key: "Tên sp", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "tonKho" },
]

function ThemNhapKho() {
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
      <Page4
        count={0}
        sidebar={<SideNavbar />}
        tableTop={
          <GroupShadow>
            <InputGroup.Text>Tìm kiếm</InputGroup.Text>
            <Form.Control />
            <Button variant="success">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </GroupShadow>
        }
        table={<TableA headers={khoHeader} index />}
        tableForm={
          <Form className='p-3 d-flex gap-3 w-100 flex-column'>
            <FormGroup className='d-flex justify-content-between gap-4'>
              <FormGroup>
                <FormLabel className='fw-bold'>Mã sp</FormLabel>
                <InputShadow as={FormControl} type='text' disabled size='sm' />
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Tên sp</FormLabel>
                <InputShadow as={FormControl} size='sm' type='text' disabled />
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Cấu hình</FormLabel>
              <InputShadow as={FormSelect} size='sm'>
                <option>test</option>
                <option>tes2</option>
                <option>tes4</option>
                <option>tes5</option>
              </InputShadow>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Giá nhập</FormLabel>
              <GroupShadow size="sm">
                <FormControl disabled size='sm' type='number' />
                <InputGroup.Text>VNĐ</InputGroup.Text>
              </GroupShadow>
            </FormGroup>

            <FormGroup className='d-flex gap-2 justify-content-between align-items-center'>
              <FormLabel className='fw-bold'>Mã IMEI</FormLabel>
              <ButtonGroup>
                <Button variant='primary' size="sm" onClick={openModal.bind({}, "scanIMEI")}>Scan</Button>
                <Button variant='success' size="sm">Excel</Button>
              </ButtonGroup>
            </FormGroup>

            <FormGroup>
              <GroupShadow size='sm'>
                <FormControl type='text' id='imei-input' size='sm' />
                <Button variant='primary' onClick={onInsertIMEICode}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </GroupShadow>

              <div className='h-100 overflow-auto'>
                <ListGroup variant='flush' className='bg-light'>
                  {Object.keys(imei).map((i, j) => <ListGroupItem key={j}>{i}</ListGroupItem>)}
                </ListGroup>
              </div>
            </FormGroup>
          </Form>
        }
        toolBtn={<>
          <Button size='sm' className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
          <Button size='sm' className='w-25 my-3 fw-semibold' variant='primary'>Thêm sản phẩm</Button>
          <Button size='sm' className='w-25 my-3 fw-semibold' variant='warning'>Sửa sản phẩm</Button>
          <Button size='sm' className='w-25 my-3 fw-semibold' variant='danger'>Xóa sản phẩm</Button>
        </>}
        table2={<TableA headers={spHeader} />}
        rightTopForm={<>
          <FormGroup>
            <FormLabel className='fw-bold'>Mã phiếu nhập</FormLabel>
            <InputShadow as={FormControl} disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Nhân viên nhập</FormLabel>
            <InputShadow as={FormControl} disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Nhà cung cấp</FormLabel>
            <InputShadow as={FormSelect}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
              <option>test4</option>
            </InputShadow>
          </FormGroup>
        </>}
        rightBottomForm={<>
          <h3 className='mb-3 text-danger fw-bold'>Tổng tiền: <span>0</span>đ</h3>
          <Button className='w-100 fw-semibold' variant='success'>Nhập hàng</Button>
        </>}
      />

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