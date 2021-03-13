import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { CloseAtClickOutside } from '../myhooks/handleClicks'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable'
import { motion, AnimatePresence } from 'framer-motion'

const NewBookmarkWindow = (props) => {

  const router = useRouter()
  const newBookmarkRef = useRef(null)
  const [showNewBMWindow, setShownewbmwindow] = useState(false)
  const [newUrl, setNewurl] = useState('')
  const [newTitle, setNewtitle] = useState('')
  const [newTags, setNewtags] = useState('')

  const options = () => {
    if (newTags.split(",").length < 5) {
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
  }

  const styles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: 'white',
        border: '0px',
        borderRadius: '0.5rem',
        padding: '1px',
        paddingLeft: '0,5rem',
        color: '#565656',
        cursor: 'text'
      }
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#85C199',
        borderRadius: '0.5rem',
      }
    },
    multiValueRemove: (styles) => {
      return {
        ...styles,
        borderRadius: '0.5rem',
        cursor: 'pointer',
      }
    }
  }

  const openClose = () => {
    setShownewbmwindow(!showNewBMWindow)
    setNewurl('')
    setNewtitle('')
    setNewtags('')
  }

  const pasteClipboard = () => {
    navigator.clipboard.readText()
    .then(res => {
      setNewurl(res)
    })
  }

  const handleTagChange = (tags) => {
    const toPush = []
    if (tags) {
      tags.map((item) => {
        toPush.push(item.label)
      })
      setNewtags(toPush.toString())
    }
  }


  // CloseAtClickOutside(newBookmarkRef, setShownewbmwindow)

  return (
    <div className="m-4 w-3/4 flex right-0 justify-end" ref={newBookmarkRef}>
      <AnimatePresence>
      {(showNewBMWindow) ?
      <div>
        <motion.div initial='hidden' animate='visible' exit='exit' variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1
          },
          exit: {
            opacity: 0
          }
        }}>
          <div onClick={openClose} className="bg-main right-0 left-0 top-0 bottom-0 m-auto absolute z-50 flex opacity-25"></div>
        </motion.div>
        <motion.div initial="hidden" animate="visible" exit='exit' variants={{
          hidden: {
            opacity: 0,
            position: "absolute",
            display: "flex",
            zIndex: 50,
            width: '15%',
            top: '0px',
            right: '0px',
            marginTop: '40px',
            marginRight: '60px'
          },
          visible: {
            opacity: 1,
            transition: {
              duration: .3
            },
            position: "absolute",
            display: "flex",
            zIndex: 50,
            width: '33%',
            top: '0px',
            right: '0px',
            marginTop: '40px',
            marginRight: '60px'
          },
          exit: {
            opacity: 0,
            width: '15%',
            transition: {
              duration: .3
            }
          }
        }}>
          <div className="flex w-full bg-white rounded-l-lg rounded-r-lg  z-50"> 
            <div className="flex w-full justify-end bg-aux bg-opacity-50 rounded-l-lg rounded-r-lg text-letters-dark text-md border-b-8 border-aux shadow-lg p-6">
              <button onClick={openClose} className="absolute text-letters-dark rounded-full text-xl transform transition ease-in-out duration-200 hover:text-remark hover:scale-200 focus:outline-none">
                <MdIcons.MdClear />
              </button>
              <form className="flex w-full" onSubmit={e => {
                                                            props.handleNewBookmark(e, newUrl, newTitle, newTags)
                                                            setShownewbmwindow(false)
                                                          }}>
                <div className="flex place-items-center w-full">
                  <div className="flex flex-col w-full space-y-6">
                    <div className="text-xl ml-10 font-bold">New Bookmark</div>
                    <div className="flex space-x-2 place-items-center">
                      <label className="">URL</label>
                      <input type="url" id="new-url" onClick={pasteClipboard} onChange={e => setNewurl(e.target.value)} placeholder="Click to paste URL from clipboard" defaultValue={newUrl} className="rounded-lg w-full italic p-2 pl-2 focus:outline-none text-letters-dark bg-white" required/>
                    </div>
                    <div className="flex space-x-2 place-items-center">
                      <label>Title</label>
                      <input type="text" id="fav-title" onChange={e => setNewtitle(e.target.value)} maxLength="100" placeholder="Enter a title for this bookmark" className="rounded-lg w-full italic p-2 pl-2 focus:outline-none text-letters-dark bg-white" required/>
                    </div>
                    <div className="flex space-x-2 place-items-center">
                      <label>Tags</label>
                      <CreatableSelect 
                      className="w-full"
                      onChange={handleTagChange}
                      isMulti
                      options={options()}
                      noOptionsMessage={() => {
                        return newTags.split(",").length > 4 ? "You've reached the max of 5 tags" : "No options available"
                      }}
                      isValidNewOption={() => newTags.split(",").length > 4 ? false : true}
                      styles={styles}
                      />
                    </div>
                    <div className="space-x-2 pl-4 w-full justify-center flex">
                      <input type="submit" id="submit-new" value="Save" className="w-1/4 focus:outline-none p-2 bg-letters-dark text-aux text-lg rounded-lg hover:shadow-lg flex place-items-center justify-center hover:bg-opacity-90 cursor-pointer transition duration-200" />                
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
        : 
        <button onClick={openClose} className="focus:outline-none bg-aux bg-opacity-50 text-letters-dark border-b-4 border-aux text-3xl mr-6 px-1 rounded-full space-x-2 hover:shadow-lg flex place-items-center justify-center hover:bg-opacity-75 transition duration-300">
          <span className="m-4"><BsIcons.BsBookmarkPlus /></span>
        </button>
      }
      </AnimatePresence>
    </div>
  )
}

export default NewBookmarkWindow
