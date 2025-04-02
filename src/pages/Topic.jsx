// Topic.jsx
import React, { useContext, useState, useEffect } from 'react';
import { HeroContext } from './HeroLayout';
import { useParams, Link } from 'react-router-dom';

function Topic() {
  const { topic } = useParams();
  const {
    topicProblems,
    handle
  } = useContext(HeroContext);
  const [problems, setProblems] = useState([]);
  const [activeSort, setActiveSort] = useState("date"); // "date" or "rating"
  const [dateSortOrder, setDateSortOrder] = useState("desc");
  const [ratingSortOrder, setRatingSortOrder] = useState("desc");

  useEffect(() => {
    if (topicProblems[topic]) {
      setProblems(topicProblems[topic]);
    }
  }, [topic, topicProblems]);

  const sortProblems = (problems) => {
    return [...problems].sort((a, b) => {
      if (activeSort === "date") {
        return dateSortOrder === "asc" ? a.time - b.time : b.time - a.time;
      } else {
        return ratingSortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
    });
  };

  const sortedProblems = sortProblems(problems);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-cf-gray rounded-lg p-6 shadow-cf">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cf-blue">
          Problems for Topic: {topic}
        </h2>
        <Link 
          to={`/hero/${handle}`} 
          className="text-cf-blue hover:underline"
        >
          Back to Hero
        </Link>
      </div>
      {/* ... rest remains the same ... */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="text-cf-text">Sort By:</label>
        <select
          value={activeSort}
          onChange={(e) => setActiveSort(e.target.value)}
          className="px-4 py-2 border rounded bg-cf-dark text-cf-text"
        >
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
        {activeSort === "date" ? (
          <select
            value={dateSortOrder}
            onChange={(e) => setDateSortOrder(e.target.value)}
            className="px-4 py-2 border rounded bg-cf-dark text-cf-text"
          >
            <option value="asc">Date Ascending</option>
            <option value="desc">Date Descending</option>
          </select>
        ) : (
          <select
            value={ratingSortOrder}
            onChange={(e) => setRatingSortOrder(e.target.value)}
            className="px-4 py-2 border rounded bg-cf-dark text-cf-text"
          >
            <option value="asc">Rating Ascending</option>
            <option value="desc">Rating Descending</option>
          </select>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-cf-text">
              <th className="px-4 py-2 border border-cf-gray">#</th>
              <th className="px-4 py-2 border border-cf-gray">Problem</th>
              <th className="px-4 py-2 border border-cf-gray">Rating</th>
              <th className="px-4 py-2 border border-cf-gray">Solved Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedProblems.length > 0 ? (
              sortedProblems.map((problem, index) => (
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
                  <td className="px-4 py-2 border border-cf-gray">
                    {problem.rating || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border border-cf-gray">
                    {new Date(problem.time).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-cf-text">
                  No problems found for this topic.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Topic;
