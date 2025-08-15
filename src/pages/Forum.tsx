import { useEffect, useState } from 'react';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import Upvote from '../components/Upvote';
import Downvote from '../components/Downvote';
import MainHeader from '../components/MainHeader';

const Forum = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [fingerprint, setFingerprint] = useState('');

  const links = [{ name: 'Home', to: '/' }];

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    loadFingerprint();
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('https://bf2v9n0q-5000.inc1.devtunnels.ms/forum');
      setEntries(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchVotes = async () => {
      if (!fingerprint) return;
      try {
        const res = await axios.post('https://bf2v9n0q-5000.inc1.devtunnels.ms/get-votes', {
          fingerprint,
        });

        const voted = res.data.voted || {};
        setVotes(voted); 
      } catch (error) {
        console.error('Failed to fetch voted entries', error);
      }
    };

    fetchVotes();
  }, [fingerprint]);

  const handleVote = async (entryId: number, voteType: string) => {
    if (!fingerprint) return;

    setVotes(prev => ({ ...prev, [entryId]: voteType }));

    try {
      const res = await axios.post(`https://bf2v9n0q-5000.inc1.devtunnels.ms/vote`, {
        id: entryId,
        voteType: voteType,
        fingerprint: fingerprint,
      });

      if (res.status === 200) {
        setEntries(prevEntries =>
          prevEntries.map(entry => {
            if (entry.id === entryId) {
              return {
                ...entry,
                upvotes: voteType === 'upvote' ? entry.upvotes + 1 : entry.upvotes,
                downvotes: voteType === 'downvote' ? entry.downvotes + 1 : entry.downvotes,
              };
            }
            return entry;
          })
        );
      }
    } catch (error) {
      console.error('Vote failed or already voted:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-mono">
      <MainHeader links={links} />

      <div className="absolute w-full h-full z-10 pointer-events-none fog-layer bg-repeat opacity-20"></div>
      <div className="absolute inset-0 z-20 pointer-events-none rain-overlay"></div>

      <div className="relative z-30 px-4 py-16 mt-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-red-600 drop-shadow-glow tracking-wide mb-10">
          Tales of Sins from Paatal Lok 🔥
        </h2>

        {loading ? (
          <div className="text-center text-gray-400 text-lg animate-pulse">Fetching sins from the underworld...</div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {entries.map(entry => (
              <div
                key={entry.id}
                className="bg-black/60 border border-red-700 rounded-2xl p-6 backdrop-blur-sm shadow-2xl shadow-red-900 transition-transform hover:scale-105 hover:shadow-lg flex justify-between items-center"
              >
                <div className="flex-grow">
                  <div className="text-sm text-red-400 mb-2">
                    {new Date(entry.created_on).toLocaleString()}
                  </div>
                  <p className="text-red-200 italic tracking-wide">{entry.user_query}</p>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleVote(entry.id, 'upvote')}
                    disabled={!!votes[entry.id]}
                    className={`font-bold py-2 px-4 rounded transition-colors duration-300 ${votes[entry.id]
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-red-700 text-white hover:bg-red-800'
                      } ${votes[entry.id] === 'upvote' ? 'border-2 border-white' : ''}`}
                  >
                    <Upvote className='h-6 w-6' count={entry.upvotes} />
                  </button>
                  <button
                    onClick={() => handleVote(entry.id, 'downvote')}
                    disabled={!!votes[entry.id]}
                    className={`font-bold py-2 px-4 rounded transition-colors duration-300 ${votes[entry.id]
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-800'
                      } ${votes[entry.id] === 'downvote' ? 'border-2 border-white' : ''}`}
                  >
                    <Downvote className='w-6 h-6' count={entry.downvotes} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .rain-overlay {
          background-image: url('/rain_effect.gif');
          background-size: cover;
          opacity: 0.2;
        }

        .fog-layer {
          background-image: url('/fog_overlay.png');
        }

        .drop-shadow-glow {
          text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
        }
      `}</style>
    </div>
  );
};

export default Forum;
