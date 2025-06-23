import { useEffect, useState } from "react"

const usePatients = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/patients.json")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export default usePatients
