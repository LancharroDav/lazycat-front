import axios from 'axios'
import * as MdIcons from 'react-icons/md'

export const getAllBM = async () => {
  await axios.get('http://localhost:4000/api/v1/bookmarks.json', {
      withCredentials: true
    })
    .then(res => {
      const final = res.data
      return final
    })
    .catch(error => {
      // router.push('/sign_in_up')
    })
}