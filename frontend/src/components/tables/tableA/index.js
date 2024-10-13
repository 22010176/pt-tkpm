import Table from 'react-bootstrap/Table'

import styles from './style.module.css'

export default function TableB({ onClick, data = [], headers = [] }) {
  function rowOnClick(e) {
    e.stopPropagation()
    const elem = e.target.parentElement
    clearSelect()
    elem.classList.add("table-active")

    if (typeof onClick != 'function') return
    onClick(Object.fromEntries([...elem.querySelectorAll("td")].map(i => [i.getAttribute("data-key"), i.getAttribute("data-value")])))
  }

  function clearSelect() {
    document.querySelectorAll(".table-active").forEach(element => element.classList.remove("table-active"));
    if (typeof onClick == 'function') onClick(null)
  }

  return (
    <div className="container-fluid rounded p-0" onClick={clearSelect}>
      <Table striped bordered hover>
        <thead className='table-primary'>
          <tr className='text-center'>
            {headers.map(({ key }, j) => <th scope='col' key={j} >{key}</th>)}
          </tr>
        </thead>
        <tbody className={[styles.table_body, "table-group-divider"].join(" ")} onClick={rowOnClick}>
          {data.map((item, j) => (
            <tr className={[styles.table_row].join(" ")} key={j} >
              {headers.map(({ value }, _j) => <td key={_j} data-key={value} data-value={item[value]} >{item[value]}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}