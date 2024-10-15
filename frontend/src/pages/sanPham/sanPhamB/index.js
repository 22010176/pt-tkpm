import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form } from 'react-bootstrap'
import { v4 } from 'uuid'

import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import PageTemplateC from '../../../components/layouts/pageC'
import SearchForm from '../../../components/Forms/searchForm'
import TableA from '../../../components/tables/tableA'

const defaultSanPham = { ma: undefined, tenSP: "", soLuong: "", thuongHieu: "", heDieuHanh: "", phienBanHDH: "", xuatXu: "" }
const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sản phẩm", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "soLuong" },
  { key: "Thương hiệu", value: "thuongHieu" },
  { key: "Hệ điều hành", value: "heDieuHanh" },
  { key: "Phiên bản HĐH", value: "phienBanHDH" },
  { key: "Xuất xứ", value: "xuatXu" },
]

const defaultCauHinh = { ma: undefined, ram: "", rom: "", mauSac: "", giaNhap: "", giaXuat: "" }
const chHeader = [
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Giá nhập", value: "giaNhap" },
  { key: "Giá xuất", value: "giaXuat" }
]

function SanPhamB() {
  return (
    <>
      <PageTemplateC
        sidebarWidth={20}
        toolbarHeight={15}
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" />
          <ToolBtn color="#e69138" icon={faPencil} title="Sửa" />
          <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
        </>}
        rightSec={<SearchForm />}
        dataTable={<TableA headers={spHeader} />}
      />
    </>
  )
}

export default SanPhamB;