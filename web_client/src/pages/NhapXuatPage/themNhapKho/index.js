import {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, ButtonGroup, CloseButton, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader} from 'react-bootstrap'

import SideNavbar from '../../../components/layouts/sideBar'
import TableA from '../../../components/tables/tableA'
import BarCodeScanner from '../../../components/barcode'
import Page4 from '../../../components/layouts/Page4'
import InputShadow from '../../../components/Forms/InputShadow'
import GroupShadow from '../../../components/Forms/GroupShadow'
import {getProductConfigures} from "../../../api/Products/configures";
import {getProductHasConfigure} from "../../../api/Products/products";
import {getSuppliers} from "../../../api/Partners/suppliers";
import {getFreeImport} from "../../../api/Warehouse/imports";

const spHeader = [
  {key: "Mã SP", value: "madanhmucsanpham"},
  {key: "Tên sp", value: "tendanhmucsanpham"},
  {key: "RAM", value: "dungluongram"},
  {key: "ROM", value: "dungluongrom"},
  {key: "Màu sắc", value: "tenmausac"},
  {key: "Đơn giá", value: "giaxuat"},
  {key: "Số lượng", value: "soluong"},
  {key: "cauhinh", value: "cauhinh", hide: true},
]

const khoHeader = [
  {key: "Tên sp", value: "tendanhmucsanpham"},
  {key: "Số lượng tồn kho", value: "tonkho"},
  {key: "madanhmucsanpham", value: "madanhmucsanpham", hide: true}
]

const defaultData = {
  sanpham: [],
  nhacungcap: [],
  cauhinh: [],
  sanphamthem: [],
}
const defaultForm = {
  madanhmucsanpham: "",
  tendanhmucsanpham: "",
  macauhinh: "",
  gianhap: ""
}

