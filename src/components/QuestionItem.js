function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  }).then(() => onDeleteQuestion(id));
}

function handleCorrectAnswerChange(e) {
  const newIndex = parseInt(e.target.value, 10);
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: newIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
}


  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}
export default QuestionItem;