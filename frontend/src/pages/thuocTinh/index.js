import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faMemory, faArrowRotateRight, faBrush } from '@fortawesome/free-solid-svg-icons'

import PageTemplateA from '../../components/layouts/pageA'
import TableB from '../../components/tables/tableA'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'

import styles from './style.module.css'
import PageTemplateB from '../../components/layouts/pageB'
import ThuocTinhBtn from '../../components/buttons/thuocTinhBtn'


const headers = [{ key: "ma", value: "test" }, { key: "ma2", value: "test2" }]
const data = new Array(1000).fill().map(i => ({ test: "3", test2: "44" }))
function ThuocTinh() {
  return (
    <>
      <PageTemplateB>
        <div className='container-fluid w-100 h-100'>
          <div className='row row-cols-2 h-100 mx-3'>
            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.thuongHieu, "col"].join(" ")} icon={faEmpire} title="Thương hiệu" />
            </div>

            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.xuatXu, "col"].join(" ")} icon={faMountainCity} title="Xuất xứ" />
            </div>

            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.heDieuHanh, "col"].join(" ")} icon={faAndroid} title="Hệ điều hành" />
            </div>

            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.ram, "col"].join(" ")} icon={faComputer} title="Ram" />
            </div>

            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.rom, "col"].join(" ")} icon={faMemory} title="Rom" />
            </div>

            <div className='col d-flex justify-content-center align-items-center'>
              <ThuocTinhBtn className={[styles.mauSac, "col"].join(" ")} icon={faBrush} title="Màu sắc" />
            </div>
          </div>
        </div>
      </PageTemplateB>

    </>
  )
}

export default ThuocTinh