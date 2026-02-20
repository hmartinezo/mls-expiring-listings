type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const canGoBack = page > 1
  const canGoForward = page < totalPages

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoBack}
      >
        Prev
      </button>
      <button
        className="pagination__button"
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoForward}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
