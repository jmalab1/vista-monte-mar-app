import PBeach from './beach-top-view.jpg?w=2400&webp'

export const Hero = () => {
    const styles = {
        backgroundImage: `url(${PBeach})`
    };

    return (
        <div
            className="hero min-h-[700px] relative"
            style={styles}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
                    <p className="mb-5">
                        Welcome to Vista Monte Mar! Enjoy a cozy stay with modern amenities in a prime location. We look forward to hosting you!
                    </p>
                </div>
            </div>
            <div className='absolute bottom-0 right-0 text-[6pt] bg-white bg-opacity-60 pl-2 pr-2 z-50'>Photo By @photosbychalo</div>
        </div >
    );
};

export default Hero;
