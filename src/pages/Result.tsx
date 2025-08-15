import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/fonts.css';
import './Result.css';

const Result = () => {
    const [showTypewriter, setShowTypewriter] = useState(false);
    const location = useLocation();
    const { result } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => setShowTypewriter(true), 1500);
        return () => clearTimeout(timer);
    }, []);

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
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center transition-opacity duration-1000 ${showTypewriter ? 'typewriter-active' : 'opacity-0'}`}
                        style={{fontFamily: 'Bloody'}}
                    >
                        {result?.description || 'No description available.'}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Result;
