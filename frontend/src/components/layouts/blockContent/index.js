import { forwardRef, ElementType, HTMLAttributes, FC } from 'react';

import styles from './style.module.css'

function Div({ children, ...prop }) {
  return <div {...prop}>{children}</div>
}

const ContentA = function ({ As = Div, children, className, ...prop }) {
  return (
    <As {...prop} className={[className, 'rounded-3 bg-light border border-info-subtle border-5 mh-100 overflow-auto'].join(" ")} >
      {children}
    </As>
  )
}

export default ContentA;