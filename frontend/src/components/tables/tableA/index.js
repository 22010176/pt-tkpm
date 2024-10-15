import Table from 'react-bootstrap/Table'

import styles from './style.module.css'

const TableA = function ({ index, onClick, data = [], headers = [] }) {
  function rowOnClick(e) {
    e.stopPropagation()
    TableA.clearSelect(e)

    const elem = e.target.parentElement
    setTimeout(() => elem.classList.add("table-active"), 0)

    if (typeof onClick != 'function') return
    onClick(Object.fromEntries([...elem.querySelectorAll("td")].map(i => [i.getAttribute("data-key"), i.getAttribute("data-value")])))
  }

  return (
    <Table striped bordered hover>
      <thead className='table-primary'>
        <tr className='text-center'>
          {!!index && <th scope='col'>Stt</th>}
          {headers.map(({ key }, j) => <th scope='col' key={j} >{key}</th>)}
        </tr>
      </thead>
      <tbody className={[styles.table_body, "table-group-divider"].join(" ")} onClick={rowOnClick}>
        {data.map((item, j) => (
          <tr className={[styles.table_row].join(" ")} key={j} >
            {!!index && <td>{j + 1}</td>}
            {headers.map(({ value }, _j) => <td key={_j} data-key={value} data-value={item[value]} >{item[value]}</td>)}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TableA.clearSelect = function (e) {
  document.querySelectorAll(".table-active").forEach(element => element.classList.remove("table-active"));

}

export default TableA;