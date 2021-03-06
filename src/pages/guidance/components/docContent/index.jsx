import React, { memo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import DocModule from '../docModule'
import Copyright from '@/components/copyright'

const DocContent = memo((props) => {

  const {
    hash,
    data
  } = props

  const customContent = useRef()

  const getModuleList = (data) => {
    let arr1 = []
    const arr2 = []
    if (Object.keys(data).length) {
      for (const key in data) {
        arr1 = arr1.concat(data[key].children)
      }

      for (const item of arr1) {
        arr2.push(item.content)
      }
      
      return arr2.map((item, index) => {
        return <DocModule content={item} key={index} />
      })
    }
  }

  useEffect(() => {
    const AimDom = document.getElementById(hash)
    if (AimDom) {
      AimDom.scrollIntoView({
        block: 'start',
        behavior: 'smooth' 
      })
    }
  }, [hash])

  return <div 
      id="custom-content" 
      className="custom-content" 
      ref={customContent}
    >
      <div style={{ flex: 1, minHeight: '100%' }}>{ getModuleList(data) }</div>
      <Copyright />
    </div>
})

DocContent.propTypes = {
  hash: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

export default DocContent