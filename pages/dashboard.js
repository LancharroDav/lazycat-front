import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FavoriteBox from '../components/favoritebox'
import ActionBar from '../components/actionbar'
import NewBookmarkWindow from '../components/newbookmarkwindow'
import SideBarMain from '../components/sidebarmain'
import KitMenu from '../components/kitmenu'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (...args) => axios.get(...args, {withCredentials: true}).then(res => res.data)

// const starterUrl = 'http://localhost:4000/api/v1/checks/starter.json'
const starterUrl = 'https://devreturns-api.herokuapp.com/api/v1/checks/starter.json'
// const mainUrl = 'http://localhost:4000/api/v1'
const mainUrl = 'https://devreturns-api.herokuapp.com/api/v1'
// const rootUrl = 'http://localhost:4000'
const rootUrl = 'https://devreturns-api.herokuapp.com'

export default function Dashboard() {

  const router = useRouter()

  const [tagContainer, setTagcontainer] = useState('')
  const [bmContainer, setBmcontainer] = useState('')
  const [kitContainer, setKitcontainer] = useState('')
  const [selectedTag, setSelectedtag] = useState({tagname: 'latest', tagid: 'latest'})

  const { data, error } = useSWR(starterUrl, fetcher, {revalidateOnFocus: false})
  if (error) return <h2>Some error ocurred</h2>
  if (!error && !data) {
    return (
      <div className="d-flex align-items-center container">
        <strong>Loading...</strong>
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    )
  }

  const getBookmarksList = () => {
    const definedUrl = (selectedTag.tagname === 'latest') ? '/bookmarks' : `/tags/${selectedTag.tagid}`
    axios.get(`${mainUrl}${definedUrl}.json`, {
      withCredentials: true
    })
    .then(res => {
      setBmcontainer(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getTagsList = () => {
    axios.get(`${mainUrl}/tags.json`, {
      withCredentials: true
    })
    .then(res => {
      setTagcontainer(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getKitsList = () => {
    axios.get(`${mainUrl}/kits.json`, {
      withCredentials: true
    })
    .then(res => {
      setKitcontainer(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleNewBookmark = (e, url, title, tags) => {
    e.preventDefault()

    axios.post(`${mainUrl}/bookmarks.json`, {
      bookmark: {
        url: url,
        title: title,
        all_tags: tags
      }},{
        withCredentials: true
      })
    .then(res => {
      getTagsList()
      getBookmarksList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleNewKit = (e, kitname) => {
    e.preventDefault()

    axios.post(`${mainUrl}/kits.json`, {
      kit: {
        title: kitname
      }},{
        withCredentials: true
      })
    .then(res => {
      getKitsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleDeleteKit = (e, kitid) => {
    e.preventDefault()

    axios.delete(`${mainUrl}/kits/${kitid}`, {
      withCredentials: true
    })
    .then(res => {
      getKitsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleBookmarkToKit = (e, kitid, bmid) => {
    e.preventDefault()

    axios.post(`${mainUrl}/kittings.json`, {
      kitting: {
        kit_id: kitid,
        bookmark_id: bmid
      }
    },{
      withCredentials: true
    })
    .then(res => {
      getKitsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleRemoveBmfromKit = (e, kitid, bmid) => {
    e.preventDefault()

    // console.log(kitid)
    // console.log(bmid)
    axios.delete(`${mainUrl}/kittings/${kitid}-${bmid}`,{
      withCredentials: true
    })
    .then(res => {
      getKitsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleShowBookmarks = (tagname, tagid) => {
    const definedUrl = (tagname === 'latest' && tagid === 'latest') ? '/bookmarks' : `/tags/${tagid}`
    axios.get(`${mainUrl}${definedUrl}.json`, {
      withCredentials: true
    })
    .then(res => {
      setBmcontainer(res.data)
      setSelectedtag({tagname: tagname, tagid: tagid})
      router.replace({
        query: {q: tagname, i: tagid}
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleDeleteBookmark = (bmid) => {
    axios.delete(`${mainUrl}/bookmarks/${bmid}`, {
      withCredentials: true
    })
    .then(res => {
      getBookmarksList()
      getKitsList()
      getTagsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleEditBookmark = (e, bmid, bmurl, bmtitle, bmtags) => {
    e.preventDefault()
    
    axios.put(`${mainUrl}/bookmarks/${bmid}`, {
      bookmark: {
        url: bmurl,
        title: bmtitle,
        all_tags: bmtags
      }},{
        withCredentials: true
      })
    .then(res => {
      getTagsList()
      getBookmarksList()
      getKitsList()
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>DevReturns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-back flex">
        <div className="flex w-full h-screen">
          <nav className="h-full w-1/5 bg-main">
            <SideBarMain tags={tagContainer ? tagContainer : data.tags} handleShowBookmarks={handleShowBookmarks} selectedTagid={selectedTag.tagid} rootUrl={rootUrl} />
          </nav>
          <div className="flex-row w-full justify-items-center overflow-auto">
            <div className="flex flex-row h-24 justify-between place-items-center">
              <ActionBar tags={tagContainer ? tagContainer : data.tags} handleShowBookmarks={handleShowBookmarks} selectedTagname={selectedTag.tagname} />
              <NewBookmarkWindow tags={tagContainer ? tagContainer : data.tags} handleNewBookmark={handleNewBookmark} />
            </div>
            <div className="flex h-screen">
              <FavoriteBox 
              bookmarks={bmContainer ? bmContainer : data.bookmarks} 
              kits={ kitContainer ? kitContainer : data.kits}
              tags={tagContainer ? tagContainer : data.tags}
              handleBookmarkToKit={handleBookmarkToKit} 
              handleDeleteBookmark={handleDeleteBookmark}
              handleEditBookmark={handleEditBookmark}
              />
              <KitMenu 
              kits={ kitContainer ? kitContainer : data.kits} 
              handleNewKit={handleNewKit} 
              handleDeleteKit={handleDeleteKit} 
              handleRemoveBmfromKit={handleRemoveBmfromKit}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
