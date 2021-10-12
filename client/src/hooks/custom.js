import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json()
        } else {
          setIsError(true)
          setIsLoading(false)
        }
      })
      .then((value) => {
        setData(value.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [url])

  return { data, isLoading, isError }
}
