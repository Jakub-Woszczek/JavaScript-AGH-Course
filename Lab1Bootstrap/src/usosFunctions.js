const students = [
    {
        name: "Tiger Bonzo",
        photo: "images/Tiger_bonzo.png",
        subjects: []
    },
    {
        name: "Harry Squatter",
        photo: "images/Harry_squatter.png",
        subjects: []
    },
    {
        name: "Major",
        photo: "images/Major.png",
        subjects: []
    }
];

// Test field parser
function parseUserInput() {
    const input = document.getElementById("userInput").value.trim();
    const parts = input.split(",");

    if (parts.length !== 3) {
        alert("Poprawny format: Imię Nazwisko,przedmiot,ocena");
        return null;
    }

    const [fullName, subjectName, gradeStr] = parts.map(p => p.trim());
    const grade = parseFloat(gradeStr);

    if (isNaN(grade)) {
        alert("Ocena musi być liczbą.");
        return null;
    }
    if (grade < 1 || grade > 5) {
        alert("Niepoprawny zakres oceny");
        return null;
    }

    const studentId = students.findIndex(s => s.name.toLowerCase() === fullName.toLowerCase());

    if (studentId === -1 || !students[studentId]) {
        alert("Nie znaleziono studenta o imieniu i nazwisku: " + fullName);
        return null;
    }

    return {
        studentId,
        fullName,
        subjectName,
        grade
    };
}

// Add button handling
document.getElementById("addButton").addEventListener("click", () => {
    const { studentId, fullName, subjectName, grade } = parseUserInput() || {};
    addGradeToStudent(studentId, subjectName, grade);
});


// ____________ ADD BUTTON logic ____________
function addGradeToStudent(studentId, subjectName, grade) {

    const student = students[studentId];
    let subject = student.subjects.find(s => s.name === subjectName);

    const tabButton = document.querySelector(`#tab-${studentId}`);
    const tab = new bootstrap.Tab(tabButton);
    tab.show();

    if (!subject) {
        subject = { name: subjectName, grades: [] };
        student.subjects.push(subject);
    }

    subject.grades.push(grade);

    const subjectList = document.getElementById(`subjects-${studentId}`);
    subjectList.innerHTML = student.subjects.map(sub =>
        `<li><strong>${sub.name}</strong>: ${sub.grades.join(', ')}</li>`
    ).join('');
}

// _____________________ CHANGE BUTTON logic _____________________
document.getElementById("updateButton").addEventListener("click", () => {
    const { studentId, fullName, subjectName, grade } = parseUserInput() || {};


    const studentID = students[studentId];
    const subject = studentID.subjects.find(sub => sub.name.toLowerCase() === subjectName.toLowerCase());

    if (!subject || subject.grades.length === 0) {
        alert("Student nie ma ocen z tego przedmiotu.");
        return;
    }

    const tabButton = document.querySelector(`#tab-${studentId}`);
    const tab = new bootstrap.Tab(tabButton);
    tab.show();

    const contentId = `content-${studentId}`;
    const tabPane = document.getElementById(contentId);
    const subjectList = tabPane.querySelector("ul");

    subjectList.innerHTML = studentID.subjects.map(sub => {
        if (sub.name.toLowerCase() === subjectName.toLowerCase()) {
            return `<li><strong>${sub.name}</strong>: ${
                sub.grades.map((g, i) =>
                    `<button class="btn btn-sm btn-outline-primary me-1 mb-1 grade-btn" data-sub="${subject.name}" data-index="${i}" data-student="${studentId}">${g}</button>`
                ).join("")
            }</li>`;
        } else {
            return `<li><strong>${sub.name}</strong>: ${sub.grades.length > 0 ? sub.grades.join(", ") : "Brak ocen"}</li>`;
        }
    }).join("");

    document.querySelectorAll(".grade-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const i = parseInt(e.target.dataset.index);
            const sid = parseInt(e.target.dataset.student);
            const sub = e.target.dataset.sub;

            const subj = students[sid].subjects.find(s => s.name === sub);
            subj.grades[i] = grade;

            subj.grades[i] = grade;

            restoreSubjectGradesView(sid, sub);

        });
    });
});

function restoreSubjectGradesView(studentId, subjectName) {
    const student = students[studentId];
    const subject = student.subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase());

    const contentId = `content-${studentId}`;
    const tabPane = document.getElementById(contentId);
    const subjectList = tabPane.querySelector("ul");

    subjectList.innerHTML = student.subjects.map(sub => {
        const gradesText = sub.grades.length > 0 ? sub.grades.join(", ") : "Brak ocen";
        return `<li><strong>${sub.name}</strong>: ${gradesText}</li>`;
    }).join("");
}



document.getElementById("displayButton").addEventListener("click", () => {
    const allTabPanes = document.querySelectorAll(".tab-pane");

    if (allTabPanes.length === 0) {
        renderStudentTabs();
        return;
    }

    allTabPanes.forEach(pane => {
        const isExpanded = pane.getAttribute("data-expanded") === "true";

        if (isExpanded) {
            pane.classList.remove("show", "active");
            pane.setAttribute("data-expanded", "false");
        } else {
            pane.classList.add("show", "active");
            pane.setAttribute("data-expanded", "true");
        }
    });
});