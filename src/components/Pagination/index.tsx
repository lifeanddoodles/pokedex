import { useEffect, useMemo, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { updateOffset } from "../../features/pagination/paginationSlice"

const OFFSET = 20

const Pagination = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const newOffset = useMemo(() => (currentPage - 1) * OFFSET, [currentPage])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateOffset(newOffset))
  }, [dispatch, newOffset])

  return (
    <section className="pagination">
      {children}
      <div>
        <button onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </section>
  )
}

export default Pagination
