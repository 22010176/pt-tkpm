import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faMemory, faBrush, faX } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup, Button, Modal, FormControl } from 'react-bootstrap'

// import PageTemplateB from '../../components/layouts/pageB'
import Page1 from '../../components/layouts/Page1'
import ThuocTinhBtn from '../../components/buttons/thuocTinhBtn'
import TableA from '../../components/tables/tableA'
import HeaderModalA from '../../components/modals/headerA'

import styles from './style.module.css'

const thuocTinh = {
  thuongHieu: { title: "Thương hiệu", icon: faEmpire, id: "thuongHieu" },
  xuatXu: { title: "Xuất xứ", icon: faMountainCity, id: "xuatXu" },
  hdh: { title: "Hệ điều hành", icon: faAndroid, id: "hdh" },
  ram: { title: "RAM", unit: "GB", icon: faComputer, id: "ram" },
  rom: { title: "ROM", unit: "GB", icon: faMemory, id: "rom" },
  mauSac: { title: "Màu sắc", icon: faBrush, id: "mauSac" },
}
const headers = [
  { key: "Mã", value: "ma" },
  { key: "Tên", value: "ten" }
]
function ThuocTinh() {
  const [modal, setModal] = useState()

  function openOverlay(modal, e) {
    setModal(thuocTinh[modal])
  }

  return (
    <>
      <Page1>
        <div className='d-flex flex-wrap flex-grow-1 h-100'>
          {/* Thương hiệu */}
          {Object.values(thuocTinh).map((i, j) => (
            <div className='d-flex justify-content-center align-items-center w-50 p-5' key={j}>
              <ThuocTinhBtn className={[styles[i.id], "w-100 h-100"].join(" ")} icon={i.icon} title={i.title} onClick={openOverlay.bind({}, i.id)} />
            </div>
          ))}
        </div>
      </Page1>

      <Modal backdrop="static" show={modal} scrollable centered size='lg'>
        <HeaderModalA title={modal?.title} />

        <Modal.Body className='overflow-y-hidden' style={{ height: "60vh" }}>
          <div className='h-100'>
            <div className='align-items-center w-100 d-flex justify-content-center gap-4 mb-4'>
              <FontAwesomeIcon size='6x' icon={modal?.icon} className='col-auto' />
              <Form className='w-50'>
                <Form.Group className='d-flex gap-2 align-items-center'>
                  <h5 className='text-nowrap'>{modal?.title}</h5>
                  <InputGroup>
                    <FormControl type={modal?.unit ? "number" : "text"} />
                    {!!modal?.unit && <InputGroup.Text>{modal.unit}</InputGroup.Text>}
                  </InputGroup>
                  <Button variant='danger' >
                    <FontAwesomeIcon icon={faX} className='p-0 m-0' />
                  </Button>
                </Form.Group>
              </Form>
            </div>

            <div className='justify-content-center mx-3' style={{ height: "70%" }}>
              <div className='overflow-y-auto h-100 border border-black' style={{}}>
                <TableA headers={headers} />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-center gap-5 py-4'>
          <Button style={{ width: "15%" }} variant='info' >Thêm</Button>
          <Button style={{ width: "15%" }} variant='success' >Sửa</Button>
          <Button style={{ width: "15%" }} variant='danger' >Xóa</Button>
          <Button style={{ width: "15%" }} variant='dark' onClick={openOverlay} >Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ThuocTinh