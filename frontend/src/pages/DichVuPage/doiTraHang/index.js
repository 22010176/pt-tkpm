import { useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, FormSelect } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPencil, faTrashCan, faCircleInfo, faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import SearchForm2 from '../../../components/Forms/searchForm2'
import TableA from '../../../components/tables/tableA'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'
import InputShadow from '../../../components/Forms/InputShadow'
import IconBtn from '../../../components/buttons/iconBtn'
import FlexForm from '../../../components/Forms/FlexForm'

import styles from './style.module.css'

const doiTraHeader = [
  { key: "Mã phiếu đổi trả", value: "" },
  { key: "Mã khách hàng", value: "" },
  { key: "Tên khách hàng", value: "" },
  { key: "Số lượng đổi trả", value: "" },
  { key: "Ngày đổi trả", value: "" },
  { key: "Mã NV CSKH", value: "" },
  { key: "Tên NV", value: "" },
  { key: "Ghi chú", value: "" },
]

function DoiTraHang() {
  const [modal, setModal] = useState("")

  function openModal(key, e) {
    setModal(key);
  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color={colors.green} icon={faCirclePlus} title="Thêm" onClick={openModal.bind({}, "them")} />
          <ToolBtn color={colors.orange} icon={faPencil} title="Sửa" onClick={openModal.bind({}, "edit")} />
          <ToolBtn color={colors.yellow_2} icon={faTrashCan} title="Xóa" />
          <ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "doiTra")} />
        </>}
        rightSec={
          <FlexForm>
            <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm" />
            <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success' >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button className='d-flex gap-2 align-items-center' variant='primary'>
              <FontAwesomeIcon icon={faArrowRotateRight} />
              <span>Làm mới</span>
            </Button>
          </FlexForm>
        }
        dataTable={<TableA headers={doiTraHeader} />}
      />
      <Modal centered show={modal === "them"} size='lg'>
        <HeaderModalA title={"THÊM GIAO DỊCH ĐỔI TRẢ"} />

        <ModalBody>
          <PhieuDoiTraForm />
        </ModalBody>

        <ModalFooter className='d-flex gap-5 justify-content-center'>
          <Button className='w-25' variant='primary'>Thêm giao dịch</Button>
          <Button className='w-25' variant='danger' onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>

      <Modal centered show={modal === "edit"} scrollable size='lg'>
        <HeaderModalA title={"SỬA GIAO DỊCH ĐỔI TRẢ"} />

        <ModalBody>
          <PhieuDoiTraForm phieuDoiTraID='E' />
        </ModalBody>

        <ModalFooter className='d-flex gap-5 justify-content-center'>
          <Button className='w-25' variant='primary'>Thêm giao dịch</Button>
          <Button className='w-25' variant='danger' onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>

      <Modal size='xl' show={modal === "doiTra"} centered scrollable backdrop="static" className='vh-100'>
        <HeaderModalA title={"Phiếu đổi trả"} />

        <ModalBody className='d-flex flex-column gap-3 h-100'>

        </ModalBody>

        <ModalFooter className='d-flex justify-content-center gap-5'>
          <Button className='_w-15' variant='primary'>Xuất PDF</Button>
          <Button className='_w-15' variant='danger' onClick={openModal.bind({}, "")}>Đóng</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function PhieuDoiTraForm({ phieuDoiTraID = "" }) {
  return (
    <Form className='d-flex flex-column gap-3 py-3 px-5 mx-5 h-100 justify-content-center'>
      <FormGroup className='d-flex w-100 align-items-between gap-5'>
        <FormGroup>
          <FormLabel className='fw-bold'>Mã khách hàng</FormLabel>
          <InputShadow as={FormControl} className="_w-100" />
        </FormGroup>

        {!!phieuDoiTraID && <FormGroup>
          <FormLabel className='fw-bold'>Mã phiếu đổi trả</FormLabel>
          <InputShadow as={FormControl} className="_w-100" disabled value={phieuDoiTraID} />
        </FormGroup>}
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Tên khách hàng</FormLabel>
        <InputShadow className="_w-100" as={FormControl} />
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Số lượng đổi trả</FormLabel>
        <InputShadow className="_w-100" as={FormControl} type="number" />
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Ngày đổi trả</FormLabel>
        <InputShadow className="_w-100" as={FormControl} type="date" />
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Ghi chú</FormLabel>
        <InputShadow className="_w-100" as={FormControl} />
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Mã nhân viên CSKH</FormLabel>
        <InputShadow as={FormControl} className=" w-auto" />
      </FormGroup>
      <FormGroup>
        <FormLabel className='fw-bold'>Tên nhân viên  </FormLabel>
        <InputShadow className="_w-100" as={FormControl} />
      </FormGroup>
    </Form>
  )
}

export default DoiTraHang