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
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
    question: "Which of the following countries do not border France?",
    choices: ["Germany", "Netherlands", "Spain", "Italy"],
    answer: "Netherlands",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/6e99b817-7be7-4f8a-9146-3f602ac81fad.jpg",
    question: "Which U.S. state is the Grand Canyon located in?",
    choices: ["Wyoming", "Arizona", "New Mexico", "Nevada"],
    answer: "Arizona",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/866f119d-e5e2-45ca-846c-b6d10a59d1e4.jpg",
    question: "Which is the smallest country, measured by total land area?",
    choices: ["Maldives", "Monaco", "Vatican"],
    answer: "Vatican",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/13efaf72-d695-4f65-b043-2b805b6a88eb.jpg",
    question: "Which is the longest river in the world?",
    choices: ["Amazon River", "Congo River", "Yellow River", "Nile River"],
    answer: "Nile River",
  },
  {
    url: "https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/1226f177-dc1a-4142-8875-bdaa177717d7.jpg",
    question: "Which is the largest body of water?",
    choices: ["indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Nile River"],
    answer: "Pacific Ocean",
  },
];

// Функция-ассертер: убеждаемся, что значение не null/undefined.
// После вызова этой функции TypeScript понимает, что value точно не null.
function assertExists<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value == null) {
    throw new Error(message);
  }
}

// Показываем финальное окно (модальное) с результатами после окончания викторины
function showFinalResults(correctCount: number, incorrectCount: number) {
  // Создаём полупрозрачный фон (бэкдроп)
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";

  // Контейнер для контента (белый блок)
  const modalContainer = document.createElement("div");
  modalContainer.className = "bg-white p-6 rounded shadow-md text-center w-80";

  // Заголовок
  const heading = document.createElement("h2");
  heading.className = "text-2xl font-bold mb-4";
  heading.textContent = "Die Endergebnisse";
  modalContainer.appendChild(heading);

  // Текст с подсчётом
  const textResults = document.createElement("p");
  textResults.className = "mb-4";
  textResults.textContent = `Richtig: ${correctCount} | Falsch: ${incorrectCount}`;
  modalContainer.appendChild(textResults);

  // Кнопка «Закрыть»
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Schließen";
  closeBtn.className =
    "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700";
  closeBtn.addEventListener("click", () => {
    // Удаляем оверлей при закрытии
    overlay.remove();
  });
  modalContainer.appendChild(closeBtn);

  // Собираем всё в документ
  overlay.appendChild(modalContainer);
  document.body.appendChild(overlay);
}

// Главная функция для отображения викторины
function displayQuiz(questions: QuizItem[]) {
  // Получаем контейнер div#content
  const contentDiv = document.getElementById("content");
  assertExists(contentDiv, 'Element with id="content" not found.');

  // Счётчики правильных/неправильных
  let correctCount = 0;
  let incorrectCount = 0;

  // Отдельный счёт, чтобы узнать, когда все вопросы отвечены
  let answeredQuestions = 0;
  const totalQuestions = questions.length;

  // Блок для отображения результатов во время ответов
  const resultDiv = document.createElement("div");
  resultDiv.className = "text-center mt-6 text-lg font-semibold";
  resultDiv.textContent = `Richtig: ${correctCount} | Falsch: ${incorrectCount}`;
  contentDiv.appendChild(resultDiv);

  // Генерируем список вопросов
  questions.forEach((item, index) => {
    // Контейнер одного вопроса
    const questionContainer = document.createElement("div");
    questionContainer.className =
      "quiz-item bg-white shadow-md rounded-lg p-6 mb-6";

    // Изображение
    const image = document.createElement("img");
    image.src = item.url;
    image.alt = `Question ${index + 1}`;
    image.className = "rounded-lg w-full mb-4";
    questionContainer.appendChild(image);

    // Текст вопроса
    const questionText = document.createElement("h2");
    questionText.textContent = `${index + 1}. ${item.question}`;
    questionText.className = "text-xl font-semibold mb-4 text-center";
    questionContainer.appendChild(questionText);

    // Контейнер для вариантов
    const choicesList = document.createElement("ul");
    choicesList.className =
      "flex flex-row flex-wrap justify-center items-center gap-4";

    let answered = false; // Флаг, что ответ на этот вопрос уже выбран
    const buttons: HTMLButtonElement[] = [];

    // Генерируем варианты ответов
    item.choices.forEach((choice) => {
      const listItem = document.createElement("li");

      const button = document.createElement("button");
      button.textContent = choice.toString();
      button.className =
        "px-6 py-3 bg-blue-500 text-white font-medium rounded-lg " +
        "shadow hover:bg-blue-700 focus:outline-none focus:ring-2 " +
        "focus:ring-blue-400 focus:ring-offset-2 transition";

      // Обработчик выбора варианта
      button.addEventListener("click", () => {
        if (answered) return; // Нельзя выбирать повторно
        answered = true;
        answeredQuestions++; // Ещё один вопрос отвечен

        // Проверяем правильность
        if (choice === item.answer) {
          button.classList.remove(
            "bg-blue-500",
            "hover:bg-blue-700",
            "focus:ring-blue-400"
          );
          button.classList.add("bg-green-500");
          correctCount++;
        } else {
          button.classList.remove(
            "bg-blue-500",
            "hover:bg-blue-700",
            "focus:ring-blue-400"
          );
          button.classList.add("bg-red-500");
          incorrectCount++;
        }

        // Обновляем счётчик «по ходу»
        resultDiv.textContent = `Richtig: ${correctCount} | Falsch: ${incorrectCount}`;

        // Отключаем все кнопки в текущем вопросе
        buttons.forEach((btn) => {
          btn.disabled = true;
        });

        // Если все вопросы отвечены, показываем итоговое окно
        if (answeredQuestions === totalQuestions) {
          showFinalResults(correctCount, incorrectCount);
        }
      });

      // Добавляем кнопку и li в список
      buttons.push(button);
      listItem.appendChild(button);
      choicesList.appendChild(listItem);
    });

    // Добавляем список ответов в контейнер вопроса
    questionContainer.appendChild(choicesList);
    // Добавляем вопрос в основной контейнер
    contentDiv.appendChild(questionContainer);
  });
}

// Запуск викторины
displayQuiz(mediumQuestions);
