"use strict";

let pickWord = () => {
        let words = [
            "автор",
            "абзац",
            "аудитория",
            "балл",
            "беседа",
            "библиотека",
            "борьба",
            "гимнастика",
            "вариант",
            "баскетбол",
            "век",
            "бильярд",
            "шахматы",
            "вопрос",
            "внимание",
            "время",
            "выбор",
            "выпускник",
            "газета",
            "город",
            "государство",
            "грамматика",
            "афиша",
            "диалог",
            "персонаж",
            "сериал",
            "диктант",
            "задание",
            "закон",
            "замена",
            "занятие",
            "фильм",
            "информация",
            "значение",
            "книга",
            "каникулы",
            "культура",
            "литература",
            "общество",
            "наука",
            "техника",
            "ошибка",
            "экранизация",
            "оформление",
            "память",
            "перевод",
            "пример",
            "рассказ",
            "собрание",
            "таблица",
            "упражнение",
            "язык",
            "оценка",
            "экзамен",
            "перец",
            "учебник",
            "журналист",
            "грузчик",
            "инженер",
            "композитор",
            "юрист",
            "программист",
            "электрик",
            "аналитик",
            "консультант",
            "врач",
            "чай",
            "вода",
            "сок",
            "какао",
            "кофе",
            "компот",
            "морс",
            "коктейль",
            "молоко",
            "квас",
            "неделя",
            "понедельник",
            "вторник",
            "среда",
            "четверг",
            "пятница",
            "суббота",
            "воскресенье",
            "тарелка",
            "ложка",
            "вилка",
            "зеркало",
            "кресло",
            "лампа",
            "розетка",
            "кровать",
            "аристократ",
            "приветствие",
            "метро",
            "виртуоз",
            "музыка",
            "балалайка",
            "песня",
            "нота",
            "ковёр"
        ];

        return words[Math.floor(Math.random() * words.length)];
    };

    let setupAnswerArray = (word) => {
        let answerArray = [];
        for (let i = 0; i < word.length; i++) {
            answerArray[i] = "_";
            ctx.lineWidth = 5;
            drawLetterPlace();
            numberOfLetterArray.push(i + 1);
        }
        return answerArray;
    };

    let showPlayerProgress = (answerArray) => {
        alert(answerArray.join(" "));
        alert("У вас осталось: " + triesCounter + " попыток.");
    };

    let getGuess = () => {
        return prompt("Попробуйте угадать букву или нажмите Отмена для выхода из игры.", "");
    };

    let updateGameState = (guess, word, answerArray) => {
        let correctLetter = 0;
        for (let j = 0; j < word.length; j++) {
            if (word.indexOf(guess) === -1) {
                alert("Буквы: " + guess + " нет в этом слове.");
                drawHangman();
                ctx.lineWidth = 5;
                drawWrongLetter(guess);
                break;
            } else if (word[j] === guess && answerArray[j] === "_") {
                answerArray[j] = guess;
                drawLetter(guess, j);
                correctLetter++;
            } else if (answerArray[j] === guess) {
                alert("Вы уже писали букву " + guess + ".");
                break;
            }
        }

        return correctLetter;
    };

    let showCorrectAnswerAndAnswerForPlayer = (answerArray) => {
        if (cancel) {
            alert("Вы вышли из игры.");
            alert("Правильный ответ: " + word + ".");
        } else if (triesCounter > 0) {
            alert(answerArray.join(" "));
            alert("Поздравляем, Вы победили!");
        } else {
            alert(answerArray.join(" "));
            alert("Правильный ответ: " + word + ".");
            alert("К сожалению, Вы проиграли.")
        }

        alert("Для возобновления игры нажмите клавишу F5 или обновите страницу вручную.")
    };

    let moveLine = (moveX, moveY) => {
        ctx.moveTo(moveX, moveY);
    };

    let drawLine = (moveX, moveY, lineX, lineY) => {
        ctx.beginPath();
        moveLine(moveX, moveY);
        ctx.lineTo(lineX, lineY);
        ctx.stroke();
    };

    let drawCircle = (x, y, radius) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.stroke();

    };

    let drawHangman = () => {
        triesCounter--;
        ctx.lineWidth = 10;

        if (triesCounter === 10) {
            drawLine(150, 780, 275, 659);
        } else if (triesCounter === 9) {
            drawLine(275, 652, 400, 780);
        } else if (triesCounter === 8) {
            drawLine(278, 659, 278, 110);
        } else if (triesCounter === 7) {
            drawLine(273, 110, 705, 110);
        } else if (triesCounter === 6) {
            drawLine(700, 110, 700, 200);
        } else if (triesCounter === 5) {
            drawCircle(700, 240, 40);
            ctx.lineWidth = 5;
            drawLine(685, 260, 715, 260);
            drawCircle(685, 232.5, 5);
            drawCircle(715, 232.5, 5);
        } else if (triesCounter === 4) {
            drawLine(700, 280, 700, 424);
        } else if (triesCounter === 3) {
            drawLine(700, 300, 650, 380);
        } else if (triesCounter === 2) {
            drawLine(700, 300, 750, 380);
        } else  if (triesCounter === 1){
            drawLine(701, 422, 650, 500);
        } else {
            drawLine(698, 422, 750, 500);
            ctx.lineWidth = 5;
            ctx.clearRect(675, 225, 50, 20);
            drawLine(675, 225, 695, 240);
            drawLine(695, 225, 675, 240);
            drawLine(725, 225, 705, 240);
            drawLine(705, 225, 725, 240);
        }
    };

    let drawLetterPlace = () => {
        drawLine(letterPlaceMoveX, letterPlaceY, letterPlaceLineX, letterPlaceY);
        letterPlaceMoveX += 40;
        letterPlaceLineX += 40;
    };

    let drawLetter = (guess, j) => {
        ctx.font = "50px Courier";
        ctx.textBaseline = "bottom";
        ctx.fillText(guess, letterX + 40 * numberOfLetterArray[j], letterY);
    };

    let drawWrongLetter = (guess) => {
        if (triesCounter === 4) {
            wrongLetterX += 80;
            wrongLetterY = 110;
        }

        wrongLetterY += 70;
        ctx.font = "50px Courier";
        ctx.textBaseline = "middle";
        ctx.fillText(guess, wrongLetterX, wrongLetterY);
        drawLine(wrongLetterX, wrongLetterY + 3, wrongLetterX + 30, wrongLetterY + 3);

    };

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let letterPlaceMoveX = 820;
    let letterPlaceLineX = 850;
    let letterPlaceY = 143;
    let letterX = 780;
    let letterY = 139;
    let wrongLetterX = 820;
    let wrongLetterY = 110;
    let word = pickWord();
    let numberOfLetterArray = [];
    let answerArray = setupAnswerArray(word);
    let remainingLetters = word.length;
    let triesCounter = 11;
    let cancel = null;

    while (remainingLetters > 0 && triesCounter > 0) {
        showPlayerProgress(answerArray);

        let guess = getGuess();

        if (guess !== null) {
            guess = guess.toLowerCase();
        }

        if (guess === null) {
            cancel = true;
            break;
        } else if (guess.length !== 1) {
            alert("Пожалуйста, введите одиночную букву.");
        } else {
            let correctGuesses = updateGameState(guess, word, answerArray);
            remainingLetters -= correctGuesses;
        }
    }

    showCorrectAnswerAndAnswerForPlayer(answerArray);