function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  }).then(() => onDeleteQuestion(id));
}

function handleSelectChange(e) {
  const updatedIndex = parseInt(e.target.value);

  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: updatedIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
}



  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
  value={question.correctIndex}
  onChange={handleSelectChange}
>
  {question.answers.map((answer, index) => (
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