import React, {useState, useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questions => setQuestions(questions))
  }, [])

  // function handleNewQuestion(newQuestion) {
  //   setQuestions([...questions, newQuestion])
  // }

  function handleUpdate(updatedCorrectIndex) {
    const updatedQuestions = questions.map(question => {
      if(question.correctIndex === updatedCorrectIndex) {
        return updatedCorrectIndex
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  function handleDelete(deletedQuestion) {
    const updatedItems = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedItems)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => {
          return (
            <QuestionItem
              onQuestionUpdate={handleUpdate}
              onDeleteQuestion={handleDelete}
              key={question.id}
              question={question}
            />
          )
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
