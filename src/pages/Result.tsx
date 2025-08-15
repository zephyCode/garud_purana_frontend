import Typewriter from 'typewriter-effect';
import { useLocation } from 'react-router-dom';
import '../styles/fonts.css';
import './Result.css';

const Result = () => {
    const location = useLocation();
    const { result } = location.state || {};

    

    return (
        <div className="min-h-screen w-full relative bg-black overflow-hidden text-white">
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={`${result?.punishment}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-black/80 to-black/90 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.05)_10%,_transparent_80%)] z-20" />

            <div className="relative z-40 flex flex-col items-center justify-start min-h-screen pt-28 pb-16 px-4 sm:px-6 md:px-10">
                <h1 className="text-center mb-20 sm:mb-24 leading-relaxed">
                    <span
                        className="fire-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide"
                        style={{ fontFamily: 'Bloody' }}
                    >
                        {result?.punishment || 'Unknown Sin'}
                    </span>
                </h1>

                <div className="w-full max-w-4xl">
                    <h2
                        className="typewriter text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center"
                        style={{ whiteSpace: 'pre-line', fontFamily:'Bloody' }}
                    >
                        {result?.description ? (
                            <Typewriter
                                options={{
                                    delay: 15,
                                    cursor: '',
                                }}
                                onInit={(typewriter) => {
                                    typewriter.typeString(result.description).start();
                                }}
                            />
                        ) : 'No description available.'}
                        <span className="typewriter-cursor"></span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Result;
