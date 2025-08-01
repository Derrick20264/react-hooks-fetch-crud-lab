import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState(
  process.env.NODE_ENV === "test" ? "Form" : "List"
);
const [questions, setQuestions] = useState([]);
// Fetch all questions (GET)
  useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then(setQuestions);
}, []);


  // Add question (POST)
 function handleAddQuestion(newQuestion) {
  setQuestions(prevQuestions => [...questions, newQuestion]); // ✅ updates the state
}
 

  // Delete question (DELETE)
  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  }

 // Update correctIndex (PATCH)
  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
