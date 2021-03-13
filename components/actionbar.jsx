import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Select from 'react-select'

const ActionBar = (props) => {

  const router = useRouter()

  // useEffect(() => {
  //   router.query ? props.handleShowBookmarks(router.query['q'], router.query['i']) : null
  // }, [])


  const options = () => {
    const tagsArr = []
    props.tags.map((item) => {
      const tagsHash = {
        label: item.title,
        value: item.id
      }
      tagsArr.push(tagsHash)
    })
    return tagsArr
  }

  const styles = {
    control: (styles) => {
      return {
        ...styles,
        borderWidth: '2px',
        borderRadius: '0.5rem',
        cursor: 'text'
      }
    }
  }

  return (
    <div className="flex w-3/4 text-letters-dark place-items-center pl-2">
      <div className="text-center w-24 text-sm">
        <span className="text-lg">Search</span>
      </div>
      <div className="w-6/12">
        <Select 
        onChange={e => props.handleShowBookmarks(e.label, e.value)}
        placeholder={props.selectedTagname ? props.selectedTagname : 'Search by Tag'}
        value={props.selectedTagname}
        options={options()}
        styles={styles}
        />
      </div>
    </div>
  )
}

export default ActionBar