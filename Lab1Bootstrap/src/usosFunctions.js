// Inicjalizacja danych
let students = [
    { name: "Jan Kowalski", subjects: [
            { name: "WDI", grades: [] },
            { name: "esum", grades: [] },
            { name: "JS", grades: [] }
        ]
    },
    { name: "Anna Nowak", subjects: [
            { name: "WDI", grades: [] },
            { name: "esum", grades: [] },
            { name: "JS", grades: [] }
        ]
    },
    { name: "Jerzy Zmuda", subjects: [
            { name: "WDI", grades: [] },
            { name: "esum", grades: [] },
            { name: "JS", grades: [] }
        ]
    },
    { name: "Katarzyna Wiśniewska", subjects: [
            { name: "WDI", grades: [] },
            { name: "esum", grades: [] },
            { name: "JS", grades: [] }
        ]
    }
];

// _______________________ Dodawanie ocen _______________________________
function displayStudentListAdd() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = students.map(student => {
        return `<button class="btn btn-link student-btn" onclick="showStudentDetailsAdd('${student.name}')">${student.name}</button>`;
    }).join('');
}

function showStudentDetailsAdd(studentName) {
    const resultsDiv = document.getElementById('results');
    const student = students.find(s => s.name === studentName);

    if (student) {
        let subjectList = student.subjects.map(subject => {
            return `<button class="btn btn-link subject-btn" onclick="addGradeToStudent('${studentName}', '${subject.name}')">${subject.name}</button>`;
        }).join('');

        resultsDiv.innerHTML = `
      <h4>${studentName}</h4>
      <h5>Przedmioty:</h5>
      ${subjectList}
    `;
    }
}

function addGradeToStudent(studentName, subjectName) {
    const resultsDiv = document.getElementById('results');

    const student = students.find(s => s.name === studentName);
    const subject = student.subjects.find(sub => sub.name === subjectName);

    if (student && subject) {
        resultsDiv.innerHTML = `
            <h4>Dodaj ocenę do przedmiotu: ${subjectName}</h4>
            <input type="number" id="gradeInput" class="form-control" placeholder="Wpisz ocenę (np. 4.5)" step="0.1" min="2" max="5">
            <button class="btn btn-success" onclick="saveGrade('${studentName}', '${subjectName}')">Dodaj</button>
        `;
    }
}

function saveGrade(studentName, subjectName) {
    const grade = parseFloat(document.getElementById('gradeInput').value);

    if (!isNaN(grade) && grade >= 2 && grade <= 5) {
        const student = students.find(s => s.name === studentName);
        const subject = student.subjects.find(sub => sub.name === subjectName);

        if (student && subject) {
            if (!subject.grades) subject.grades = [];
            subject.grades.push(grade);
            console.log(subject.grades)
            localStorage.setItem('students', JSON.stringify(students));

            alert(`Ocena ${grade} została dodana do przedmiotu ${subjectName} studenta ${studentName}`);

            showStudentDetailsAdd(studentName);
        }
    } else {
        alert("Proszę wpisać poprawną ocenę (od 2.0 do 5.0)");
    }
}

// _______________________ Zmiana ocen _______________________________

function displayStudentListChange() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = students.map(student => {
        return `<button class="btn btn-link" onclick="showStudentSubjectsChange('${student.name}')">${student.name}</button>`;
    }).join('');
}

function showStudentSubjectsChange(studentName) {
    const resultsDiv = document.getElementById('results');
    const student = students.find(s => s.name === studentName);

    if (student) {
        const subjectList = student.subjects.map(subject => {
            return `<button class="btn btn-link" onclick="showStudentGradesChange('${studentName}', '${subject.name}')">${subject.name}</button>`;
        }).join('');

        resultsDiv.innerHTML = `
            <h4>${studentName}</h4>
            <h5>Przedmioty:</h5>
            ${subjectList}
        `;
    }
}

function showStudentGradesChange(studentName, subjectName) {
    const resultsDiv = document.getElementById('results');
    const student = students.find(s => s.name === studentName);
    const subject = student?.subjects.find(sub => sub.name === subjectName);

    if (student && subject) {
        const gradeList = subject.grades.map((grade, index) => {
            return `<button class="btn btn-outline-secondary m-1" onclick="changeGrade('${studentName}', '${subjectName}', ${index})">${grade}</button>`;
        }).join('');

        resultsDiv.innerHTML = `
            <h4>${studentName} - ${subjectName}</h4>
            <h5>Oceny:</h5>
            ${gradeList}
        `;
    }
}

function changeGrade(studentName, subjectName, gradeIndex) {
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `
        <h4>Zmień ocenę</h4>
        <input type="number" id="newGradeInput" class="form-control mb-2" placeholder="Nowa ocena" step="0.1" min="2" max="5">
        <button class="btn btn-primary" onclick="saveChangedGrade('${studentName}', '${subjectName}', ${gradeIndex})">Zmień</button>
    `;
}

function saveChangedGrade(studentName, subjectName, gradeIndex) {
    const newGrade = parseFloat(document.getElementById('newGradeInput').value);

    if (!isNaN(newGrade) && newGrade >= 2 && newGrade <= 5) {
        const student = students.find(s => s.name === studentName);
        const subject = student?.subjects.find(sub => sub.name === subjectName);

        if (student && subject && subject.grades && subject.grades[gradeIndex] !== undefined) {
            subject.grades[gradeIndex] = newGrade;

            localStorage.setItem('students', JSON.stringify(students));
            alert(`Ocena została zmieniona na ${newGrade}`);
            showStudentGradesChange(studentName, subjectName);
        }
    } else {
        alert("Wprowadź poprawną ocenę (2.0 - 5.0)");
    }
}

// _______________________ Wyswietlanie ocen _______________________________

function displayGrades() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = students.map(student => {
        return `<button class="btn btn-link student-btn" onclick="showStudentGrades('${student.name}')">${student.name}</button>`;
    }).join('');
}

function showStudentGrades(studentName) {
    const resultsDiv = document.getElementById('results');
    const student = students.find(s => s.name === studentName);

    if (student) {
        let subjectList = student.subjects.map(subject => {
            return `<p>${subject.name}: ${subject.grades}</p>`;
        }).join('');

        resultsDiv.innerHTML = `
      <h4>${studentName}</h4>
      <h5>Oceny:</h5>
      ${subjectList}
    `;
    }
}



document.getElementById('addButton').addEventListener('click', function() {
    displayStudentListAdd();
});

document.getElementById('updateButton').addEventListener('click', function() {
    displayStudentListChange();
});

document.getElementById('displayButton').addEventListener('click', function() {
    displayGrades();
});

window.onload = function() {}
