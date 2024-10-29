import {createContext, useContext, useEffect, useState} from 'react'
import {faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faCircleInfo, faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Form, FormControl, FormSelect, Button, Modal, ModalBody, ModalFooter, FormGroup, FormLabel} from 'react-bootstrap'

import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import SearchForm2 from '../../../components/Forms/searchForm2'
import InputShadow from '../../../components/Forms/InputShadow'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'
import GroupShadow from '../../../components/Forms/GroupShadow'
import ContentA from '../../../components/layouts/blockContent'

import styles from './style.module.css'
import {getEmployeeNoAccount, getEmployees} from "../../../api/employees";
import {getRoles} from "../../../api/roles";
import {getAccounts, insertAccount, updateAccount} from "../../../api/accounts";
import ErrorModal from "../../../components/modals/errorModal";

const tableHd = [
  {key: "Mã tài khoản", value: "maTaiKhoan"},
  {key: "Mã nhân viên", value: "maNhanVien"},
  {key: "Tên nhân viên", value: "hoTen"},
  {key: "Email", value: "mail"},
  {key: "Nhóm quyền", value: "tenHienThi"},
  {key: "tenQuyen", value: "tenNhomQuyen", hide: true},
  {key: "maQuyen", value: "maNhomQuyen", hide: true},
  // { key: "Trạng thái", value: "" },
]

const chonNhanVienHD = [
  {key: "Mã nv", value: "maNhanVien"},
  {key: "Tên nhân viên", value: "hoTen"},
  {key: "Email", value: "mail", hide: true},
]

const FormContext = createContext({})
const InfoContext = createContext({})

const defaulUser = {matKhau: "", vaiTro: ""},
  nhanVienSelect = {maNhanVien: "", hoTen: "", mail: ""}


function QuanLyTaiKhoan() {
  const [modal, setModal] = useState("")


  useEffect(() => {
    updateInfo()
    updateTableData()
  }, []);


  function updateTableData() {

  }


  async function updateInfo() {

  }

  async function onOpenInsertAccountModal() {

  }

  async function onOpenUpdateAccountModal() {

  }

  function onNhanVienRowClick(row) {

  }

  function onAccountRowClick(row) {

  }

  async function onInsertAccount() {

  }

  async function onUpdateAccount() {

  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar/>}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={onOpenInsertAccountModal}/>
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenUpdateAccountModal}/>
          <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa"/>
        </>}
        rightSec={<FlexForm>
          <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm"/>
          <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
          <Button className='d-flex gap-2 align-items-center' variant='primary'>
            <FontAwesomeIcon icon={faArrowRotateRight}/>
            <span>Làm mới</span>
          </Button>
        </FlexForm>}
        dataTable={<TableA headers={tableHd} data={[]} onClick={onAccountRowClick}/>}
      />

      <InfoContext.Provider value={{}}>
        <FormContext.Provider value={[]}>
          {/*Them tai khoan*/}
          <Modal centered size='xl' show={modal === "add"} backdrop="static" scrollable className='_vh-100'>
            <HeaderModalA title="THÊM TÀI KHOẢN "/>

            <ModalBody className='d-flex gap-4 px-5 py-4 _vh-60'>
              <div className='h-100 d-flex flex-column gap-2 _w-35'>
                <FormGroup className=''>
                  <FormLabel className='fw-bold'>Chọn nhân viên</FormLabel>
                  <InputShadow/>
                </FormGroup>

                <ContentA className="h-100">
                  <TableA subtable index={false} headers={chonNhanVienHD} data={[]} onClick={onNhanVienRowClick}/>
                  <div style={{height: "10000px"}}></div>
                </ContentA>
              </div>

              <TaiKhoanForm className="_w-65"/>
            </ModalBody>

            <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
              <Button className='_w-20' variant='primary' onClick={onInsertAccount}>Thêm tài khoản</Button>
              <Button className='_w-20' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
            </ModalFooter>
          </Modal>

          {/*Sua tai khoan*/}
          <Modal centered size='lg' show={modal === "edit"} backdrop="static" scrollable className='_vh-100'>
            <HeaderModalA title="SỬA TÀI KHOẢN "/>

            <ModalBody className='d-flex gap-4 px-5 py-4 _vh-60'>
              <TaiKhoanForm className="_w-100" passwordDisabled/>
            </ModalBody>

            <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
              <Button className='_w-20' variant='primary' onClick={onUpdateAccount}>lưu</Button>
              <Button className='_w-20' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
            </ModalFooter>
          </Modal>
        </FormContext.Provider>
      </InfoContext.Provider>

      <ErrorModal show={modal === 'error'} onHide={() => setModal('')}>
        <p>Phải chọn 1 tài khoản</p>
      </ErrorModal>
    </>
  )
}

function TaiKhoanForm({className, passwordDisabled}) {


  return (
    <Form className={[className, 'd-flex flex-column gap-5'].join(" ")}>
      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Mã nhân viên</FormLabel>
          <InputShadow disabled/>
        </FormGroup>

        <FormGroup className='_w-100'>
          <FormLabel className='fw-bold'>Tên nhân viên</FormLabel>
          <InputShadow disabled/>
        </FormGroup>
      </FormGroup>

      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Email</FormLabel>
          <InputShadow disabled/>
        </FormGroup>

        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Mật khẩu</FormLabel>
          <InputShadow type="password" disabled={passwordDisabled}/>
        </FormGroup>
      </FormGroup>

      <FormGroup className='d-flex gap-5'>
        <FormGroup className='_w-50'>
          <FormLabel className='fw-bold'>Nhóm quyền</FormLabel>
          <InputShadow as={FormSelect}>
            {/*{info.roles.map((role, j) => (*/}
            {/*  <option key={j} value={role.maNhomQuyen} data-ma={role.tenNhomQuyen}>{role.tenHienThi}</option>)*/}
            {/*)}*/}
          </InputShadow>
        </FormGroup>
      </FormGroup>
    </Form>
  )
}

export default QuanLyTaiKhoan