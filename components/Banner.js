export default function Banner() {
  
  return (
      <nav className="bg-sky-700 w-full">
        <div className="flex justify-center">
          <div className="text-center p-1">
            <div className="self-center text-white text-sm font-light whitespace-nowrap font-poppins">
                New Stories Every Week - Read More Details
                <button type="button" className="ml-2 text-white-700 border border-white-700 hover:bg-white-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-white-500 dark:text-white-500 dark:hover:text-white dark:focus:ring-white-800">
                <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Icon description</span>
                </button>                
            </div>
          </div>
        </div>
      </nav>
  )
}