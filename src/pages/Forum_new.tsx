import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import MainHeader from '../components/MainHeader';
import './Forum.css';
import ListItem from '../components/ListItem';

interface Entry {
  id: number;
  created_on: string;
  user_query: string;
  upvotes: number;
  downvotes: number;
}

type VoteType = 'upvote' | 'downvote';
type VotesMap = Record<number, VoteType | undefined>;

const Forum = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<VotesMap>({});
  const [fingerprint, setFingerprint] = useState('');

  const REQUEST_URL = (import.meta.env.VITE_REQUEST_URL as string) || '';

  const links = [
    { name: 'Home', to: '/' },
    { name: 'Confess', to: '/confess' },
  ];

  const fetchEntries = useCallback(async () => {
    try {
      const res = await axios.get(`${REQUEST_URL}/forum`);
      setEntries(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setLoading(false);
    }
  }, [REQUEST_URL]);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    loadFingerprint();
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    const fetchVotes = async () => {
      if (!fingerprint) return;
      try {
        const res = await axios.post(`${REQUEST_URL}/get-votes`, {
          fingerprint,
        });

        const voted: Record<string, VoteType> = res.data.voted || {};
        const normalized: VotesMap = {};
        Object.keys(voted).forEach((k) => {
          const num = Number(k);
          if (!isNaN(num)) normalized[num] = voted[k];
        });
        setVotes(normalized);
      } catch (error) {
        console.error('Failed to fetch voted entries', error);
      }
    };

    fetchVotes();
  }, [fingerprint, REQUEST_URL]);

  const handleVote = async (entryId: number, voteType: VoteType) => {
    if (!fingerprint) return;

    setVotes((prev) => ({ ...prev, [entryId]: voteType }));
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              upvotes: voteType === 'upvote' ? e.upvotes + 1 : e.upvotes,
              downvotes: voteType === 'downvote' ? e.downvotes + 1 : e.downvotes,
            }
          : e
      )
    );

    try {
      await axios.post(`${REQUEST_URL}/vote`, {
        id: entryId,
        voteType,
        fingerprint,
      });
    } catch (err) {
      console.error('Vote failed or already voted:', err);
      setVotes((prev) => {
        const copy = { ...prev };
        delete copy[entryId];
        return copy;
      });
      fetchEntries();
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
            {entries.map((entry) => (
              <ListItem
                key={entry.id}
                id={entry.id}
                date={new Date(entry.created_on).toLocaleString()}
                user_query={entry.user_query}
                upvotes={entry.upvotes}
                downvotes={entry.downvotes}
                voted={votes[entry.id]}
                onVote={handleVote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
