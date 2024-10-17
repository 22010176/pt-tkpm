import { forwardRef } from 'react';
import { faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Form, FormControl } from 'react-bootstrap';

import IconBtn from '../../buttons/iconBtn';
import styles from './style.module.css'

const SearchForm = forwardRef(function (prop = {}, ref) {
  return (
    <Form ref={ref} className={["d-flex align-items-center gap-3"].join(" ")} {...prop}>
      <div>
        <FormControl type='text' placeholder='Tìm kiếm' />
      </div>
      <div>
        <IconBtn icon={faMagnifyingGlass} title={"Tìm kiếm"} className="btn-primary" />
      </div>
      <div>
        <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-success " />
      </div>
    </Form>
  )
})

export default SearchForm;