import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
// You should use the Link component from react-router-dom for navigation
// since your other components use the router.
// import { Link } from 'react-router-dom';

// For demonstration, I'll use regular <Link> tags. Replace with <Link> for a single-page app experience.
// Example: <Link to="/confession"> becomes <Link to="/confession">

const Home = () => {

  const links: { name: string; to: string }[] = [
    {name: 'Confess', to: '/confess'},
    {name: 'Forum', to: '/forum'}
  ];

  // HellishIcon removed (unused)

  return (
    <div className="min-h-screen bg-black text-gray-300 font-serif overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-40 z-0"
        preload="auto"
      >
        <source src="hellVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <div className="relative z-20">
        <MainHeader links={links}/>

        <main>
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-glow animate-pulse" style={{ fontFamily: 'Bloody, serif' }}>
              Your Judgement Awaits
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-400">
              Unburden your soul. Confess your transgressions and discover the fate that awaits you in the afterlife, as foretold in the ancient scriptures of the Garud Puran.
            </p>
            <Link
              to="/confess"
              className="mt-8 px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold text-xl rounded-lg shadow-lg shadow-red-900/50 transform hover:scale-105 transition-all duration-300"
              style={{ fontFamily: 'ZombieFont, sans-serif' }}
            >
              CONFESS NOW
            </Link>
          </section>

          <section className="py-20 bg-black/40">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-red-600 mb-12" style={{ fontFamily: 'ZombieFont, sans-serif' }}>
                The Path to Penance
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {/* Step 1 */}
                <div className="border border-red-800/50 bg-black/30 p-8 rounded-xl backdrop-blur-sm">
                  <div className="text-5xl mb-4 text-red-500 font-bold" style={{ fontFamily: 'Bloody, serif' }}>1</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Submit Your Sin</h3>
                  <p className="text-gray-400">
                    Anonymously detail your deepest secrets and moral failings in the confession chamber. No sin is too great or too small for judgment.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="border border-red-800/50 bg-black/30 p-8 rounded-xl backdrop-blur-sm">
                  <div className="text-5xl mb-4 text-red-500 font-bold" style={{ fontFamily: 'Bloody, serif' }}>2</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Consult the Puranas</h3>
                  <p className="text-gray-400">
                    Our AI oracle delves into the sacred Garud Puran, analyzing your confession against the ancient catalog of sins and their prescribed consequences.
                  </p>
                </div>
                <div className="border border-red-800/50 bg-black/30 p-8 rounded-xl backdrop-blur-sm">
                  <div className="text-5xl mb-4 text-red-500 font-bold" style={{ fontFamily: 'Bloody, serif' }}>3</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Receive Your Verdict</h3>
                  <p className="text-gray-400">
                    Witness the punishment you have earned. A personalized vision of your afterlife fate will be revealed, straight from the depths of Naraka.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-6 text-center">
               <h2 className="text-4xl font-bold text-red-600 mb-4" style={{ fontFamily: 'ZombieFont, sans-serif' }}>
                Whispers from the Underworld
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-8">
                You are not alone in your trespasses. Enter the forum to read the anonymous confessions of other sinners. See what punishments they have received and find solace in shared damnation.
              </p>
              <Link
                to="/forum"
                className="px-8 py-3 border-2 border-red-700 text-red-500 font-bold text-lg rounded-lg hover:bg-red-700 hover:text-white transition-all duration-300"
              >
                Visit The Forum
              </Link>
            </div>
          </section>
        </main>

        <footer className="py-8 bg-black/80 border-t border-red-900/50">
          <div className="container mx-auto px-6 text-center text-gray-500">
            <p className="font-semibold" style={{ fontFamily: 'Bloody, serif' }}>
              Disclaimer: This is for entertainment purposes only.
            </p>
            <p className="text-sm mt-2">
              We are not responsible for any eternal damnation that may result from your confessions. All judgments are final.
            </p>
            <p className="text-xs mt-4">&copy; {new Date().getFullYear()} Naraka Industries. All rights reserved.</p>
          </div>
        </footer>
      </div>

  <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #ff0000);
        }
        /* You should define the 'ZombieFont' and 'Bloody' font-faces in your global CSS file (e.g., index.css) 
           so they are available across all components. */
      `}</style>
    </div>
  );
};

export default Home;

/**
 * SEO & Implementation Notes:
 * * 1.  React Router: I've used standard <Link> tags for the navigation. For a true Single Page Application (SPA)
 * experience and to prevent page reloads, you should replace all <Link to="..."> tags with the <Link to="...">
 * component from 'react-router-dom'.
 * * 2.  SEO Meta Tags: For optimal SEO, you should manage the <head> section of your page. Libraries like
 * 'react-helmet' or 'react-helmet-async' are perfect for this. You can use them to set the page <title>,
 * <meta name="description">, and other important tags.
 * * Example with react-helmet:
 * <Helmet>
 * <title>Naraka - Confess Your Sins & Discover Your Afterlife Fate</title>
 * <meta name="description" content="Based on the sacred Garud Puran, confess your sins anonymously and let our AI reveal the punishment that awaits you in the afterlife." />
 * <meta name="keywords" content="Garud Puran, confession, sin, afterlife, punishment, Naraka, hell, religion, AI" />
 * </Helmet>
 * * 3.  Fonts: I've referenced 'ZombieFont' and 'Bloody' as you used them in your other components. Ensure these
 * custom fonts are properly imported in your project's main CSS file (e.g., index.css or App.css) using @font-face.
 * * 4.  Media Assets: The background video path is set to "/hell_fire.mp4". Make sure this file is located in your `public` folder.
 */
