import React, { useContext } from 'react';
import { HeroContext } from './HeroLayout';
import { Link } from 'react-router-dom';

function Hero() {
  const {
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
    setSortOrder
  } = useContext(HeroContext);

  const filterByDate = (problems) => {
    if (!fromDate || !toDate) return problems;
    const fromTimestamp = new Date(fromDate).getTime();
    const toTimestamp = new Date(toDate).getTime();
    return problems.filter(problem => problem.time >= fromTimestamp && problem.time <= toTimestamp);
  };

  const sortProblems = (problems) => {
    return [...problems].sort((a, b) =>
      sortOrder === 'asc' ? a.time - b.time : b.time - a.time
    );
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cf-text">
        Loading...
      </div>
    );
  }

  const problemsToShow =
    selectedRating && solvedProblems[selectedRating]
      ? sortProblems(filterByDate(solvedProblems[selectedRating]))
      : [];

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* User Info Section */}
      <div className="bg-cf-gray rounded-lg p-6 shadow-cf text-center">
        <img src={userInfo.titlePhoto} alt="Avatar" className="w-24 h-24 mx-auto rounded-full mb-4" />
        <h1 className="text-3xl font-bold text-cf-blue">{userInfo.handle}</h1>
        <p className="text-cf-text">{userInfo.rank} ({userInfo.rating})</p>
        <p className="text-cf-text">Max: {userInfo.maxRank} ({userInfo.maxRating})</p>
      </div>

      {/* Solved Problems by Rating Section */}
      <div className="bg-cf-gray rounded-lg p-6 shadow-cf mt-8">
        <h2 className="text-2xl font-bold text-cf-blue mb-4">Solved Problems by Rating</h2>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {Object.keys(solvedProblems)
            .sort((a, b) => a - b)
            .map((rating) => (
              <button 
                key={rating} 
                className={`px-4 py-2 rounded ${selectedRating === rating ? 'bg-cf-blue text-white' : 'bg-cf-dark text-cf-text'} hover:bg-opacity-90 transition-colors`}
                onClick={() => setSelectedRating(rating)}
              >
                {rating}
              </button>
            ))}
        </div>

        <button
          className="mb-4 px-4 py-2 bg-cf-blue text-white rounded hover:bg-opacity-90 transition-colors"
          onClick={() => {}}
        >
          Select Date Range
        </button>

        {/* Date inputs (they remain visible if already set; adjust as desired) */}
        {(fromDate || toDate) && (
          <div className="mb-4 flex space-x-4">
            <input 
              type="date" 
              value={fromDate} 
              onChange={(e) => setFromDate(e.target.value)} 
              className="px-4 py-2 border rounded bg-cf-dark text-cf-text" 
            />
            <input 
              type="date" 
              value={toDate} 
              onChange={(e) => setToDate(e.target.value)} 
              className="px-4 py-2 border rounded bg-cf-dark text-cf-text" 
            />
          </div>
        )}

        <div className="mb-4">
          <label className="text-cf-text mr-2">Sort by Date:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)} 
            className="px-4 py-2 border rounded bg-cf-dark text-cf-text"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-cf-text">
                <th className="px-4 py-2 border border-cf-gray">#</th>
                <th className="px-4 py-2 border border-cf-gray">Problem</th>
              </tr>
            </thead>
            <tbody>
              {problemsToShow.length > 0 ? (
                problemsToShow.map((problem, index) => (
                  <tr key={problem.id} className="hover:bg-gray-600 text-cf-text">
                    <td className="px-4 py-2 border border-cf-gray">{index + 1}</td>
                    <td className="px-4 py-2 border border-cf-gray">
                      <a 
                        href={`https://codeforces.com/problemset/problem/${problem.id.split('-')[0]}/${problem.id.split('-')[1]}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cf-blue hover:underline"
                      >
                        {problem.name}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-2 text-center text-cf-text">
                    No problems found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Topics List Section */}
      <div className="bg-cf-gray rounded-lg p-6 shadow-cf mt-8">
        <h2 className="text-2xl font-bold text-cf-blue mb-4">Solved Problems by Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topicProblems &&
            Object.keys(topicProblems)
              .sort()
              .map((topic) => (
                <div key={topic} className="bg-cf-dark p-4 rounded text-center">
                  <Link
                    to={`topic/${topic}`}
                    className="text-cf-blue font-bold hover:underline"
                  >
                    {topic}
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
