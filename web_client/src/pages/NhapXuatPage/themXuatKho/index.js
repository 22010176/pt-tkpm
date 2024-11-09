import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, ModalBody} from 'react-bootstrap'

import SideNavbar from '../../../components/layouts/sideBar'
import TableA from '../../../components/tables/tableA'
import Page4 from '../../../components/layouts/Page4'
import GroupShadow from '../../../components/Forms/GroupShadow'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'
import {useEffect, useState} from "react";
import {getProductHasConfigure} from "../../../api/Products/products";
import {getProductConfigures} from "../../../api/Products/configures";
import {getCustomers} from "../../../api/Partners/customers";

const spHeader = [
  {key: "Mã SP", value: "madanhmucsanpham"},
  {key: "Tên sp", value: "tendanhmucsanpham"},
  {key: "RAM", value: "dungluongram"},
  {key: "ROM", value: "dungluongrom"},
  {key: "Màu sắc", value: "mausac"},
  {key: "Đơn giá", value: "giaxuat"},
  {key: "Số lượng", value: "soluong"},
  {key: "cauhinh", value: "cauhinh", hide: true},
  {key: "tonkho", value: "tonkho", hide: false},
  {key: "cauhinh", value: "cauhinh", hide: false},
]

const khoHeader = [
  {key: "Tên sp", value: "tendanhmucsanpham"},
  {key: "Số lượng tồn kho", value: "tonkho"},
  {key: "madanhmucsanpham", value: "madanhmucsanpham", hide: true}
]

const khachHangHeader = [
  {key: "Mã KH", value: "makhachhang", format: t => "KH-" + t},
  {key: "Tên khách hàng", value: "tenkhachhang"},
  {key: "Ngày sinh", value: "ngaysinh", format: t => new Date(t).toISOString().split('T')[0]},
  {key: "Địa chỉ", value: "diachi"},
  {key: "Email", value: "mail"},
  {key: "Số điện thoại", value: "sodienthoai"},
]

const defaultData = {
  madanhmucsanpham: "",
  tendanhmucsanpham: "",
  sanpham: [],
  nhacungcap: [],
  cauhinh: [],
  sanphamthem: [],
}
const defaultForm = {
  timkiemkhachang: "",
  madanhmucsanpham: "",
  tendanhmucsanpham: "",
  macauhinh: "",
  gianhap: "",
  giaxuat: "",
  soluong: 0,
  tonkho: 0
}


