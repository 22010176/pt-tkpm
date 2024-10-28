import {Children, createContext, useContext, useEffect, useRef, useState} from 'react'
import {faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faCircleInfo, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Form, FormControl, FormSelect, Button, Modal, ModalBody, ModalFooter, FormGroup, FormLabel, FormCheck, Table} from 'react-bootstrap'

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
import {deleteRole, getPermissionData, getRolePermissions, getRoles, insertRole, updateRole} from "../../../api/roles";
import ErrorModal from "../../../components/modals/errorModal";
import {deleteEmployee, updateEmployee} from "../../../api/employees";

const tableHd = [
  {key: "Mã nhóm quyền", value: "maNhomQuyen"},
  {key: "Tên nhóm quyền", value: "tenHienThi"},
  {key: "Ghi chú", value: "ghiChu"},
]

const FormContext = createContext({})

function removeVietnameseTones(str) {
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
  str = str.replace(/[ìíịỉĩ]/g, "i");
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
  str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
  str = str.replace(/[ỳýỵỷỹ]/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A");
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E");
  str = str.replace(/[ÌÍỊỈĨ]/g, "I");
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O");
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U");
  str = str.replace(/[ỲÝỴỶỸ]/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/[\u02C6\u0306\u031B]/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/[!@%^*()+=<>?\/,.:;'"&#\[\]~$_`\-{}|\\]/g, " ");
  return str;
}

function parsePermissions(permissions = [], value = false) {
  return Object.fromEntries(permissions.map(i => [`${i.maChucNang}_${i.tenChucNang}_${i.maHanhDong}_${i.tenHanhDong}`, value]))
}

function parsePermissionString(str) {
  const [maChucNang, tenChucNang, maHanhDong, tenHanhDong] = str.split('_')
  return {maChucNang: +maChucNang, tenChucNang, maHanhDong: +maHanhDong, tenHanhDong}
}

const defaultRole = {tenNhomQuyen: "", tenHienThi: "", ghiChu: "", permissions: {}}

function PhanQuyen() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])
  const [permission, setPermission] = useState({actions: [], features: [], permissions: []})
  const [rowClick, setRowClick] = useState()
  const [formData, setFormData] = useState({...defaultRole})

  let permissionData;

  useEffect(() => {
    updateTableData()
    getPermissionData().then(data => {
      delete data.success
      setPermission(data)
    })

  }, [])

  useEffect(() => {
    permissionData = parsePermissions(permission.permissions)
    setFormData({...defaultRole, permissions: permissionData})
  }, [permission]);

  function updateTableData() {
    setTableData([])
    getRoles().then(data => setTableData(data.roles))
  }

  function onRowClick(row) {
    if (row) setRowClick(row)
  }

  function onOpenEditModal() {
    if (!rowClick) return setModal("error")

    setFormData({...rowClick, permissions: permissionData})

    setModal("edit")
  }

  async function onInsertRole() {
    formData.tenNhomQuyen = removeVietnameseTones(formData.tenHienThi)
    const result = await insertRole(formData)

    if (!result.success) return

    setFormData({...defaultRole, permissions: permissionData})
    updateTableData()
  }

  async function onUpdateRole() {
    const result = await updateRole(formData)

    if (!result.success) return

    setFormData({...defaultRole, permissions: permissionData})
    updateTableData()
    setModal('')
  }

  async function onDeleteRole() {
    if (!rowClick) return setModal("error")
    const result = await deleteRole(rowClick)

    if (!result.success) return

    setFormData({...defaultRole})
    updateTableData()
  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar/>}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={setModal.bind({}, "add")}/>
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenEditModal}/>
          <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDeleteRole}/>
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
        dataTable={<TableA headers={tableHd} data={tableData} onClick={onRowClick}/>}
      />

      <FormContext.Provider value={[formData, setFormData]}>
        <Modal scrollable show={modal === "add"} centered backdrop="static" size='xl' className='vh-100'>
          <HeaderModalA title="THÊM NHÓM QUYỀN"/>

          <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>

            <PhanQuyenModal actions={permission.actions} features={permission.features} permissions={permission.permissions}/>
          </ModalBody>

          <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
            <Button className='_w-23' variant='primary' onClick={onInsertRole}>Thêm nhóm quyền</Button>
            <Button className='_w-23' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
          </ModalFooter>
        </Modal>

        <Modal scrollable show={modal === "edit"} centered backdrop="static" size='xl' className='vh-100'>
          <HeaderModalA title="CHỈNH SỬA NHÓM QUYỀN"/>
          <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>

            <PhanQuyenModal actions={permission.actions} features={permission.features} permissions={permission.permissions}/>
          </ModalBody>

          <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
            <Button className='_w-15 py-2' variant='primary' onClick={onUpdateRole}>Lưu</Button>
            <Button className='_w-15 py-2' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
          </ModalFooter>
        </Modal>
      </FormContext.Provider>

      <ErrorModal show={modal === 'error'} onHide={setModal.bind({}, "")}/>
    </>
  )
}

function PhanQuyenModal({actions = [], features = [], permissions = []}) {
  const [data, setData] = useContext(FormContext)
  const [permissionData, setPermissionData] = useState({});

  useEffect(() => {
    setPermissionData(parsePermissions(permissions))
  }, [permissions])
  

  function onChangeCheck(key, e) {
    setData(src => ({
      ...src, permissions: {
        ...src.permissions,
        [key]: e.target.checked
      }
    }))
  }

  function onChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  return (
    <Form className='d-flex flex-column gap-3 h-100'>
      <FormGroup className='d-flex gap-5'>
        <FormGroup className='w-50'>
          <FormLabel className='fw-bold'>Tên nhóm quyền</FormLabel>
          <InputShadow value={data.tenHienThi} onChange={onChange.bind({}, 'tenHienThi')}/>
        </FormGroup>

        <FormGroup className='w-50'>
          <FormLabel className='fw-bold'>Ghi chú</FormLabel>
          <InputShadow value={data.ghiChu} onChange={onChange.bind({}, 'ghiChu')}/>
        </FormGroup>
      </FormGroup>

      <ContentA As={FormGroup}>
        <Table borderless className='h-100 w-100 bg-light '>
          <thead className='fw-bold text-nowrap '>
          <tr className=''>
            <th>STT</th>
            <th>Danh mục chức năng</th>
            {actions.map((i, j) => <th key={j} className='text-center px-3'>{i.tenHienThi}</th>)}
          </tr>
          </thead>

          <tbody>
          {features.map((cn, j) =>
            <tr key={j}>
              <td>{j + 1}</td>
              <td>{cn.tenHienThi}</td>
              {actions.map((hd, k) => {
                  const key = `${cn.maChucNang}_${cn.tenChucNang}_${hd.maHanhDong}_${hd.tenHanhDong}`
                  return (
                    <td key={k}>
                      {permissionData?.[key] != null
                        && <FormCheck className='text-center' value={data?.permissions?.[key]} onChange={onChangeCheck.bind({}, key)}/>}
                    </td>
                  )

                }
              )}
            </tr>
          )}
          </tbody>
        </Table>
      </ContentA>
    </Form>
  )
}

export default PhanQuyen