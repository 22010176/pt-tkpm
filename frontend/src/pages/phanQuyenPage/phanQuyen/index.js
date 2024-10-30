import {Children, createContext, useContext, useEffect, useRef, useState} from 'react'
import {faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faCircleInfo, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Form, FormControl, FormSelect, Button, Modal, ModalBody, ModalFooter, FormGroup, FormLabel, FormCheck, Table} from 'react-bootstrap'

import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'

import InputShadow from '../../../components/Forms/InputShadow'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'

import styles from './style.module.css'
import {deleteRole, getPermissionData, getRolePermissions, getRoles, insertRole, updateRole} from "../../../api/roles";
import ErrorModal from "../../../components/modals/errorModal";
import {removeVietnameseTones} from "../../../utilities/others";

const tableHd = [{key: "Mã nhóm quyền", value: "maNhomQuyen"}, {key: "Tên nhóm quyền", value: "tenHienThi"}, {key: "Ghi chú", value: "ghiChu"},]


function permToStr({maChucNang, tenChucNang, maHanhDong, tenHanhDong}) {
  return `${maChucNang}_${tenChucNang}_${maHanhDong}_${tenHanhDong}`
}

function parsePermissions(permissions = [], value = false) {
  return Object.fromEntries(permissions.map(i => [permToStr(i), value]))
}

function parsePermissionString(str) {
  const [maChucNang, tenChucNang, maHanhDong, tenHanhDong] = str.split('_')
  return {maChucNang: +maChucNang, tenChucNang, maHanhDong: +maHanhDong, tenHanhDong}
}


const FormContext = createContext({})

function PhanQuyen() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])
  const [rowClick, setRowClick] = useState()

  const [editData, setEditData] = useState()
  useEffect(() => {
    updateTableData()
  }, [])


  function updateTableData() {
    setTableData([])
    getRoles().then(data => setTableData(data.roles))
  }

  async function onRowClick(row) {
    // console.log(row)
    setRowClick(row)
  }

  function onOpenAddModal() {
    setModal("add")
    setRowClick()
  }

  function onOpenEditModal() {
    if (!rowClick) return setModal("error")
    setModal("edit")
  }

  async function onInsertPerm(data) {
    const result = await insertRole(data)

    if (!result.success) return
    updateTableData()
  }

  async function onUpdateRole(data) {
    // console.log(data)
    const result = await updateRole(data)
    console.log(result)
    if (!result.success) return

    onCloseModal()
    updateTableData()
  }

  async function onDeleteRole() {
    if (!rowClick) return setModal("error")
    const result = await deleteRole(rowClick)

    if (!result.success) return


    updateTableData()
  }

  function onCloseModal() {
    setModal("")
    setEditData({})
  }

  return (<>
    <Page2
      sidebar={<SideNavbar/>}
      tools={<>
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={onOpenAddModal}/>
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
    <FormContext.Provider value={rowClick}>
      <PermissionModal title="THÊM NHÓM QUYỀN" submitBtn="Thêm nhóm quyền" show={modal === "add"} onSubmit={onInsertPerm} onHide={setModal.bind({}, "")}/>
      <PermissionModal title="CHỈNH SỬA NHÓM QUYỀN" submitBtn="Lưu thông tin" show={modal === "edit"} onSubmit={onUpdateRole} onHide={onCloseModal}/>
    </FormContext.Provider>

    <ErrorModal show={modal === 'error'} onHide={setModal.bind({}, "")}>
      <p>Hãy chọn 1 nhóm quyền</p>
    </ErrorModal>
  </>)
}


