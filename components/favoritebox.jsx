import { useState, useEffect, useRef } from 'react'
import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'
import { useRouter } from 'next/router'
import axios from 'axios'
import Select from 'react-select'
import { CloseAtClickOutside } from '../myhooks/handleClicks'
import { motion, AnimatePresence } from 'framer-motion'
import CreatableSelect from 'react-select/creatable'

const FavoriteBox = (props) => {

  const router = useRouter()
  const newKitRef = useRef(null)
  const [showPopUp, setShowpopup] = useState(false)
  const [showKitMenu, setShowkitmenu] = useState(false)
  const [showEditMenu, setShoweditmenu] = useState(false)
  const [showDeleteWindow, setShowdeletewindow] = useState(false)
  const [bmIdSelected, setBmIdselected] = useState('')
  const [bmTitleSelected, setBmtitleselected] = useState('')
  const [bmUrlSelected, setBmurlselected] = useState('')
  const [bmTagsSelected, setBmtagsselected] = useState([])
  const [kitSelected, setKitselected] = useState('')
  const [bmContainer, setBmcontainer] = useState([])
  const [kitContainer, setKitcontainer] = useState([])
  const [tagContainer, setTagcontainer] = useState([])
  const [newTitle, setNewtitle] = useState('')
  const [newTags, setNewtags] = useState('')

  useEffect(() => {
    setBmcontainer(props.bookmarks)
    setKitcontainer(props.kits)
    setTagcontainer(props.tags)
  })
  

  const truncateUrl = url => {
    if (url.length > 80) {
      return `${url.substring(0, 80)}...`
    }
    else {
      return url
    }
  }

  const kitOptions = () => {
    const kitsArr = []
    kitContainer.map((kit) => {
      const kitHash = {
        label: kit.title,
        value: kit.id
      }
      kitsArr.push(kitHash)
    })
    return kitsArr
  }

  const tagOptions = () => {
    const tagsArr = []
    tagContainer.map((tag) => {
      const tagHash = {
        label: tag.title,
        value: tag.id
      }
      tagsArr.push(tagHash)
    })
    return tagsArr
  }

  const tagSelectedOptions = () => {
    const tagsSelectedArr = []
    bmTagsSelected.map((tag) => {
      const tagHash = {
        label: tag.title,
        value: tag.id
      }
      tagsSelectedArr.push(tagHash)
    })
    return tagsSelectedArr
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
        cursor: 'pointer'
      }
    }
  }

  const selectKit = (e) => {
    setKitselected(e.value)
  }

  const popKitMenu = (bmid, bmtitle) => {
    setShowpopup(!showPopUp)
    setShowdeletewindow(false)
    setShoweditmenu(false)
    setBmIdselected(bmid)
    setBmtitleselected(bmtitle)
    setShowkitmenu(true)
  }

  const popDeleteWindow = (bmid, bmtitle) => {
    setShowpopup(!showPopUp)
    setShowkitmenu(false)
    setShoweditmenu(false)
    setBmIdselected(bmid)
    setBmtitleselected(bmtitle)
    setShowdeletewindow(true)
  }

  const popEditMenu = (bmid, bmtitle, bmurl, bmtags) => {
    setShowpopup(!showPopUp)
    setShowdeletewindow(false)
    setShowkitmenu(false)
    setBmIdselected(bmid)
    setBmtitleselected(bmtitle)
    setBmurlselected(bmurl)
    setBmtagsselected(bmtags)
    setNewtitle(bmtitle)
    setNewtags(() => {
      const tags = []
      bmtags.map((tag) => {
        tags.push(tag.title)
      })
      return tags.toString()
    })
    setShoweditmenu(true)
  }

  const openClose = () => {
    setShowpopup(!showPopUp)
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

  // CloseAtClickOutside(newKitRef, setShowpopup)

  return (
    <div id='fav-box' className="m-2 w-3/4">
      <AnimatePresence>
        {showPopUp ? 
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
          <motion.div initial='hidden' animate='visible' exit='exit' variants={{
            hidden: {
              scale: 0,
              opacity: 0,
              position: 'absolute',
              display: 'flex',
              zIndex: 50,
              width: '30rem',
              height: '25rem',
              top: '96px',
              bottom: '200px',
              right: '0px',
              left: '0px',
              margin: 'auto'
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: .3
              },
              position: 'absolute',
              display: 'flex',
              zIndex: 50,
              width: '30rem',
              height: '25rem',
              top: '96px',
              bottom: '200px',
              right: '0px',
              left: '0px',
              margin: 'auto'
            },
            exit: {
              opacity: 0,
              scale: 0,
              transition: {
                duration: .3
              },
            }
          }}>
            <div className="flex w-full rounded-lg bg-white shadow-lg"  ref={newKitRef}>
              <button onClick={openClose} className="absolute text-letters-dark rounded-full right-0 m-3 text-xl transform transition ease-in-out duration-200 hover:text-remark hover:scale-200 focus:outline-none">
                <MdIcons.MdClear />
              </button> 
              <div className="flex justify-center place-items-center w-full bg-aux bg-opacity-50 rounded-lg border-b-8 border-aux">

                {/* KIT MENU POP-UP WINDOW */}
                {showKitMenu ? 
                <form className="flex flex-col w-10/12 space-y-12" onSubmit={e => {
                                                                                  props.handleBookmarkToKit(e, kitSelected, bmIdSelected)
                                                                                  setShowkitmenu(false)
                                                                                  setShowpopup(false)
                                                                                  }}>
                  <div className="text-xl text-letters-dark mb-2 text-center font-bold">Add "{bmTitleSelected}" to a Kit</div>
                  <Select
                  className="w-full cursor-text"
                  autoFocus={true}
                  onChange={selectKit} 
                  options={kitOptions()}
                  />
                  <div className="pl-4 w-full justify-center flex">
                    <input value="Add" type="submit" className="w-1/4 focus:outline-none p-2 bg-letters-dark text-aux text-center text-lg rounded-lg hover:shadow-lg flex place-items-center justify-center hover:bg-opacity-90 transform transition ease-in-out duration-200 cursor-pointer" />                
                  </div>
                </form>
                : null}

                {/* EDIT POP-UP WINDOW */}
                {showEditMenu ? 
                <div className="flex flex-col w-10/12 text-letters-dark">
                  <form className="flex w-full" onSubmit={e => {
                                                                props.handleEditBookmark(e, bmIdSelected, bmUrlSelected, newTitle, newTags)
                                                                setShoweditmenu(false)
                                                                setShowpopup(false)
                                                              }}>
                    <div className="flex place-items-center w-full">
                      <div className="flex flex-col w-full space-y-8">
                        <div className="text-xl font-bold ml-10">Edit Bookmark</div>
                        <div className="flex space-x-2 place-items-center">
                          <label className="">URL</label>
                          <input type="url" id="new-url" placeholder="Click to paste URL from clipboard" defaultValue={bmUrlSelected} className="rounded-lg w-full italic p-2 pl-2 focus:outline-none text-gray-500 bg-gray-300 cursor-not-allowed" disabled/>
                        </div>
                        <div className="flex space-x-2 place-items-center">
                          <label>Title</label>
                          <input type="text" id="fav-title" autoFocus onChange={e => setNewtitle(e.target.value)} maxLength="100" placeholder="Enter a title for this bookmark" defaultValue={bmTitleSelected} className="rounded-lg w-full p-2 pl-2 focus:outline-none text-letters-dark bg-white" required/>
                        </div>
                        <div className="flex space-x-2 place-items-center">
                          <label>Tags</label>
                          <CreatableSelect 
                          className="w-full"
                          defaultValue={tagSelectedOptions()}
                          onChange={handleTagChange}
                          isMulti
                          options={tagOptions()}
                          noOptionsMessage={() => {
                            return newTags.split(",").length > 4 ? "You've reached the max of 5 tags" : "No options available"
                          }}
                          isValidNewOption={() => newTags.split(",").length > 4 ? false : true}
                          styles={styles}
                          />
                        </div>
                        <div className="space-x-2 pl-4 w-full justify-center flex">
                          <input type="submit" id="submit-new" value="Update" className="w-1/4 focus:outline-none p-2 bg-letters-dark text-aux text-lg rounded-lg hover:shadow-lg flex place-items-center justify-center hover:bg-opacity-90 transform transition ease-in-out duration-200 cursor-pointer" />                
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                : null}

                {/* DELETE POP-UP WINDOW */}
                {showDeleteWindow ? 
                <div className="flex flex-col text-center w-10/12 space-y-12 text-letters-dark text-xl">
                  <h1 className="text-2xl font-bold">Are you sure?</h1>
                  <span className="py-4">Bookmark "{bmTitleSelected}" is going to be completely deleted</span>
                  <div className="space-x-4">
                    <button autoFocus className="bg-letters-dark text-aux rounded-lg p-2 px-6 focus:outline-none hover:bg-opacity-90 hover:shadow-lg transform transition ease-in-out duration-200" onClick={openClose}>
                      Cancel
                    </button>
                    <button className="bg-remark rounded-lg p-2 px-6 focus:outline-none hover:bg-opacity-90 hover:shadow-lg transform transition ease-in-out duration-200"
                            onClick={() => {
                                            props.handleDeleteBookmark(bmIdSelected)
                                            openClose()
                                            }}>
                      Delete
                    </button>
                  </div>
                </div>
                : null}

              </div>
            </div>
          </motion.div>
        </div>
        : null}
      </AnimatePresence>
      {bmContainer.map((item, index) => {
        return [
          <div key={index} className="mb-2">
            <div className="bg-white text-letters-dark justify-start rounded-lg h-32 flex place-items-center transition duration-200 hover:bg-back hover:shadow-inner">
              <div className="w-1/12 h-32 flex justify-center">
                {(item.icon) ? 
                  <img src={item.icon} alt="icon" className="self-center w-5/12"/>
                  : <div className="self-center text-4xl text-aux w-5/12"><GiIcons.GiIsland /></div>
                }
              </div>
              <div className="w-11/12 flex">
                <div className="flex-col flex w-9/12 pl-2">
                  <a href={item.url} target="__blank" className="space-y-3">
                    <div className="truncate">{item.title}</div>
                    <div className="italic opacity-50 text-sm flex truncate w-10/12">{truncateUrl(item.url)}</div>
                    <div className="flex space-x-2">
                      {item.tags.map((tag, idx) => {
                        return [
                          <div key={idx} className="text-sm place-items-center flex bg-aux bg-opacity-50 text-letters-dark px-2 rounded-full">{tag.title}</div>
                        ]
                      })}
                    </div>
                  </a>            
                </div>
                <div className="flex flex-col w-3/12 text-xl text-letters-dark justify-center">
                  <div className="space-x-4 flex justify-center">
                    <button onClick={() => popKitMenu(item.id, item.title)} className="focus:outline-none transform transition ease-in-out duration-200 hover:text-aux"><MdIcons.MdAddToPhotos /></button>
                    <button onClick={() => popEditMenu(item.id, item.title, item.url, item.tags)} className="focus:outline-none transform transition ease-in-out duration-200 hover:text-aux"><MdIcons.MdEdit /></button>
                    {/* <button onClick={copyToClipboard(item.url)} className="focus:outline-none"><MdIcons.MdContentCopy /></button> */}
                    <button onClick={() => popDeleteWindow(item.id, item.title)} className="text-remark focus:outline-none transform transition ease-in-out duration-200 hover:text-aux"><MdIcons.MdDelete /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ]
      })}
    </div>
  )
}

export default FavoriteBox
