
// THIS IS THE FIRST BUTTON CLICK
const letsStartSorting = () => {
    document.querySelector("#sortButton").addEventListener("click", sortingForm);
};
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = textToPrint;
};
// THIS PRINTS THE INPUT BOX
const sortingForm = () => {
    let domString = `<form id="student-card">
                          <h2>Enter First Year's Name:</h2>
                          <div class="form-inline">
                              <div class="col-auto">
                                  <label class="sr-only" for="inlineFormInput">Name</label>
                                  <input type="text" class="form-control mb-2 clear" id="FormInput" placeholder="Harry Potter" required>
                              </div>
                              <div class="col-auto id="sort-buttondiv">
                                <button type="submit" class="btn btn-primary mb-2" id="sort-button">Sort!</button>
                                </div>
                          </div>
                      </form>`;
    printToDom("#nameForm", domString);
    buttonEvents();

};

// THIS SORTS THE ARRAY (IN PROGRESS, NOT WORKING)

const SortByName = (myArray) => {
    myArray.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
}
// THIS CAPTURES THE STUDENT INPUT
let studentInput = [];

const getStudentName = (e) => {
    e.preventDefault();

    let buttonId = e.target.id;
    if (buttonId === "sort-button") {
        const name = document.querySelector("#FormInput").value;

        //Below is Some validation:
        const found = studentInput.some(el => el.studentName === name);
        if (name != "" && !found) {
            let studentObject = { studentName: name, house: randomizer() };
            document.querySelector("#FormInput").value = "";
            studentInput.push(studentObject);

        } else {
            let validation = `<div id="validation">
            Hi there and greetings! You have either entered a duplicate or tried to enter nothing. Neither will do!
            </div>`;
            let inputDiv = document.getElementById('validationDiv');

            inputDiv.innerHTML = validation;
            setTimeout(function () {
                inputDiv.innerHTML = '';
            }, 2200);


        }

        houseCards();
    }
};


// THIS HOLDS BUTTON EVENTS
const buttonEvents = () => {
    document.querySelector("#nameForm").addEventListener("click", getStudentName);
    //document.querySelector("#cardSection").addEventListener("click", houseCards);
    document.querySelector('#cardSection').addEventListener("click", expelStudent);

};

// THIS SPITS OUT A RANDOM HOUSE
const randomizer = () => {
    const houseArray = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    let randomHouse = houseArray[Math.floor(Math.random() * houseArray.length)];
    return randomHouse;
};

// THIS PRINTS THE CARDS
const houseCards = () => {

    let cardString = "";

    for (let i = 0; i < studentInput.length; i++) {
        let classSelector = studentInput[i].house.toLowerCase();
        cardString += `<div class="card ${classSelector}" style="width: 18rem;">
            <img src="images/${studentInput[i].house}.png" class="card-img-top" alt = "${studentInput[i].house}" >
                <div class="card-body">
                    <h2 class="card-title">${studentInput[i].house}</h2>
                    <h3 id="studentsNameCard">${studentInput[i].studentName}</h3>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button type="submit" class="btn btn-primary mb-2" id="${i}"> EXPEL! </button>
                </div>
                      </div > `;
    }

    printToDom("#cardSection", cardString);
};

const expelStudent = (e) => {
    e.preventDefault();
    const ctype = e.target.type;
    const target = e.target.id;
    if (ctype === 'submit') {
        studentInput.splice(e.target.id, 1);
        houseCards();
    }

}
const init = () => {
    letsStartSorting();
};
init();