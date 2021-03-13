import { useState, useRef, useEffect } from 'react'
import { CloseAtClickOutside } from '../myhooks/handleClicks'
import * as MdIcons from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDetectAdBlock } from 'adblock-detect-react'
import { motion, AnimatePresence } from 'framer-motion'

const KitMenu = (props) => {

  const router = useRouter()
  const adBlockDetected = useDetectAdBlock()
  const [newKit, setNewkit] = useState('')
  const [kitSelected, setKitselected] = useState('')
  const [bmSelected, setBmselected] = useState('')
  const [kitsContainer, setKitscontainer] = useState([])
  const [dropdownList, setDropdownlist] = useState(() => {
                                                          const final = {}
                                                          props.kits.map((kit) => {
                                                            final[kit.id] = false
                                                          })
                                                          return final
                                                        })
  const [showRemember, setShowremember] = useState(false)

  useEffect(() => {
    setKitscontainer(props.kits)
  })
  
  const isOpen = (e) => {
    const id = e.currentTarget.id
    setKitselected(id)
    setDropdownlist({[id]: !dropdownList[id]})
  }

  const openAllBookmarks = (e, bookmarks) => {
    e.preventDefault()
    const message = 'Please remove the pop-up blocker for this site and refresh the page to be able to open many tabs at same time'
    adBlockDetected ? window.alert(message) : bookmarks.map((bm) => {
                                                          window.open(bm.url, '_blank')
                                                        })
  }

  return (
    <div className="m-2 flex-col flex bg-white rounded-lg text-lg text-letters-dark pl-2 w-1/4 space-y-8">
      <div className="flex-col space-y-4 pl-4 pt-6">
        <form onSubmit={e => {
                              props.handleNewKit(e, newKit)
                              setNewkit('')
                            }}>
          <div className="mt-2">
            <div className="space-y-6">
              <input tpye="text" placeholder="Enter a name for your kit" value={newKit} onChange={e => setNewkit(e.target.value)} maxLength="20" className="border-2 rounded-lg p-2 w-3/4 focus:outline-none focus:border-blue-500" required/>
              <input type="submit" value="Create Kit" className="cursor-pointer p-2 w-1/2 justify-center bg-aux bg-opacity-50 border-b-4 border-aux text-letters-dark hover:shadow-lg flex rounded-lg hover:bg-opacity-75 transition duration-300 focus:outline-none" />
            </div>
            {showRemember ? 
            <AnimatePresence >
              <div className="relative flex right-0 bottom-0">
                <motion.div initial="hidden" animate="visible" exit="exit" variants={{
                  hidden: {
                    opacity: 0,
                    scale: 0,
                    display: 'flex',
                    position: 'absolute',
                    width: '33%',
                    right: '0px',
                    bottom: '0px',
                    marginRight: '1rem',
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: .4
                    }
                  },
                  exit: {
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: .4
                    }
                  }
                  }}>
                  <div className="bg-pink-200 rounded-lg w-full animate-bounce">  
                    <div className="text-sm text-center rounded-lg p-1 w-full border-b-4 border-remark bg-remark bg-opacity-25 text-main">
                      Remove the pop-up blocker !
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>
            : null}
          </div>
        </form>
      </div>
      <div className="pl-4 p-2 py-4">
        <div className="space-y-6" onMouseOver={() => setShowremember(true)} onMouseLeave={() => setTimeout(() => setShowremember(false), 500)}>
          {kitsContainer.map((kit, index) => {
            return [
              <div key={index}>
                <div className="flex place-items-center text-lg w-full">
                  <div className="flex flex-row place-items-center w-10/12 space-x-6">
                    <span className="flex-1">{kit.title}</span>
                    <div className="flex w-2/6 justify-between">
                      <div className="flex w-2/4 justify-between">
                        <button onClick={(e) => openAllBookmarks(e, kit.bookmarks)} className="flex hover:text-aux focus:outline-none"><MdIcons.MdLaunch /></button>
                        {dropdownList[kit.id] ?
                        <button id={kit.id} onClick={e => isOpen(e)} className="flex text-letters-dark focus:outline-none"><MdIcons.MdKeyboardArrowUp /></button>
                      :
                      <button id={kit.id} onClick={e => isOpen(e)} className="flex text-letters-dark focus:outline-none"><MdIcons.MdKeyboardArrowDown /></button>
                      }
                      </div>
                      <div className="flex w-2/4 justify-center">
                        {dropdownList[kit.id] ? 
                        <button onClick={(e) => props.handleDeleteKit(e, kit.id)} className="flex text-remark hover:text-aux focus:outline-none"><MdIcons.MdDelete /></button>
                        : null}
                      </div>
                    </div>
                  </div>
                </div>
                {dropdownList[kit.id] ? 
                <div id={`kit-bms-${kit.id}`} className="pl-1 italic text-lg opacity-50 space-y-2 mt-1">
                  {kit.bookmarks.map((bm, idx) => {
                    return [
                      <div key={idx} className="space-x-2">
                        <a href={bm.url} target="__blank" className="hover:text-aux">{bm.title}</a>
                        <button onClick={(e) => props.handleRemoveBmfromKit(e, kit.id, bm.id)} className="text-remark hover:text-aux"><MdIcons.MdDelete /></button>
                      </div>
                    ]
                  })}
                </div>
                : null }
              </div>
            ]
          })}
        </div>
      </div>
    </div>
  )
}

export default KitMenu
