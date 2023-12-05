import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="sm:h-[100px] h-full sm:w-auto w-full blur-effect blur-dark-bg sm:rounded-[16px] shadow-lg shadow-gray-800 flex justify-center items-center px-[30px]">
                <h1 className="text-[30px] pr-[20px] mr-[20px] border-r-[1px] border-gray-500"> 404 </h1>
                <div>
                    <h1> The page you're looking for cannot be found. </h1>
                    <span> Go back to </span>
                    <Link href="/home" className="text-blue-400 hover:underline"> home. </Link>
                </div>
            </div>
        </div>
    );
}
 
export default NotFound;