import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import PageTemplateA from '../../components/layouts/pageA'
import TableB from '../../components/tables/tableA'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'

import styles from './style.module.css'


const headers = [{ key: "ma", value: "test" }, { key: "ma2", value: "test2" }]
const data = new Array(1000).fill().map(i => ({ test: "3", test2: "44" }))
function ThuocTinh() {
  return (
    <PageTemplateA>

    </PageTemplateA>
  )
}

export default ThuocTinh