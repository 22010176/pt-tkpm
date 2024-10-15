import { faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'
import { v4 } from 'uuid'

import SideNavbar from '../sideBar'
import ToolBtn from '../../buttons/toolBtn'
import IconBtn from '../../buttons/iconBtn'
import TableA from '../../tables/tableA'
import styles from './style.module.css'

const khachHangHeader = [
  { key: "Mã NCC", value: "ma" },
  { key: "Tên nhà cung cấp", value: "tenNCC" },
  { key: "Địa chỉ", value: "diaChi" },
  { key: "Email", value: "mail" },
  { key: "Số điện thoại", value: "sdt" },
]
const khachHangData = new Array(100).fill().map(i => ({ ma: v4(), tenNCC: "t", diaChi: "tt", sdt: "" }))

function PageTemplateC({ sidebarWidth = 20, toolbarHeight = 15, sidebar, tools, rightSec, dataTable }) {
  return (
    <main className='overflow-hidden vh-100'>
      <div className='d-flex h-100'>
        <section className='h-100' style={{ width: sidebarWidth + "%" }}>
          {sidebar}
        </section>

        <section className='bg-info-subtle h-100 d-flex flex-column p-3 gap-4' style={{ width: (100 - sidebarWidth) + "%" }}>
          <div style={{ height: toolbarHeight + "%" }}>
            <div className='px-3 d-flex h-100 justify-content-between align-items-center bg-light border border-info-subtle border-5 rounded'>
              <div className='d-flex gap-2'>
                {tools}
              </div>

              {rightSec}
            </div>
          </div>

          <div style={{ height: 100 - toolbarHeight + "%" }}>
            <div className='h-100 bg-light mh-100 overflow-auto border border-info-subtle border-5 rounded'>
              {dataTable}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PageTemplateC