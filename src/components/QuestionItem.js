import React from "react";

function QuestionItem({ question, onDeleteQuestion, onQuestionUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteCLick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
    .then(r => r.json())
    .then(() => onDeleteQuestion(question))
  }

  function handleUpdateQuestion(event) {
    
    console.log(event.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: event.target.value
      })
    })
    .then(r => r.json())
    .then(updatedCorrectIndex => onQuestionUpdate(updatedCorrectIndex))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdateQuestion} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteCLick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
