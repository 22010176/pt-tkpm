import { faEmpire, faAndroid, } from '@fortawesome/free-brands-svg-icons'
import { faMountainCity, faComputer, faMemory, faBrush } from '@fortawesome/free-solid-svg-icons'

import styles from './style.module.css'
import PageTemplateB from '../../components/layouts/pageB'
import ThuocTinhBtn from '../../components/buttons/thuocTinhBtn'
import ThuocTinhModalA from '../../components/modals/thuocTinhModaA'
import { useState } from 'react'

function ThuocTinh() {
  const [modals, setModals] = useState("");
  const categoryClass = 'd-flex justify-content-center align-items-center'

  function openOverlay(modal, e) {
    setModals(modal)
  }

  function closeOverlay() {
    setModals("")
  }

  return (
    <>
      <PageTemplateB>
        <div className='container-fluid w-100 h-100'>
          <div className='row row-cols-2 h-100 mx-3'>
            <div className={categoryClass} >
              <ThuocTinhBtn className={[styles.thuongHieu, "col"].join(" ")} icon={faEmpire} title="Thương hiệu" onClick={openOverlay.bind({}, "thuongHieu")} />
            </div>

            <div className={categoryClass}>
              <ThuocTinhBtn className={[styles.xuatXu, "col"].join(" ")} icon={faMountainCity} title="Xuất xứ" onClick={openOverlay.bind({}, "thuongHieu")} />
            </div>

            <div className={categoryClass}>
              <ThuocTinhBtn className={[styles.heDieuHanh, "col"].join(" ")} icon={faAndroid} title="Hệ điều hành" onClick={openOverlay.bind({}, "hdh")} />
            </div>

            <div className={categoryClass}>
              <ThuocTinhBtn className={[styles.ram, "col"].join(" ")} icon={faComputer} title="Ram" onClick={openOverlay.bind({}, "ram")} />
            </div>

            <div className={categoryClass}>
              <ThuocTinhBtn className={[styles.rom, "col"].join(" ")} icon={faMemory} title="Rom" onClick={openOverlay.bind({}, "rom")} />
            </div>

            <div className={categoryClass}>
              <ThuocTinhBtn className={[styles.mauSac, "col"].join(" ")} icon={faBrush} title="Màu sắc" onClick={openOverlay.bind({}, "mauSac")} />
            </div>
          </div>
        </div>
      </PageTemplateB>

      <ThuocTinhModalA show={modals === "thuongHieu"} apiRoute="thuongHieu" title="Thương hiệu" icon={faEmpire} onClose={closeOverlay} />
      <ThuocTinhModalA show={modals === "xuatXu"} apiRoute="xuatXu" title="Xuất xứ" icon={faMountainCity} onClose={closeOverlay} />
      <ThuocTinhModalA show={modals === "hdh"} apiRoute="heDieuHanh" title="Hệ điều hành" icon={faAndroid} onClose={closeOverlay} />
      <ThuocTinhModalA show={modals === "ram"} apiRoute="ram" unit="GB" title="Ram" icon={faComputer} onClose={closeOverlay} />
      <ThuocTinhModalA show={modals === "rom"} apiRoute="rom" unit="GB" title="Rom" icon={faMemory} onClose={closeOverlay} />
      <ThuocTinhModalA show={modals === "mauSac"} apiRoute="mauSac" title="Màu sắc" icon={faBrush} onClose={closeOverlay} />
    </>
  )
}

export default ThuocTinh