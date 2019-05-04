import React from 'react';
import { Link } from 'react-router-dom'

const BreadCrumb = ({ items }) => {

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {
          items.map((item, index) => {
            const lastItemIndex = items.length - 1;

            if (index !== lastItemIndex) {
              return <li><Link to={item.path}>{item.title}</Link></li>
            } else {
              return <li className='is-active'><Link to={item.path}>{item.title}</Link></li>
            }
          })
        }
      </ul>
    </nav>
  )
}


export default BreadCrumb;