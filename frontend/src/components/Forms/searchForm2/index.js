import { forwardRef } from 'react';
import { faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Form, FormControl, FormSelect } from 'react-bootstrap';

import IconBtn from '../../buttons/iconBtn';
import styles from './style.module.css'

const SearchForm2 = forwardRef(function (prop = {}, ref) {
  return (
    <Form ref={ref} className={["d-flex align-items-center gap-3"].join(" ")} {...prop}>
      {/* <div> */}
      <FormSelect className='d-block'>
        <option>test1</option>
        <option>test2</option>
        <option>test3</option>
        <option>test4</option>
      </FormSelect>
      {/* </div> */}
      {/* <div> */}
      <FormControl className='d-block' type='text' placeholder='Tìm kiếm' />
      {/* </div> */}
      {/* <div> */}
      <IconBtn className="d-block btn-success" icon={faArrowRotateRight} title={"Làm mới"} />
      {/* </div> */}
    </Form>

  )
})

export default SearchForm2;