function ThemNhapKho() {
  const [modal, setModal] = useState("")
  const [data, setData] = useState({...defaultData})
  const [form, setForm] = useState({...defaultForm})

  const [imei, setImei] = useState({})
  const [sanPhamThem, setSanPhamThem] = useState([])

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    console.log(form.macauhinh)
  }, [form]);


  function reset() {
    setData({...defaultData})
    setForm({...defaultForm})

    getProductHasConfigure().then(({Data}) => setData(data => ({...data, sanpham: Data})))
    getSuppliers().then(({suppliers}) => setData(data => ({...data, nhacungcap: suppliers})))
    getFreeImport().then(({Data}) => setData(src => ({...src, phieunhap: Data[0]})))
    setImei({})
  }

  function scanImei(data) {
    openModal("")

  }

  function openModal(key, e) {
    setModal(key)
  }

  function onInsertIMEICode(e) {
    e.preventDefault();
    const elem = document.getElementById("imei-input");
    if (!elem.value) return;

    const data = elem.value;
    if (form.madanhmucsanpham.length === 0) return;

    setImei(src => ({...src, [data]: data}))
    elem.value = ""
  }

  // if (!row)

  function onWarehouseRowClick(row) {
    // getProductConfigures(row.maDanhMucSanPham).then(data => setCauHinh(data.configurations))
    if (!row) return
    setImei({})

    getProductConfigures(row.madanhmucsanpham).then(({configures}) => {
      setData(src => ({...src, cauhinh: configures}))
      setForm(src => ({
        ...src,
        madanhmucsanpham: row.madanhmucsanpham,
        tendanhmucsanpham: row.tendanhmucsanpham,
        macauhinh: configures[0].macauhinh,
        gianhap: +configures[0].gianhap,
      }))
    })
  }

  function onInsertSanPham() {

  }

  return (<>
    <Page4
      count={0}
      sidebar={<SideNavbar/>}
      tableTop={<GroupShadow>
        <InputGroup.Text>Tìm kiếm</InputGroup.Text>
        <Form.Control/>
        <Button variant="success">
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </Button>
      </GroupShadow>}
      table={<TableA headers={khoHeader} data={data.sanpham?.slice(0, 100)} onClick={onWarehouseRowClick}/>}
      tableForm={<Form className='p-3 d-flex gap-3 w-100 flex-column'>
        <FormGroup className='d-flex justify-content-between gap-4'>
          <FormGroup>
            <FormLabel className='fw-bold'>Mã sp</FormLabel>
            <InputShadow as={FormControl} type='text' disabled size='sm' value={form.madanhmucsanpham}/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Tên sp</FormLabel>
            <InputShadow as={FormControl} size='sm' type='text' disabled value={form.tendanhmucsanpham}/>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <FormLabel className='fw-bold'>Cấu hình</FormLabel>
          <InputShadow as={FormSelect} size='sm'
                       value={form.macauhinh}
                       onChange={e => setForm(src => ({...src, macauhinh: e.target.value}))}>
            {data.cauhinh?.map((i, j) =>
              <option key={j} value={i.macauhinh}>{i.rom}GB - {i.ram}GB- {i.tenmausac}</option>)}
          </InputShadow>
        </FormGroup>

        <FormGroup>
          <FormLabel className='fw-bold'>Giá nhập</FormLabel>
          <GroupShadow size="sm">
            <FormControl disabled size='sm' type='number' value={form.gianhap}/>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className='d-flex gap-2 justify-content-between align-items-center'>
          <FormLabel className='fw-bold'>Mã IMEI</FormLabel>
          <ButtonGroup>
            <Button variant='primary' size="sm"
                    onClick={openModal.bind({}, "scanIMEI")}>Scan</Button>
            <Button variant='success' size="sm">Excel</Button>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <GroupShadow size='sm'>
            <FormControl type='text' id='imei-input' size='sm'/>
            <Button variant='primary' onClick={onInsertIMEICode} disabled={!form.madanhmucsanpham}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
          </GroupShadow>

          <div className='h-100 overflow-auto'>
            <ListGroup variant='flush'
                       className='bg-light'
                       onClick={e => {
                         const elem = e.target;
                         if (elem.getAttribute('data-value') == null) return

                         setImei(src => {
                           delete src[elem.getAttribute('data-value')]
                           return {...src}
                         })
                       }}>
              {Object.keys(imei)?.map((i, j) => <ListGroupItem key={j} data-value={i}>{i}</ListGroupItem>)}
            </ListGroup>
          </div>
        </FormGroup>
      </Form>
      }
      toolBtn={<>
        <Button size='sm' className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
        <Button size='sm'
                className='w-25 my-3 fw-semibold'
                variant='primary'
                onClick={e => {
                  const cauhinh = data.cauhinh.find(i => i.macauhinh = form.macauhinh)

                  const item = {
                    madanhmucsanpham: form.madanhmucsanpham,
                    tendanhmucsanpham: form.tendanhmucsanpham,
                    dungluongram: cauhinh.dungluongram,
                    dungluongrom: cauhinh.dungluongrom,
                    tenmausac: cauhinh.tenmausac,
                    giaxuat: cauhinh.giaxuat,
                    phieunhap: data.phieunhap?.maphieunhap,

                    cauhinh: cauhinh.macauhinh,
                    tinhtrang: 1
                  }

                  const sendData = Object.keys(imei)
                  .filter(i => !sanPhamThem.some(j => j.maimei === i))
                  .map((i, j, arr) => ({maimei: i, ...item}))

                  if (sendData.length === 0) return
                  setSanPhamThem(src => [...src, ...sendData])
                  // reset()
                  setImei({})
                }}>Thêm sản phẩm</Button>
        <Button size='sm' className='w-25 my-3 fw-semibold' variant='warning'>Sửa sản phẩm</Button>
        <Button size='sm' className='w-25 my-3 fw-semibold' variant='danger'>Xóa sản phẩm</Button>
      </>}
      table2={<TableA headers={spHeader}
                      data={sanPhamThem.reduce((acc, i) => {
                        const item = acc.find(j => {
                          console.log(i, j)
                          return j.cauhinh === i.cauhinh
                        })
                        if (!item) acc.push({...i, soluong: 1})
                        else item.soluong++;

                        return acc
                      }, [])}
                      onClick={row => {
                        // console.log(row, form.sanphamthem)
                        // console.log({row, a: sanPhamThem.filter(i => i.cauhinh === row.cauhinh)})
                      }}/>}
      rightTopForm={<>
        <FormGroup>
          <FormLabel className='fw-bold'>Mã phiếu nhập</FormLabel>
          <InputShadow as={FormControl} disabled value={data?.phieunhap?.maphieunhap}/>
        </FormGroup>

        <FormGroup>
          <FormLabel className='fw-bold'>Nhân viên nhập</FormLabel>
          <InputShadow as={FormControl} disabled/>
        </FormGroup>

        <FormGroup>
          <FormLabel className='fw-bold'>Nhà cung cấp</FormLabel>
          <InputShadow as={FormSelect}>
            {data.nhacungcap?.map((i, j) => <option key={j} value={i.manhacungcap}>{i.tennhacungcap}</option>)}
          </InputShadow>
        </FormGroup>

        {/*<FormGroup>*/}
        {/*  <FormLabel className="fw-bold">Nhân viên chỉnh sửa cuối </FormLabel>*/}
        {/*  <InputShadow as={FormControl} disabled/>*/}
        {/*</FormGroup>*/}
      </>}
      rightBottomForm={<>
        <h3 className='mb-3 text-danger fw-bold'>Tổng tiền: <span>0</span>đ</h3>
        <Button className='w-100 fw-semibold' variant='success'>Nhập hàng</Button>
      </>}
    />

    <Modal centered size='lg' scrollable show={modal === "scanIMEI"} backdrop="static">
      <ModalHeader className='bg-primary px-3'>
        <Modal.Title className='text-center w-100 fw-bold fs-2 text-light'>
          QUÉT MÃ IMEI
        </Modal.Title>
        <CloseButton onClick={openModal.bind({}, "")}/>
      </ModalHeader>

      <ModalBody className='vh-100 p-3'>
        <BarCodeScanner onChange={scanImei}/>
      </ModalBody>
    </Modal>
  </>)
}

export default ThemNhapKho