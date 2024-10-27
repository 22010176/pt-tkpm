import Table from 'react-bootstrap/Table'

import styles from './style.module.css'
import {useEffect} from 'react'


// const clr = "table-active" //styles.tableActive
const clr = styles.tableActive //
function TableA({index = true, onClick, data = [], headers = []}) {
  function rowOnClick(e) {
    e.stopPropagation()
    clearRow()

    const elem = e.target.parentElement
    setTimeout(() => elem.classList.add(clr), 0)

    if (typeof onClick != 'function') return
    onClick(Object.fromEntries([...elem.querySelectorAll("td")]
      .filter(i => i.getAttribute('data-key'))
      .map(i => [i.getAttribute("data-key"), i.getAttribute("data-value")]))
    )
  }

  function clearRow() {
    document.querySelectorAll("." + clr).forEach(element => element.classList.remove(clr));
    if (typeof onClick === 'function') onClick(undefined)
  }

  useEffect(function () {
    document.body.addEventListener("click", clearRow)
    return () => document.body.removeEventListener("click", clearRow)
  }, [])

  return (
    <Table className='shadow-sm' bordered>
      <thead>
      <tr className='text-center'>
        {!!index && <th scope='col'>Stt</th>}
        {headers.map(({key}, j) => <th scope='col' key={j}>{key}</th>)}
      </tr>
      </thead>
      <tbody className={[styles.table_body].join(" ")} onClick={rowOnClick}>
      {data.map((item, j) => (
        <tr className={[styles.table_row].join(" ")} key={j}>
          {!!index && <td>{j + 1}</td>}
          {headers.map(({value}, _j) => <td key={_j} data-key={value} data-value={item[value]}>{item[value]}</td>)}
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

export default TableA;