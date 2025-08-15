import React from "react";
import { Link } from "react-router-dom";

interface NavItem { name: string; to: string }
interface Props {
    links: NavItem[]
}

const MainHeader: React.FC<Props> = ({links}) => {

    return (
        <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md border-b border-red-900/50 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-red-600 drop-shadow-glow" style={{ fontFamily: 'ZombieFont, sans-serif' }}>
                    NARAKA
                </Link>
                <div className="space-x-4 md:space-x-6">
                    {links.map((item, indx) => (
                        <Link key={indx} to={item.to} className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-semibold">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default MainHeader;