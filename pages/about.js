import Link from 'next/link';

export default function About(){
    return(
        <div className='justify-center flex min-h-screen font-poppins relative'>
            <div className='w-screen max-w-screen-sm story-board relative md:shadow-2xl md:shadow-sky-800/50'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className="h-40 bg-sky-700 text-white  justify-center items-center flex text-4xl font-semibold">
                        <span className="">About</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 p-3">
                        <div className="flex flex-col ">
                            <span className="mb-2">Welcome to TaleBites!</span>
                            <span className="mb-2">We've created this app, to bring you a wide selection of engaging and short immersive tales to enjoy.</span>
                            <span>This app features a range of genres, from romance and mystery to science fiction and horror. Whatever your preference, we have something for everyone.</span>
                        </div>
                        

                        <div className="flex flex-col">
                            <span className=" text-lg font-semibold">Credits</span>
                            <span className=" text-md font-normal">ChatGPT</span>
                            <span className=" text-md font-normal">Midjourney</span>
                        </div>

                        <div className="flex flex-col">
                            <span className=" text-lg font-semibold">Creater</span>
                            <span className=" text-md font-normal">Deepak Natanmai</span>
                        </div>
                    </div>

                    <div className='text-center'>
                        <Link href={'/'}>
                            <button type="button" class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800">Home</button>
                        </Link>
                    </div>
                                        
                </div>             
            </div>
            <div className="absolute bottom-0 flex w-full bg-sky-700 justify-center text-white text-sm">
                © 2023 All Rights Reserved - with ♡ from India
            </div>               
        </div>
    );
}