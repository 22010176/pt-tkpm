import { useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faCircleInfo, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormSelect, Button, Modal, ModalBody, ModalFooter, FormGroup, FormLabel } from 'react-bootstrap'

import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import SearchForm2 from '../../../components/Forms/searchForm2'
import InputShadow from '../../../components/Forms/InputShadow'
import FlexForm from '../../../components/Forms/FlexForm'

import colors from '../../../utilities/colors'
import styles from './style.module.css'
import HeaderModalA from '../../../components/modals/headerA'
import GroupShadow from '../../../components/Forms/GroupShadow'
import ContentA from '../../../components/layouts/blockContent'

const tableHd = [
  { key: "Mã tài khoản", value: "" },
  { key: "Mã nhân viên", value: "" },
  { key: "Tên nhân viên", value: "" },
  { key: "Gmail", value: "" },
  { key: "Nhóm quyền", value: "" },
  { key: "Trạng thái", value: "" },
]

const chonNhanVienHD = [
  { key: "Mã nv", value: "" },
  { key: "Tên nhân viên", value: "" },
]
function QuanLyTaiKhoang() {
  const [modal, setModal] = useState("")

  function openModal(key, e) {
    setModal(key);
  }
  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={openModal.bind({}, "add")} />
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={openModal.bind({}, "edit")} />
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

      <Modal centered size='xl' show={modal === "add"} backdrop="static" scrollable className='_vh-100'>
        <HeaderModalA title="THÊM TÀI KHOẢN " />

        <ModalBody className='d-flex gap-4 px-5 py-4 _vh-60'>
          <div className='h-100 d-flex flex-column gap-2 _w-35'>
            <FormGroup className=''>
              <FormLabel className='fw-bold'>Chọn nhân viên</FormLabel>
              <GroupShadow>
                <FormControl />
                <Button> <FontAwesomeIcon icon={faPlus} /></Button>
              </GroupShadow>
            </FormGroup>

            <ContentA className="h-100">
              <TableA index={false} headers={chonNhanVienHD} />
              <div style={{ height: "10000px" }}></div>
            </ContentA>
          </div>

          <TaiKhoanForm className="_w-65" />
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button className='_w-20' variant='primary' >Thêm tài khoản</Button>
          <Button className='_w-20' variant='danger' onClick={openModal.bind({}, "")} >Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal centered size='lg' show={modal === "edit"} backdrop="static" scrollable className='_vh-100'>
        <HeaderModalA title="SỬA TÀI KHOẢN " />

        <ModalBody className='d-flex gap-4 px-5 py-4 _vh-60'>
          <TaiKhoanForm className="_w-100" passwordDisabled />
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button className='_w-20' variant='primary' >lưu</Button>
          <Button className='_w-20' variant='danger' onClick={openModal.bind({}, "")}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function TaiKhoanForm({ className, passwordDisabled }) {
  return (
    <Form className={[className, 'd-flex flex-column gap-5'].join(" ")}>
      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Mã tài khoản</FormLabel>
          <InputShadow disabled />
        </FormGroup>

        <FormGroup className='_w-100'>
          <FormLabel className='fw-bold'>Tên nhân viên</FormLabel>
          <InputShadow disabled />
        </FormGroup>
      </FormGroup>

      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Mã nhân viên</FormLabel>
          <InputShadow disabled />
        </FormGroup>

        <FormGroup className='_w-100'>
          <FormLabel className='fw-bold'>Gmail</FormLabel>
          <InputShadow disabled />
        </FormGroup>
      </FormGroup>

      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-100'>
          <FormLabel className='fw-bold'>Mật khẩu</FormLabel>
          <InputShadow type="password" disabled={passwordDisabled} />
        </FormGroup>

        <FormGroup className='_w-100'>
          <FormLabel className='fw-bold'>Nhóm quyền</FormLabel>
          <InputShadow as={FormSelect}>
            <option>TEST1</option>
            <option>TEST2</option>
            <option>TEST3</option>
          </InputShadow>
        </FormGroup>
      </FormGroup>
    </Form>
  )
}

export default QuanLyTaiKhoang