function PermissionModal({title, submitBtn, onHide, onSubmit, ...props}) {
  const rowClick = useContext(FormContext)


  const [tenHienThi, setTenHienThi] = useState("")
  const [ghiChu, setGhiChu] = useState("")
  const [quyenHan, setQuyenHan] = useState({})

  const [actions, setActions] = useState([])
  const [permissions, setPermissions] = useState([])
  const [features, setFeatures] = useState([])

  useEffect(() => {
    updateInfo()
  }, [rowClick])

  async function updateInfo() {
    setTenHienThi(rowClick?.tenHienThi || "")
    setGhiChu(rowClick?.ghiChu || "")

    const {permissions} = rowClick ? await getRolePermissions(rowClick?.maNhomQuyen) : []

    getPermissionData().then(data => {
      setActions(data.actions)
      setQuyenHan({...parsePermissions(data.permissions), ...parsePermissions(permissions, true)})

      setPermissions(data.permissions)
      setFeatures(data.features)
    })
  }

  async function onFormSubmit() {
    console.log((rowClick))
    if (typeof onSubmit === 'function') await onSubmit({
      maNhomQuyen: +rowClick?.maNhomQuyen,
      tenHienThi,
      tenNhomQuyen: removeVietnameseTones(tenHienThi).replaceAll(' ', '_'),
      ghiChu,
      danhSachQuyen: Object.entries(quyenHan)
      .filter(i => i[1])
      .map(i => permissions.find(j => permToStr(j) === i[0]))
    })

    await updateInfo()
  }

  return (
    <Modal {...props} scrollable centered backdrop="static" size='xl' className='vh-100'>
      <HeaderModalA title={title}/>

      <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>
        <Form className='d-flex flex-column gap-3 h-100'>
          <FormGroup className='d-flex gap-5'>
            <FormGroup className='w-50'>
              <FormLabel className='fw-bold'>Tên nhóm quyền</FormLabel>
              <InputShadow value={tenHienThi} onChange={e => setTenHienThi(e.target.value)}/>
            </FormGroup>

            <FormGroup className='w-50'>
              <FormLabel className='fw-bold'>Ghi chú</FormLabel>
              <InputShadow value={ghiChu} onChange={e => setGhiChu(e.target.value)}/>
            </FormGroup>
          </FormGroup>

          <ContentA As={FormGroup} className="h-100">
            <Table borderless className='w-100 bg-light '>
              <thead className='fw-bold text-nowrap '>
              <tr>
                <th>Danh mục chức năng</th>
                {actions.map((i, j) => <th key={j} className='text-center px-3'>{i.tenHienThi}</th>)}
              </tr>
              </thead>

              <tbody>
              {features.map((cn, j) => <tr key={j}>
                <td>{cn.tenHienThi}</td>
                {actions.map((hd, k) => {
                  const key = permToStr({...cn, ...hd})
                  return (
                    <td key={k}>
                      {quyenHan?.[key] != null
                        && <FormCheck
                          className='text-center' checked={quyenHan[key]}
                          onChange={e => setQuyenHan(src => ({...src, [key]: e.target.checked}))}/>}
                    </td>
                  )
                })}
              </tr>)}
              </tbody>
            </Table>
          </ContentA>
        </Form>
      </ModalBody>

      <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
        <Button className='_w-23' variant='primary' onClick={onFormSubmit}>{submitBtn}</Button>
        <Button className='_w-23' variant='danger' onClick={onHide}>Hủy</Button>
      </ModalFooter>
    </Modal>
  )
}

// function EditPermissionModal({onHide, ...props}) {
//
//   return (<Modal {...props} scrollable centered backdrop="static" size='xl' className='vh-100'>
//     <HeaderModalA title="CHỈNH SỬA NHÓM QUYỀN"/>
//     <ModalBody className='d-flex flex-column _vh-60 overflow-auto px-5 py-3'>
//       <Form className='d-flex flex-column gap-3 h-100'>
//         <FormGroup className='d-flex gap-5'>
//           <FormGroup className='w-50'>
//             <FormLabel className='fw-bold'>Tên nhóm quyền</FormLabel>
//             <InputShadow value={tenHienThi} onChange={e => setTenHienThi(e.target.value)}/>
//           </FormGroup>
//
//           <FormGroup className='w-50'>
//             <FormLabel className='fw-bold'>Ghi chú</FormLabel>
//             <InputShadow value={ghiChu} onChange={e => setGhiChu(e.target.value)}/>
//           </FormGroup>
//         </FormGroup>
//
//         <ContentA As={FormGroup} className="h-100">
//           <Table borderless className='w-100 bg-light '>
//             <thead className='fw-bold text-nowrap '>
//             <tr>
//               <th>Danh mục chức năng</th>
//               {actions.map((i, j) => <th key={j} className='text-center px-3'>{i.tenHienThi}</th>)}
//             </tr>
//             </thead>
//
//             <tbody>
//             {features.map((cn, j) => <tr key={j}>
//               <td>{cn.tenHienThi}</td>
//               {actions.map((hd, k) => {
//                 const key = permToStr({...cn, ...hd})
//                 return <td key={k}>
//                   {quyenHan?.[key] != null
//                     && <FormCheck className='text-center' checked={quyenHan[key]}
//                                   onChange={e => setQuyenHan(src => ({...src, [key]: e.target.checked}))}/>}
//                 </td>
//               })}
//             </tr>)}
//             </tbody>
//           </Table>
//         </ContentA>
//       </Form>
//     </ModalBody>
//
//     <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
//       <Button className='_w-15 py-2' variant='primary'>Lưu</Button>
//       <Button className='_w-15 py-2' variant='danger' onClick={onHide}>Hủy</Button>
//     </ModalFooter>
//   </Modal>)
// }


export default PhanQuyen