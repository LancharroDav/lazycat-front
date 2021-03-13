import { useEffect } from 'react'

export const CloseAtClickOutside = (ref, state) => {
  useEffect(() => {
    document.addEventListener('click',handleClickOutsidde)
    return () => {
      document.removeEventListener('click', handleClickOutsidde)
    }
  })

  const handleClickOutsidde = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      state(false)
    }
  }
}

export const OpenAtClick = (state, setstate) => {
  setstate(!state)
}