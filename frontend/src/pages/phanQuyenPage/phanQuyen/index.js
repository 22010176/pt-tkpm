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
import {getPermissionData, getRolePermissions, getRoles} from "../../../api/roles";

const tableHd = [
  {key: "Mã nhóm quyền", value: "maNhomQuyen"},
  {key: "Tên nhóm quyền", value: "tenHienThi"},
  {key: "Ghi chú", value: "ghiChu"},
]

const FormContext = createContext({})

function parsePermissions(permissions, value = false) {
  return Object.fromEntries(permissions.map(i => [`${i.maChucNang}_${i.tenChucNang}_${i.maHanhDong}_${i.tenHanhDong}`, value]))
}

function PhanQuyen() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])
  const [permission, setPermission] = useState({actions: [], features: [], permissions: []})
  const [rowClick, setRowClick] = useState()
  const [formData, setFormData] = useState({tenNhomQuyen: "", ghiChu: ""})

  useEffect(() => {
    updateTableData()
    getPermissionData().then(data => {
      delete data.success
      setPermission(data)
    })
  }, [])

  useEffect(() => {
    setFormData({
      tenNhomQuyen: "", ghiChu: "",
      ...parsePermissions(permission.permissions)
    })
  }, [permission]);
  console.log(permission)

  // console.log(permission)

  function updateTableData() {
    setTableData([])
    getRoles().then(data => setTableData(data.roles))
  }

  async function onInsertRole() {
    console.log(formData)
  }

  function onRowClick(row) {
    if (!row) return
    getRolePermissions(1).then(data => setRowClick(parsePermissions(data.permissions, true)))
  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar/>}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={setModal.bind({}, "add")}/>
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={setModal.bind({}, "edit")}/>
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
        dataTable={<TableA headers={tableHd} data={tableData} onClick={onRowClick}/>}
      />

      <FormContext.Provider value={[formData, setFormData]}>
        <Modal scrollable show={modal === "add"} centered backdrop="static" size='xl' className='vh-100'>
          <HeaderModalA title="THÊM NHÓM QUYỀN"/>

          <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>

            <PhanQuyenModal {...permission}/>
          </ModalBody>

          <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
            <Button className='_w-23' variant='primary' onClick={onInsertRole}>Thêm nhóm quyền</Button>
            <Button className='_w-23' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
          </ModalFooter>
        </Modal>

        <Modal scrollable show={modal === "edit"} centered backdrop="static" size='xl' className='vh-100'>
          <HeaderModalA title="CHỈNH SỬA NHÓM QUYỀN"/>
          <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>

            <PhanQuyenModal actions={permission.actions} features={permission.features}/>
          </ModalBody>

          <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
            <Button className='_w-15 py-2' variant='primary'>Lưu</Button>
            <Button className='_w-15 py-2' variant='danger' onClick={setModal.bind({}, "")}>Hủy</Button>
          </ModalFooter>
        </Modal>
      </FormContext.Provider>
    </>
  )
}

function PhanQuyenModal({actions = [], features = []}) {
  const [data, setData] = useContext(FormContext)

  function onChangeCheck(key, e) {
    setData(src => ({...src, [key]: e.target.checked}))
  }

  function onChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  return (
    <Form className='d-flex flex-column gap-3 h-100'>
      <FormGroup className='d-flex gap-5'>
        <FormGroup className='w-50'>
          <FormLabel className='fw-bold'>Tên nhóm quyền</FormLabel>
          <InputShadow value={data.tenNhomQuyen} onChange={onChange.bind({}, 'tenNhomQuyen')}/>
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
            {actions.map((i, j) => (
              <th key={j} className='text-center px-3'>{i.tenHienThi}</th>
            ))}
          </tr>
          </thead>

          <tbody>
          {features.map((feature, j) =>
            <tr key={j}>
              <td>{j + 1}</td>
              <td>{feature.tenHienThi}</td>
              {actions.map((action, k) =>
                <td key={k}>
                  {data[`${feature.tenChucNang}_${action.tenHanhDong}`] != null
                    && <FormCheck className='text-center'
                                  value={data[`${feature.tenChucNang}_${action.tenHanhDong}`]}
                                  onChange={onChangeCheck.bind({}, `${feature.tenChucNang}_${action.tenHanhDong}`)}
                    />}
                </td>
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