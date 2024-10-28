import { Children, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faCircleInfo, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormSelect, Button, Modal, ModalBody, ModalFooter, FormGroup, FormLabel, FormCheck, Table } from 'react-bootstrap'

import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import SearchForm2 from '../../../components/Forms/searchForm2'
import InputShadow from '../../../components/Forms/InputShadow'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'

import styles from './style.module.css'

const tableHd = [
  { key: "Mã nhóm quyền", value: "" },
  { key: "Tên nhóm quyền", value: "" },
  { key: "Ghi chú", value: "" },
]

const defaultPermissions = [
  { feature: "test", view: true, insert: false, update: false, delete: false, export: false },
  { feature: "test", view: false, insert: true, update: false, delete: false, export: false },
  { feature: "test", view: false, insert: false, update: false, delete: true, export: false },
  { feature: "test", view: false, insert: true, update: false, delete: false, export: false }
]
function PhanQuyen() {
  const [modal, setModal] = useState("")
  const [permission, setPermission] = useState([...defaultPermissions])

  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={setModal.bind({}, "add")} />
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={setModal.bind({}, "edit")} />
          <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa" />
        </>}
        rightSec={<FlexForm>
          <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm" />
          <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success' >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Button className='d-flex gap-2 align-items-center' variant='primary'>
            <FontAwesomeIcon icon={faArrowRotateRight} />
            <span>Làm mới</span>
          </Button>
        </FlexForm>}
        dataTable={<TableA headers={tableHd} />}
      />

      <Modal scrollable show={modal === "add"} centered backdrop="static" size='xl' className='vh-100'>
        <HeaderModalA title="THÊM NHÓM QUYỀN" />

        <PhanQuyenModal />

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button className='_w-23' variant='primary'>Thêm nhóm quyền</Button>
          <Button className='_w-23' variant='danger' onClick={setModal.bind({}, "")} >Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal scrollable show={modal === "edit"} centered backdrop="static" size='xl' className='vh-100'>
        <HeaderModalA title="CHỈNH SỬA NHÓM QUYỀN" />

        <PhanQuyenModal />

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button className='_w-15 py-2' variant='primary'>Lưu</Button>
          <Button className='_w-15 py-2' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function PhanQuyenModal({ data = [], setData }) {
  function onChange() {

  }

  return (
    <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>
      <Form className='d-flex flex-column gap-3 h-100'>
        <FormGroup className='d-flex gap-5'>
          <FormGroup className='w-100'>
            <FormLabel className='fw-bold'>Tên nhóm quyền</FormLabel>
            <InputShadow />
          </FormGroup>

          <FormGroup className='w-100'>
            <FormLabel className='fw-bold'>Mã nhóm quyền</FormLabel>
            <InputShadow disabled />
          </FormGroup>
        </FormGroup>

        <ContentA className='d-flex flex-column h-100 w-100 overflow-auto'>
          <div>


          <Table borderless className='h-100 w-100 bg-light ' >
            <thead className='fw-bold text-nowrap ' >
              <tr className=''>
                <th>Danh mục chức năng</th>
                <th className='text-center px-4'>Xem</th>
                <th className='text-center px-4'>Sửa</th>
                <th className='text-center px-4'>Xóa</th>
                <th className='text-center px-4'>Xuất dữ liệu</th>
              </tr>
            </thead>

            <tbody className=''>
              {new Array(5).fill().map((i,j) => (
                <tr key={j}>
                  <td>Quản lý tài khoản</td>
                  {new Array(10).fill().map((i,j) => <td key={j}>{<FormCheck size="xl" className='text-center' disabled={Math.random() > .5} />}</td>)}
                </tr>
              ))}

            </tbody>
          </Table>
           </div>
          {/* <div style={{ width: "10000px", height: "1000px" }} style={{wiminWidthh:"200px", }><
        /div> */}
        </ContentA>
        {/* <ContentA as={FormGroup} className="h-100 px-3 py-2 overflow-x-hidden overflow-y-auto"> */}

        {/* {new Array(10).fill().map(i => (
              <>
                <FormLabel className='fw-bold fs-5 text-nowrap'>Quản lý tài khoản</FormLabel>
                <FormGroup className='mb-4 d-flex gap-3 w-100 overflow-x-auto align-items-center border-bottom border-dark'>
                  <FormCheck className='text-nowrap' inline label="Xem" />
                  <FormCheck className='text-nowrap' inline label="Sửa" />
                  <FormCheck className='text-nowrap' inline label="Xóa" />
                  <FormCheck className='text-nowrap' inline label="Xem chi tiết" />
                  {new Array(Math.floor(Math.random() * 25)).fill().map(i => <FormCheck className='text-nowrap' inline label="a" />)}
                </FormGroup>
              </>
            ))} */}

        {/* </ContentA> */}

      </Form>
    </ModalBody >
  )
}

export default PhanQuyen