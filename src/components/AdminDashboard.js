import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;  // Flag to check if the component is still mounted

    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {  // Only update state if still mounted
          setQuestions(data);
        }
      })
      .catch((error) => console.error('Error fetching questions:', error));

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);  // Empty dependency array to run this effect once

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render questions only if questions are available */}
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.id}>{question.prompt}</li>
          ))
        ) : (
          <li>No questions available</li>
        )}
      </ul>
    </div>
  );
}

export default AdminDashboard;
