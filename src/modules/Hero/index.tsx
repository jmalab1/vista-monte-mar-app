import { Link } from 'react-router-dom';
import PBeach from './beach-top-view.jpg?w=2400&webp'

export const Hero = () => {
    const styles = {
        backgroundImage: `url(${PBeach})`
    };

    return (
        <div
            className="hero min-h-[700px] relative"
            style={styles}>
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-white text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-7xl font-bold font-[Pacifico]">Welcome!</h1>
                    <p className="mb-5 text-lg bg-gray-900 bg-opacity-50 rounded">
                        Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities in a prime location. We look forward to hosting you!
                    </p>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 text-[6pt] bg-white bg-opacity-50 pl-2 pr-2 z-50'>
                <Link to={"https://unsplash.com/@photosbychalo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"} target='_blank' >
                    Photo By @photosbychalo
                </Link>
            </div>
        </div >
    );
};

export default Hero;
