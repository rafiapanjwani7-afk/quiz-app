/*----js quiz app----*/
function signup() {
    var name = document.getElementById("signName").value.trim();
    var email = document.getElementById("signEmail").value.trim();
    var password = document.getElementById("signPassword").value.trim();
    var users = JSON.parse(localStorage.getItem("userdata"));
    if (!users) {
        users = [];
    }
    if (name === "" || email === "" || password === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please enter email and password"
        });
        return;
    }
    if (password.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Short Password",
            text: "Password must be at least 6 characters."
        });

        return;
    }
    var exist = false;

    for (var user of users) {
        if (user.email === email) {
            exist = true;
            break;
        }
    }

    if (exist) {
        Swal.fire({
            icon: "warning",
            title: "Already Exists",
            text: "This email is already registered!"
        });
        return;
    }
    var userdata = {
        name: name,
        email: email,
        password: password
    }
    users.push(userdata)
    localStorage.setItem("userdata", JSON.stringify(users));
    Swal.fire("Success", "Signup successful!", "success");
    console.log(userdata);
    window.location.href = "login.html";

}

function login() {

    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value.trim();

    var users = JSON.parse(localStorage.getItem("userdata"));
    if (!users) {
        users = [];
    }

    if (email === "" || password === "") {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please enter email and password"
        });
        return;
    }
    var userData = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (userData) {

        localStorage.setItem("currentUser", JSON.stringify(userData));

        Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back " + userData.name
        }).then(() => {
            window.location.href = "quiz.html";
        });

    } else {
        Swal.fire({
            icon: "error",
            title: "Invalid Login",
            text: "Email or password is incorrect"
        });
    }
}
function logout() {
    localStorage.removeItem("currentUser");
    Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "No, stay logged in",
       background: "#0f172a",
    color: "#ffffff",
    confirmButtonColor: "#ffcc00",
    cancelButtonColor: "#ff3b3b",
    showCancelButton: true
    }).then(() => {
        window.location.href = "login.html";
    });
}
var QuizData = [{
    question: "Q1: Which of these is NOT a primitive data type in JavaScript?",
    Option1: "String",
    Option2: "Boolean",
    Option3: "Array",
    Option4: "undefined",
    Answer: "Array",
}, {
    question: "Q2:Which symbol is used for single-line comments in JavaScript?",
    Option1: "//",
    Option2: "##",
    Option3: "*/",
    Option4: "<--",
    Answer: "//",
}, {
    question: "Q3:What is the primary purpose of console.log in JavaScript?",
    Option1: "To display alert",
    Option2: "To output message to the console",
    Option3: "To creat HTML element",
    Option4: "To handle events",
    Answer: "To output message to the console",
}, {
    question: "Q4: Which of the following is not a JavaScript data type?",
    Option1: "Undefined",
    Option2: "Boolean",
    Option3: "String",
    Option4: "Character",
    Answer: "Character",
},
{
    question: "Q5:What is the primary purpose of the 'Hello World' program in JavaScript?",
    Option1: "To display a greeting message",
    Option2: " To perform calculations",
    Option3: " To create variables",
    Option4: "To define functions",
    Answer: "To display a greeting message",
}, {
    question: "Q6:Which of the following can be logged using console.log?",
    Option1: "Numbers",
    Option2: "Strings",
    Option3: "Objects",
    Option4: "ALL of the above",
    Answer: "ALL of the above",
}, {
    question: "Q7: How do you create a multi-line comment in JavaScript?",
    Option1: "// comment",
    Option2: "<--comment-->",
    Option3: "/* comment */",
    Option4: "# comment",
    Answer: "/* comment */",
}, {
    question: "Q8:How do you view the output of console.log?",
    Option1: "In the browser alert",
    Option2: "In the console panel of developer tools",
    Option3: "On the webpage",
    Option4: "In an external file",
    Answer: "In the console panel of developer tools",
}, {
    question: "Q9: What will the following JavaScript code output: console.log('Hello World!');?",
    Option1: "Hello",
    Option2: "World",
    Option3: "Hello World!",
    Option4: "undefined",
    Answer: "Hello World!",
}, {
    question: "Q10:Which HTML tag is commonly used to include JavaScript code directly in a webpage?",
    Option1: "script",
    Option2: "js",
    Option3: "javascript",
    Option4: "code",
    Answer: "script",
}]
var index = 0;
var score = 0;
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
function displayContainer() {
    document.getElementById("displayCard").style.display = "block";
    document.getElementById("displayCard").innerHTML = `<div  id="quizContainer">
     <div class="quiz-card mb-4" id="displayArea">
                    <h3 class="fw-bold mb-4">${QuizData[index].question}</h3>
                    <div class="options-group">
                        <label class="option-label">
                            <input type="radio" name="option" value="${QuizData[index].Option1}">
                            <span>${QuizData[index].Option1}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="option" value="${QuizData[index].Option2}">
                            <span>${QuizData[index].Option2}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="option" value="${QuizData[index].Option3}">
                            <span>${QuizData[index].Option3}</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="option"value="${QuizData[index].Option4}">
                            <span>${QuizData[index].Option4}</span>
                        </label>
                    </div>
                </div>

                <div class="d-flex justify-content-between mt-1">
                    <button class="btn  PreviousBtn" onclick="previousQuiz()"> Previous</button>
                    <button class="btn NextBtn " id="nextBtn" onclick="nextQuiz()">Next </button>
                </div>
            </div>`
    if (index === QuizData.length - 1) {
        var nextBtn = document.getElementById("nextBtn");
        nextBtn.innerHTML = "Submit";
        nextBtn.classList.add("btn-danger");
    }
} displayContainer()
function nextQuiz() {
    var option = document.getElementsByName("option");
    var selectOpt = false;
    for (var i = 0; i < option.length; i++) {
        if (option[i].checked) {
            selectOpt = true;
            if (option[i].value === QuizData[index].Answer) {
                score++;

            }
        }
    }
    var percentage = (score / QuizData.length) * 100;

    if (!selectOpt) {
        Swal.fire({
            title: "incomplete",
            text: "Please select an option.",
            icon: "warning",
            confirmButtonText: "Got it!",
            background: "#38286e",
            color: "#fff",
            confirmButtonColor: "#ff6a88",
        });
        return;
    }
    if (index < QuizData.length - 1) {
        index++;
        displayContainer()
    } else {
        var percentage = (score / QuizData.length) * 100;
        if (percentage < 50) {
            Swal.fire({
                title: "you are failed!",
                text: "Sorry! " + currentUser.name + ", you are failed.",
                html: "Your score is: " + score + "/" + QuizData.length + "<br>Percentage: " + percentage.toFixed(2) + "%",
                icon: "error",
                confirmButtonText: "Restart Quiz",
                background: "#0f172a",
                color: "#ffffff",

                confirmButtonColor: "#ff3b3",
                confirmButtonText: "Continue",
            }).then(() => {
                index = 0;
                score = 0;
                document.getElementById("displayCard").style.display = "block";
                displayContainer();
            });
        } else {
            Swal.fire({
                title: "Quiz Completed!",
                text: "Congratulations! " + currentUser.name + ", you are passed.",
                html: "Your score is: " + score + "/" + QuizData.length + "<br>Percentage: " + percentage.toFixed(2) + "%",
                icon: "success",
                confirmButtonText: "Restart Quiz",
                background: "#0f172a",   // dark navy background
                color: "#ffffff",

                confirmButtonColor: "#00c6ff",
                confirmButtonText: "Continue",

                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                },
            }).then(() => {
                index = 0;
                score = 0;
                document.getElementById("displayCard").style.display = "block";
                displayContainer();
            });
        }
    }
}
function previousQuiz() {
    if (index > 0) {
        index--;
        displayContainer()
    }
}
