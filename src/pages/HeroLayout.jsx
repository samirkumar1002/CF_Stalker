// HeroLayout.jsx
import React, { useEffect, useState, createContext } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';

export const HeroContext = createContext();

function HeroLayout() {
  const { handle } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [topicProblems, setTopicProblems] = useState({});

  // Persistent filter state
  const [selectedRating, setSelectedRating] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDateInputs, setShowDateInputs] = useState(false);

  useEffect(() => {
    // Fetch user info
    fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          setUserInfo(data.result[0]);
        }
      });

    // Fetch submissions and build mappings for ratings and topics.
    fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          const solvedByRating = {};
          const solvedByTopic = {};
          data.result.forEach((submission) => {
            if (submission.verdict === "OK" && submission.problem.rating) {
              const rating = submission.problem.rating.toString();
              const submissionTime = submission.creationTimeSeconds * 1000;
              const problemData = {
                id: `${submission.problem.contestId}-${submission.problem.index}-${submission.creationTimeSeconds}`,
                name: submission.problem.name,
                time: submissionTime,
                rating: submission.problem.rating,
                tags: submission.problem.tags || []
              };
              // Build rating mapping.
              if (!solvedByRating[rating]) {
                solvedByRating[rating] = [];
              }
              solvedByRating[rating].push(problemData);
              // Build topic mapping.
              problemData.tags.forEach((tag) => {
                if (!solvedByTopic[tag]) {
                  solvedByTopic[tag] = [];
                }
                solvedByTopic[tag].push(problemData);
              });
            }
          });
          setSolvedProblems(solvedByRating);
          setTopicProblems(solvedByTopic);
          // Set default rating if not already set
          const sortedRatings = Object.keys(solvedByRating).sort((a, b) => a - b);
          if (!selectedRating && sortedRatings.length > 0) {
            setSelectedRating(sortedRatings[0]);
          }
        }
      });
  }, [handle, selectedRating]);

  return (
    <HeroContext.Provider
      value={{
        userInfo,
        solvedProblems,
        topicProblems,
        selectedRating,
        setSelectedRating,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        sortOrder,
        setSortOrder,
        handle,
        showDateInputs,
        setShowDateInputs
      }}
    >
      <div className="min-h-screen bg-cf-dark p-6">
        <nav className="bg-cf-dark border-b border-cf-gray p-4 flex justify-between">
          <Link to="/" className="text-cf-blue font-bold text-xl hover:text-cf-link">
            CF Stalker
          </Link>
        </nav>
        <Outlet />
      </div>
    </HeroContext.Provider>
  );
}

export default HeroLayout;
