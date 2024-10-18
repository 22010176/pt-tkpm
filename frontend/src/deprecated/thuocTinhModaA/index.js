import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Button, Form, Modal, Table, InputGroup } from 'react-bootstrap';
import { v4 } from 'uuid'

import styles from './style.module.css'
import HeaderModalA from '../../components/modals/headerA';
import TableA from '../../components/tables/tableA';
import { thuocTinhAPI } from '../../api';
import { useEffect, useRef, useState } from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';

const headers = [
  { key: "Mã", value: "ma" },
  { key: "Tên", value: "ten" }
]

const defaultItem = { ma: "", ten: "" }

const ThuocTinhModalA = function ({ title, icon, apiRoute, onClose, unit, ...prop }) {
  // store unchanged table's header
  const tableHeader = useRef(headers.map(({ key, value }) => ({ key: key + " " + title?.toLowerCase(), value })))
  const insertBtn = useRef(), updateBtn = useRef(), deleteBtn = useRef()
  // store display table data
  const [tableData, setTableData] = useState([])

  // store form data
  const [formData, setFormData] = useState({ ...defaultItem })

  useEffect(function () {
    fetchData()
  }, [])

  useEffect(function () {
    console.log(formData)
  }, [formData])


  function fetchData() {
    setTableData([])
    thuocTinhAPI.GET(apiRoute).then(data => setTableData(data.body))
  }

  function resetFormData() {
    setFormData({ ...defaultItem })
  }

  function onFormDataChange(key, e) {
    setFormData(src => ({ ...src, [key]: e.target.value }))
  }

  function onRowClick(data) {
    // if (!data) return setFormData({ ...defaultItem })
    if (data) setFormData(data)
  }

  function onDeselectRow() {
    onRowClick(undefined)
    TableA.clearSelect()
  }

  async function onInsertItem() {
    const result = await thuocTinhAPI.PUT(apiRoute, formData)
    fetchData();
    if (result.message === "Success") resetFormData();
  }

  async function onUpdateItem(params) {

  }

  async function onDeleteItem(params) {

  }

  return (
    <Modal {...prop} backdrop="static" scrollable centered size='lg'>
      <HeaderModalA title={title?.toUpperCase()} />

      <Modal.Body className='overflow-y-hidden' style={{ height: "60vh" }}>
        <div className='h-100'>
          <div className='align-items-center w-100 d-flex justify-content-center gap-4 mb-4'>
            <FontAwesomeIcon icon={icon} size='6x' className='col-auto' />
            <Form className='w-50'>
              <Form.Group className='d-flex gap-2 align-items-center'>
                <h5 className='text-nowrap'>{title}</h5>
                {unit
                  ? <InputGroup>
                    <Form.Control type='number' value={formData.ten} onChange={onFormDataChange.bind({}, "ten")} />
                    <InputGroup.Text >{unit}</InputGroup.Text>
                  </InputGroup>
                  : <Form.Control type='text' className='w-100' value={formData.ten} onChange={onFormDataChange.bind({}, "ten")} />}

                <Button variant='danger' onClick={onDeselectRow}>
                  <FontAwesomeIcon icon={faX} className='p-0 m-0' />
                </Button>
              </Form.Group>
            </Form>
          </div>

          <div className='justify-content-center mx-3' style={{ height: "70%" }}>
            <div className='overflow-y-auto h-100 border border-black' style={{}}>
              <TableA headers={tableHeader.current} data={tableData} onClick={onRowClick} />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center gap-5 py-4'>
        <Button ref={insertBtn} style={{ width: "15%" }} variant='info' onClick={onInsertItem}>Thêm</Button>
        <Button ref={updateBtn} style={{ width: "15%" }} variant='success' onClick={onUpdateItem}>Sửa</Button>
        <Button ref={deleteBtn} style={{ width: "15%" }} variant='danger' onClick={onDeleteItem}>Xóa</Button>
        <Button style={{ width: "15%" }} variant='dark' onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ThuocTinhModalA;