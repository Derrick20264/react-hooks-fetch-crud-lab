import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""), 10);
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
        .then((data) => onAddQuestion(data));
       onAddQuestion(newQuestion);
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit} data-testid="question-form">
        <label>
          Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        <label>
          Answer 1:
          <input type="text" name="answer0" value={formData.answers[0]} onChange={handleChange} />
        </label>
        <label>
          Answer 2:
          <input type="text" name="answer1" value={formData.answers[1]} onChange={handleChange} />
        </label>
        <label>
          Answer 3:
          <input type="text" name="answer2" value={formData.answers[2]} onChange={handleChange} />
        </label>
        <label>
          Answer 4:
          <input type="text" name="answer3" value={formData.answers[3]} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {`Answer ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
