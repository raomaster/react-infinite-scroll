import { useState, useEffect } from 'react'
import DataRow from './DataRow'
// import { debounce } from '../utils'
import './Table.scss'

const PUBLIC_API_URL = 'https://dummyjson.com/users'

// Fetching with a cutom Hook (right way) ref: https://beta.reactjs.org/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things
export const useData = (pageLimit) => {
  const [state, setState] = useState([])
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    // eviting unreleated things https://beta.reactjs.org/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things
    let ignore = false
    fetch(`${PUBLIC_API_URL}?limit=${pageLimit}&skip=${skip}`)
      .then((res) => res.json())
      .then((json) => {
        if (!ignore) {
          setSkip(pageLimit)
          setState([...state, ...json.users])
        }
      })
    return () => {
      ignore = true
    }
  }, [pageLimit])

  return { data: state }
}

const Table = () => {
  const [page, setPage] = useState(25)
  const [isFetching, setIsFetching] = useState(false)

  const { data } = useData(`${page}`)

  if (!data) return ('Loading...')

  /*   function handleNextPageClick () {
    setPage(page + 25)
  } */

  const onscroll = () => {
    if ((window.innerHeight + window.scrollY >= document.body.offsetHeight) && isFetching === false) {
      setIsFetching(true)
      setPage(page + 25)
      setTimeout(() => { setIsFetching(false) }, 5000)
      // debounce(setPage(page + 25), 5000)
    }
  }

  window.addEventListener('scroll', onscroll)

  return (
    <div>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <DataRow data={data} />
        </tbody>
      </table>
      {/*       <button
        onClick={handleNextPageClick} />
          Load More
        </button> */
      }
    </div>
  )
}

export default Table
