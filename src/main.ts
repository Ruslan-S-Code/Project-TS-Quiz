type Choices = string[] | boolean[] | number[];

type QuizItem = {
  url: string;
  question: string;
  choices: Choices;
  answer: string | boolean | number;
};

const mediumQuestions: QuizItem[] = [
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4a864049-816a-479e-8736-51740e8b724b.jpg",
    question: "Which ocean lies on the east coast of the United States?",
    choices: ["Eastern", "Pacific", "Indian", "Atlantic"],
    answer: "Atlantic",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4d101ba1-9275-4fb5-ba2c-5606e6c0274e.jpg",
    question: "Which is the world's highest mountain?",
    choices: ["K2", "Makalu", "Mount Everest", "Kilimanjaro"],
    answer: "Mount Everest",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/07121a24-b34b-4711-9bfa-5287163e65ce.jpg",
    question: "Which of these cities is not in Europe?",
    choices: ["Prague", "Moscow", "Barcelona", "Reykjavik"],
    answer: "Moscow",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/467a486b-be3a-4183-90ed-dd6867d5852d.jpg",
    question: "True or False: Iceland is covered in ice.",
    choices: [true, false],
    answer: false,
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
    question: "The United Kingdom is comprised of how many countries?",
    choices: [1, 2, 3, 4],
    answer: 4,
  },
];

// Проверка существования DOM-элемента
function assertExists<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value == null) {
    throw new Error(message);
  }
}

// Получаем элемент div с id="content"
const contentDiv = document.getElementById("content");
assertExists(contentDiv, 'Element with id="content" not found.');

// Функция для отображения викторины
function displayQuiz(questions: QuizItem[]) {
  assertExists(contentDiv, 'Element with id="content" not found.');
  questions.forEach((item, index) => {
    const questionContainer = document.createElement("div");
    questionContainer.className =
      "quiz-item bg-white shadow-md rounded-lg p-6 mb-6";

    // Добавляем изображение
    const image = document.createElement("img");
    image.src = item.url;
    image.alt = `Question ${index + 1}`;
    image.className = "rounded-lg w-full mb-4";
    questionContainer.appendChild(image);

    // Добавляем текст вопроса
    const questionText = document.createElement("h2");
    questionText.textContent = `${index + 1}. ${item.question}`;
    questionText.className = "text-xl font-semibold mb-4 text-center";
    questionContainer.appendChild(questionText);

    // Добавляем варианты ответа
    const choicesList = document.createElement("ul");
    choicesList.className =
      "flex flex-row justify-center items-center space-x-4";

    item.choices.forEach((choice) => {
      const listItem = document.createElement("li");

      const button = document.createElement("button");
      button.textContent = choice.toString();
      button.className =
        "w-full  px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition";
      button.addEventListener("click", () => {
        if (choice === item.answer) {
          alert("Correct ✅!");
        } else {
          alert("Wrong answer ❌.");
        }
      });

      listItem.appendChild(button);
      choicesList.appendChild(listItem);
    });

    questionContainer.appendChild(choicesList);

    // Добавляем вопрос в основной контейнер
    contentDiv.appendChild(questionContainer);
  });
}

// Вызываем функцию для отображения викторины
displayQuiz(mediumQuestions);
