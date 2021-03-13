import * as MdIcons from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const SideBarMain = (props) => {

  const [tagContainer, setTagcontainer] = useState([])

  const router = useRouter()

  useEffect(() => {
    setTagcontainer(props.tags)
  })
  
  const LogOut = () => {
    axios.delete(`${props.rootUrl}/users/sign_out`, {
      withCredentials: true
    })
    .then(res => {
      if (res.status === 204) {
        router.push('/')
      }
    })
  }

  const highlightTag = (tagid) => {
    const mainAtt = 'flex transform transition ease-in-out duration-200 focus:outline-none'
    return props.selectedTagid == tagid ? `${mainAtt} text-aux translate-x-2` : `${mainAtt} hover:translate-x-2 hover:text-aux`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex flex-col h-80pc">
        <div className="flex justify-center">
          <img src="/lazycat-logo-letters-dark.png" alt="logo" className="w-5/12" />
        </div>
        <div className="flex flex-col h-80pc text-letters border-aux border-t-2 rounded-lg pt-8 space-y-4">
          <button name="latest" id="latest" onClick={(e) => props.handleShowBookmarks(e.target.name, e.target.id)} className='flex transform transition ease-in-out duration-200 focus:outline-none hover:translate-x-2 hover:text-aux'>Latest Bookmarks</button>
          <div className="flex justify-between">
            <div className="flex place-items-center space-x-1">
              {/* <span className="text-aux text-lg"><MdIcons.MdAlbum /></span> */}
              <span>Tags</span>
            </div>
            <span>{tagContainer.length}</span>
          </div>
          <div className="ml-4 pl-2 pr-2 border-aux space-y-2 text-sm flex flex-col overflow-auto">
            {tagContainer.map((tag, index) => {
              return [
                <div key={index} className="flex justify-between">
                  <button id={tag.id} name={tag.title} onClick={(e) => props.handleShowBookmarks(e.target.name, e.target.id)} className={highlightTag(tag.id)}>
                    {tag.title}
                  </button>
                  <span>{tag.count}</span>
                </div>
              ]
            })}
          </div>
        </div>
      </div>
      <div className="px-2">
        <button onClick={LogOut} className="text-remark border-b-4 rounded-lg border-remark text-center text-xl w-full p-2 transition duration-500 hover:bg-remark hover:bg-opacity-90 hover:text-main focus:outline-none">
          Log Out
        </button>
      </div>
    </div>
  )
}

export default SideBarMain