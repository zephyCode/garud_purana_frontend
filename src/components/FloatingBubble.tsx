import {FC} from 'react';
import { Link } from 'react-router-dom';
interface Props {
  links: { name: string; nav: string }[];
}

const FloatingBubble: FC <Props>= ({links}) => {
   const toggleMenu = () => {
    if (window.matchMedia('(hover: none)').matches) {
      const dropdown = document.getElementById('hell-menu');
      dropdown?.classList.toggle('scale-100');
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
        <div className="relative w-16 h-16 group">
          <button
            onClick={toggleMenu}
            className="absolute inset-0 bg-gradient-to-br from-red-700 to-black rounded-full shadow-lg animate-pulse border-2 border-red-900 cursor-pointer flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <span
              className="text-white text-2xl font-extrabold animate-glow"
              style={{ fontFamily: 'Caesar Dressing' }}
            >
              ☠️
            </span>
          </button>
          <div
            id="hell-menu"
            className="absolute -top-14 right-0 w-36 bg-black/90 border border-red-700 text-white rounded-lg p-3 text-sm font-bold scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right space-y-3"
            style={{ fontFamily: 'Bloody' }}
          >{links.map(  
              (item, index) =><Link to={item.nav} className="block hover:text-red-400" key={index}>{item.name}</Link>
            )}
          </div>
        </div>
      </div>
  )
}

export default FloatingBubble ;