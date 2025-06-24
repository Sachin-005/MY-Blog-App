import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full dark:bg-dark-surface rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] md:w-[340px] lg:w-[300px]'>
      <Link to={`/post/${post.slug}`}>
        <div className='relative h-[260px]'>
          <img
            src={post.image}
            alt='post cover'
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
      </Link>
      <div className='p-4 dark:text-dark-text'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='px-2 py-1 text-xs bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-200 rounded-full font-semibold'>{post.category}</span>
        </div>
        <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
        <Link
          to={`/post/${post.slug}`}
          className='inline-flex items-center gap-2 px-4 py-2 bg-teal-500 dark:bg-teal-600 text-white rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors duration-200'
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}