
"use client";

import { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, push, set, get } from "firebase/database";

export default function QuizCreator() {

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("Option A");

  const [questions, setQuestions] = useState([]);

  // Fetch questions from Firebase
  async function fetchQuestions() {
    try {
      const dbRef = ref(database, "quizQuestions");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const questionList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));

        setQuestions(questionList);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch questions when page loads
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Save question to Firebase
  async function saveQuestion(e) {
    e.preventDefault();

    if (!question || !optionA || !optionB || !optionC || !optionD) {
      alert("Please fill all fields");
      return;
    }

    const questionData = {
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctAnswer: correctAnswer
    };

    try {
      const dbRef = ref(database, "quizQuestions");
      const newQuestionRef = push(dbRef);

      await set(newQuestionRef, questionData);

      alert("Question saved successfully!");

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("Option A");

      fetchQuestions();

    } catch (error) {
      console.log(error);
      alert("Error saving question");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Quiz Creator
        </h1>

        <form onSubmit={saveQuestion}>

          <label className="block font-semibold mb-2">
            Question
          </label>

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block font-semibold mb-2">
            Option A
          </label>

          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            placeholder="Enter option A"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block font-semibold mb-2">
            Option B
          </label>

          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            placeholder="Enter option B"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block font-semibold mb-2">
            Option C
          </label>

          <input
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            placeholder="Enter option C"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block font-semibold mb-2">
            Option D
          </label>

          <input
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            placeholder="Enter option D"
            className="w-full border p-3 rounded mb-4"
          />

          <label className="block font-semibold mb-2">
            Correct Answer
          </label>

          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full border p-3 rounded mb-5"
          >
            <option>Option A</option>
            <option>Option B</option>
            <option>Option C</option>
            <option>Option D</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
          >
            Save Question
          </button>

        </form>

      </div>

      {/* Display Saved Questions */}

      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-5">
          Saved Questions
        </h2>

        {questions.length === 0 ? (
          <p>No questions saved yet.</p>
        ) : (
          questions.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded mb-4"
            >

              <h3 className="font-bold text-lg mb-3">
                {item.question}
              </h3>

              <p>Option A: {item.optionA}</p>
              <p>Option B: {item.optionB}</p>
              <p>Option C: {item.optionC}</p>
              <p>Option D: {item.optionD}</p>

              <p className="text-green-600 font-bold mt-3">
                Correct Answer: {item.correctAnswer}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}
