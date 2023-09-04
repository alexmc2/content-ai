import Link from 'next/link';

export const Paginate = ({ totalPages, currentPage }) => {
  return totalPages > 1 && (
    <div>
      {[...Array(totalPages).keys()].map((x) => (
        <Link
          key={x + 1}
          href={`/history?page=${x + 1}`}
          className={x + 1 === currentPage ? 'active' : ''}>
          {x + 1}
        </Link>
      ))}
    </div>
  );
};