function ThemXuatKho() {
  const [modal, setModal] = useState("")
  const [data, setData] = useState({...defaultData})
  const [form, setForm] = useState({...defaultForm})

  const [btnState, setBtnState] = useState(true)

  // const [imei, setImei] = useState([])
  const [sanPhamThem, setSanPhamThem] = useState([])

  useEffect(() => {
    reset()
  }, [])


  function reset() {
    setData({...defaultData})
    setForm({...defaultForm})

    Promise.all([
      getProductHasConfigure(),
      getCustomers()
    ]).then(data => {
      const [{Data: products}, {customers}] = data
      setData(src => ({...src, sanpham: products, khachhang: customers}))
    })

    // setImei([])
    setBtnState(true)
  }

  return (
    <>
      <Page4
        sidebar={<SideNavbar/>}
        tableTop={
          <InputGroup>
            <InputGroup.Text>Tìm kiếm</InputGroup.Text>
            <Form.Control/>
            <Button variant="success">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </Button>
          </InputGroup>
        }
        table={<TableA
          headers={khoHeader}
          data={data.sanpham
          ?.slice(0, 100)
          .filter(i => {
              const a = sanPhamThem.filter(j => +j.madanhmucsanpham === +i.madanhmucsanpham).length
              // if (a) console.log(a, i)
              return a === 0 || a < i.socauhinh;
            }
          )}
          onClick={function (row) {
            if (!row) return

            getProductConfigures(row.madanhmucsanpham).then(({configures}) => {
              const ch = configures.filter(i => !(sanPhamThem.some(k => k.cauhinh === i.macauhinh)))
              setData(src => ({
                ...src,
                cauhinh: ch,
                madanhmucsanpham: row.madanhmucsanpham,
                tendanhmucsanpham: row.tendanhmucsanpham,
                tonkho: row.tonkho,
              }))

              setForm(src => ({
                ...src,
                giaxuat: ch[0].giaxuat,
                macauhinh: ch[0].macauhinh,
                tonkho: ch[0].tonkho
              }))
            })

            setForm(src => ({...src, soluong: 0}))
            setBtnState(true)
          }}/>}
        tableForm={
          <Form className='p-3 d-flex flex-column gap-3'>
            <FormGroup className='d-flex justify-content-between gap-4'>
              <FormGroup>
                <FormLabel className='fw-bold'>Mã sp</FormLabel>
                <FormControl type='text' disabled size='sm' value={data.madanhmucsanpham}/>
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Tên sp</FormLabel>
                <FormControl type='text' disabled size='sm' value={data.tendanhmucsanpham}/>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Cấu hình</FormLabel>
              <FormSelect disabled={data.cauhinh.length === 0 || !btnState}
                          value={form.macauhinh}
                          onChange={e => {
                            const value = +e.target.value
                            const ch = data.cauhinh.find(i => i.macauhinh === value)
                            setForm(src => ({
                              ...src,
                              macauhinh: +ch.macauhinh,
                              giaxuat: ch.giaxuat,
                              tonkho: ch.tonkho
                            }))
                          }}>
                {data.cauhinh?.map((i, j) =>
                  <option key={j} value={i.macauhinh}>
                    {i.macauhinh}
                    {/*{i.dungluongrom}GB - {i.dungluongram}GB- {i.tenmausac}*/}
                  </option>)}
              </FormSelect>
            </FormGroup>

            <FormGroup className='d-flex gap-3'>
              <FormGroup>
                <FormLabel className='fw-bold'>Giá xuất</FormLabel>
                <InputGroup>
                  <FormControl type='number' disabled value={form.giaxuat}/>
                  <InputGroup.Text>VNĐ</InputGroup.Text>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Số lượng tồn</FormLabel>
                <InputGroup>
                  <FormControl type='number' disabled value={+form.tonkho}/>
                  <InputGroup.Text>chiếc</InputGroup.Text>
                </InputGroup>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Số lượng xuất</FormLabel>
              <InputGroup>
                <FormControl
                  type='number'
                  value={form.soluong}
                  onChange={e => {
                    const value = e.target.value
                    setForm(src => ({...src, soluong: Math.min(+form.tonkho, value)}))
                  }}/>
                <InputGroup.Text>chiếc</InputGroup.Text>
              </InputGroup>
            </FormGroup>
          </Form>
        }
        toolBtn={<>
          <Button className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
          <Button className='w-25 my-3 fw-semibold'
                  variant='primary'
                  disabled={!btnState}
                  onClick={e => {
                    // console.log(form, data)
                    const cauhinh = data.cauhinh.find(i => +i.macauhinh === +form.macauhinh);
                    console.log(cauhinh)
                    if (!cauhinh || !form.soluong) return;

                    // console.log(cauhinh);
                    const sanpham = {
                      madanhmucsanpham: cauhinh.danhmucsanpham,
                      tendanhmucsanpham: data.tendanhmucsanpham,
                      dungluongram: cauhinh.dungluongram,
                      dungluongrom: cauhinh.dungluongrom,
                      mausac: cauhinh.tenmausac,
                      giaxuat: cauhinh.giaxuat,
                      soluong: form.soluong,
                      cauhinh: cauhinh.macauhinh,
                      tonkho: +cauhinh.tonkho
                    }

                    setSanPhamThem(src => [...src, sanpham])
                    reset()
                  }}>Thêm sản phẩm</Button>
          <Button className='w-25 my-3 fw-semibold'
                  variant='warning'
                  disabled={btnState}
                  onClick={e => {
                    const cauhinh = data.cauhinh.find(i => +i.macauhinh === +form.macauhinh);
                    if (!cauhinh || !form.soluong) return;

                    const sanpham = {
                      madanhmucsanpham: cauhinh.danhmucsanpham,
                      tendanhmucsanpham: data.tendanhmucsanpham,
                      dungluongram: cauhinh.dungluongram,
                      dungluongrom: cauhinh.dungluongrom,
                      mausac: cauhinh.tenmausac,
                      giaxuat: cauhinh.giaxuat,
                      soluong: form.soluong,
                      cauhinh: cauhinh.macauhinh,
                      tonkho: +cauhinh.tonkho
                    }

                    setSanPhamThem([...sanPhamThem.filter(i => i.cauhinh !== sanpham.cauhinh), sanpham])
                    setBtnState(true)
                    reset()
                  }}>Sửa sản phẩm</Button>
          <Button className='w-25 my-3 fw-semibold'
                  variant='danger'
                  disabled={btnState}
                  onClick={e => {
                    setSanPhamThem([...sanPhamThem.filter(i => i.cauhinh !== +form.macauhinh)])
                    setBtnState(true)
                    reset()
                  }}>Xóa sản phẩm</Button>
        </>}
        table2={<TableA headers={spHeader}
                        data={sanPhamThem}
                        onClick={row => {
                          if (!row) return
                          setBtnState(false)
                          // setImei([...sanPhamThem].filter(i => +i.cauhinh === +row.cauhinh).map(i => i.maimei))
                          getProductConfigures(row.madanhmucsanpham).then(({configures}) => {
                            setData(src => ({
                              ...src,
                              cauhinh: configures,
                              madanhmucsanpham: row.madanhmucsanpham,
                              tendanhmucsanpham: row.tendanhmucsanpham,
                              tonkho: +row.tonkho,
                            }))
                            setForm(src => ({
                              ...src,
                              giaxuat: row.giaxuat,
                              macauhinh: row.cauhinh,
                              soluong: row.soluong,
                              tonkho: +row.tonkho
                            }))
                          })
                        }}/>}
        count={3}
        rightTopForm={<>
          <FormGroup>
            <FormLabel className='fw-bold'>Mã phiếu xuất</FormLabel>
            <FormControl disabled/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Nhân viên xuất</FormLabel>
            <FormControl disabled/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Khách hàng</FormLabel>
            <GroupShadow>
              <Button onClick={setModal.bind({}, "chonKhachHang")}><FontAwesomeIcon icon={faPlus}/></Button>
              <FormControl disabled/>
            </GroupShadow>
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

      <Modal show={modal === "chonKhachHang"} backdrop='static' scrollable size='xl'>
        <HeaderModalA title="CHỌN KHÁCH HÀNG"/>

        <ModalBody className='d-flex flex-column gap-3'>
          <Form>
            <GroupShadow>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
              </InputGroup.Text>
              <FormControl
                value={form.timkiemkhachang}
                onChange={e => {
                  setForm(src => ({...src, timkiemkhachang: e.target.value}))
                }}/>
              <Button onClick={setModal.bind({}, "")}>Chọn khách hàng</Button>
            </GroupShadow>
          </Form>

          <ContentA>
            <TableA headers={khachHangHeader} data={data.khachhang?.filter(i => i.tenkhachhang.includes(form.timkiemkhachang))}/>
            {/*<div style={{height: "1000px"}}></div>*/}
          </ContentA>
        </ModalBody>
      </Modal>

    </>
  )
}

export default ThemXuatKho