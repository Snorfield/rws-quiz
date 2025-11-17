let questionNumber = -1;
let quizUser = null;

let users = [
    { name: "Garfield", answers: [0, 0, 0, 1, 2, 0, 0, 1, 0, 0], score: 0 },
    { name: "Rayne", answers: [0, 1, 1, 0, 0, 2, 1, 0, 0, 0], score: 0 },
    { name: "Brass_Glass", answers: [0, 0, 0, 0, 5, 0, 0, 2, 0, 0], score: 0 },
    { name: "Kat", answers: [0, 0, 2, 1, 1, 2, 0, 0, 0, 1], score: 0 },
    { name: "Tally", answers: [0, 0, 0, 1, 0, 2, 1, 0, 0, 0], score: 0 },
    { name: "Pix", answers: [1, 1, 1, 0, 5, 2, 0, 0, 1, 1], score: 0 },
    { name: "Shock59", answers: [1, 0, 0, 2, 0, 2, 1, 0, 0, 0], score: 0 },
    { name: "Mov", answers: [0, 0, 2, 0, 0, 0, 0, 3, 0, 1], score: 0 },
    { name: "Tuggah", answers: [1, 0, 0, 0, 5, 2, 0, 0, 0, 0], score: 0 },
    { name: "Sophi", answers: [0, 0, 1, 1, 5, 2, 0, 0, 0, 0], score: 0 },
    { name: "ddededodediamante", answers: [0, 0, 1, 1, 0, 2, 0, 2, 1, 0], score: 0 },
    { name: "peanutbutter_stuff", answers: [0, 1, 1, 0, 5, 0, 3, 2, 0, 0], score: 0 },
    { name: "Skribble", answers: [0, 0, 1, 0, 0, 0, 3, 2, 0, 0], score: 0 },
    { name: "JustASeaCow", answers: [0, 0, 1, 1, 3, 2, 0, 0, 0, 0], score: 0 }
];


const questions = [
    { query: "Do you like Geometry Dash?", answers: ["Yes", "No"] },
    { query: "Do you play Minecraft?", answers: ["Yes", "No"] },
    { query: "Do you prefer savory or sweet food?", answers: ["Savory", "Sweet", "Both"] },
    { query: "Are you an artist?", answers: ["Yes", "Sometimes","No"] },
    { query: "What is your favorite programming language?", answers: ["TypeScript/JavaScript", "Java", "GLSL", "Rust", "C/C++", "Other"] },
    { query: "What religion are you from?", answers: ["Christianity", "Islam", "Atheism/Agnostic"] }, 
    { query: "What operating system is installed on your main computer?", answers: ["Windows", "Linux", "macOS", "Other"] },
    { query: "Are you more right leaning or left leaning?", answers: ["Left", "Right", "Unspecified", "Centrist"] },
    { query: "Do you listen to music?", answers: ["Yes", "Sometimes", "No"] },
    { query: "Are you in Scratch Coders?", answers: ["Yes", "No"] },
];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function handleNext() {

    let selected = document.querySelector('input[name="question"]:checked');

    if (selected) {
        let answer = selected.value;

        for (let user of users) {
            if (user.answers[questionNumber] == answer) {
                user.score++;
            }
        }

    }

    if (!selected && !(questionNumber > -1)) { 
        quizUser = dropdown.value;
    }

    if (!selected && questionNumber > -1) {
        return;
    } else {
        removeAllChildNodes(container);
        if (questionNumber < 0) { container.style.justifyContent = 'center' };
        questionNumber++;

        let question = questions[questionNumber];

        if (questionNumber > questions.length - 1) {
            let heading = document.createElement("h1");
            heading.classList.add("text");

            users.sort((a, b) => b.score - a.score);
            users = users.filter(user => user.name !== quizUser);

            heading.textContent = 'You are most like:';
            container.appendChild(heading)
            nextButton.remove();

            for (let i = 0; i < Math.min(5, users.length); i++) {
                let item = document.createElement("h2");
                item.classList.add("text");
                item.textContent = `${users[i].name} with ${users[i].score} similarities`;
                container.appendChild(item);
            }
        } else {
            let heading = document.createElement("h1");
            heading.classList.add("text");
            heading.textContent = question.query;
            container.appendChild(heading)


            let questionContainer = document.createElement('div');
            questionContainer.classList.add('questions');

            let index = 0;
            for (answer of question.answers) {
                let label = document.createElement("label")
                let radio = document.createElement("input");

                radio.type = "radio";
                radio.name = "question";
                radio.value = index;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(answer));
                questionContainer.appendChild(label);
                index++;
            }

            container.appendChild(questionContainer);
        }
    }
}

let dropdown = document.getElementById('dropdown');
let container = document.getElementById('container');
let nextButton = document.getElementById("next");

for (user of users) {
    let item = document.createElement("option");
    item.value = user.name;
    item.textContent = item.value;
    dropdown.appendChild(item);
}

nextButton.addEventListener("click", handleNext);