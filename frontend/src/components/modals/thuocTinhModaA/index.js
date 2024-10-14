import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Button, Form, Modal, Table, InputGroup } from 'react-bootstrap';
import { v4 } from 'uuid'

import styles from './style.module.css'
import HeaderModalA from '../headerA';
import TableA from '../../tables/tableA';
import { thuocTinhAPI } from '../../../api';
import { useEffect, useState } from 'react';

const headers = [
  { key: "Mã", value: "ma" },
  { key: "Tên", value: "ten" }
]

const ThuocTinhModalA = function ({ title, icon, apiRoute, onClose, unit, ...prop }) {
  const [tableData, setTableData] = useState([])

  useEffect(function () {
    thuocTinhAPI.GET(apiRoute).then(data => setTableData(data.body))
    thuocTinhAPI.GET(apiRoute).then(console.log)
  }, [])
  const tableHeader = headers.map(({ key, value }) => ({ key: key + " " + title?.toLowerCase(), value }))

  return (
    <Modal {...prop} backdrop="static" scrollable centered size='lg' >
      <HeaderModalA title={title?.toUpperCase()} />

      <Modal.Body className='overflow-y-hidden' style={{ height: "60vh" }}>
        <div className='container-fluid h-100'>
          <div className='align-items-center d-flex justify-content-center gap-4 mb-4'>
            <FontAwesomeIcon icon={icon} size='7x' className='col-auto' />
            <Form className='w-50'>
              <Form.Group>
                <h5>{title}</h5>
                {unit ? (
                  <InputGroup className="mb-3">
                    <Form.Control type='number' />
                    <InputGroup.Text >{unit}</InputGroup.Text>
                  </InputGroup>
                ) : <Form.Control type='text' className='w-100' />}
              </Form.Group>
            </Form>
          </div>

          <div className='justify-content-center mx-3' style={{ height: "70%" }}>
            <div className='overflow-y-auto h-100 border border-black' style={{}}>
              <TableA headers={tableHeader} data={tableData} />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center gap-5 py-4'>
        <Button style={{ width: "15%" }} variant='info'>Thêm</Button>
        <Button style={{ width: "15%" }} variant='success'>Sửa</Button>
        <Button style={{ width: "15%" }} variant='danger'>Xóa</Button>
        <Button style={{ width: "15%" }} variant='dark' onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default ThuocTinhModalA;