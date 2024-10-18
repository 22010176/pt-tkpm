import { useState } from 'react'

import { Form } from 'react-bootstrap'


import PageTemplateD from '../pageD'
import SideNavbar from '../sideBar'

import ContentA from '../blockContent'
import FlexForm from '../../Forms/FlexForm'

import style from './style.module.css'

function PageTemplateE({ tools, rightForm, leftForm, table }) {
  const height = 15;
  const width = 25;
  return (
    <PageTemplateD sidebar={<SideNavbar />}>
      <div className='d-flex gap-3 flex-column w-100 h-100 p-3'>
        <ContentA className="d-flex justify-content-between px-3" style={{ height: height + "%" }}>
          <div className='d-flex' >
            {tools}
          </div>

          <FlexForm>
            {rightForm}
          </FlexForm>
        </ContentA>

        <div className='d-flex gap-3' style={{ height: 100 - height + "%" }} >
          <ContentA className="d-flex flex-column justify-content-around p-4" As={Form} style={{ width: width + "%" }}>
            {leftForm}
          </ContentA>

          <ContentA style={{ width: 100 - width + "%" }}>
            {table}
          </ContentA>
        </div>
      </div>
    </PageTemplateD>
  )
}

export default PageTemplateE