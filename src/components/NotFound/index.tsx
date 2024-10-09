import { Link } from "react-router-dom";
import FourOFour from "./images/404.svg?w=400&webp"

const NotFound = () => {
    return (
        <section className="bg-base-200 ">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-info">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-nuetral md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link to={"/"} >
                            <button className="btn btn-sm btn-secondary">
                                Take me home
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg lg:mx-auto" src={FourOFour} alt="" />
                </div>
            </div>
        </section>
    );
};

export default NotFound;
