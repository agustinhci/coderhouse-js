// Each year registration price changes, 
// Students should pay in order to enroll in any of the courses.

class Registration {
    constructor(year, price) {
        this.year = year;
        this.price = price;
    }
}

let registration = new Registration(2023, 2000)

// Tracking previous courses created

let courses = []

// Storing permanent data

const types = ['grammar', 'conversation', 'other']
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const modalities = ['face-to-face', 'online', 'blended', 'hybrid']
const ageGroups = ['kids', 'teenagers', 'adults', 'third-age']

// Students (full list)

let students = []

// Course constructor

class Course {
    constructor (name, type, level, modality, ageGroupTarget, quantityOfClasses, groups, fee, instructor) {
        
        // Course information
        this.currentYear = new Date().getFullYear()
        this.id = `${name}-${this.currentYear.toString().slice(2,4)}-${Math.floor(Math.random()*90000) + 10000}`
        this.name = name
        this.type = type
        this.level = level
        this.modality = modality
        this.ageGroupTarget = ageGroupTarget
        this.quantityOfClasses = quantityOfClasses
        this.groups = groups
        this.fee = fee
        this.instructor = instructor

        // Course activity information
        this.students = []
        this.attendance = {}
        this.payments = {}
    }

    // The following properties are designed to be set later because the information may change before or during the course.

    // Set fee price
    setfeePrice(fee) {
        this.fee = fee
    }

    // Set instructor
    setInstructor(instructor) {
        this.instructor = instructor
    }
    
    // Adds student to the course by e-mail
    addStudent(studentEmail) {
        this.students.push(studentEmail);
    }

    // Marks attendance to an student e-mail (used as identifier) and corresponding date
    markAttendance(studentEmail, date) {
        this.attendance[studentEmail] = this.attendance[studentEmail] || {}
        this.attendance[studentEmail][date] = true
    }

    // Adds payment to an student e-mail (used as identifier) and corresponding month
    addPayment(studentEmail, month, amount) {
        this.payments[studentEmail] = this.payments[studentEmail] || {}
        this.payments[studentEmail][month] = amount
    }
}

class Student {
    constructor (name, lastName, email, phone) {
        // Information
        this.name = name
        this.lastName = lastName
        this.email = email
        this.phone = phone

        // Payments
        this.registrationIsPaid = false
        this.payments = []
        this.refunds = []
        
        // Courses
        this.currentCourses = [] // In progress
        this.unfinishedCourses = [] // Abandoned
        this.finishedCourses = [] // Successful   
    }

    enroll(course) {
        this.currentCourses.push(course)
    }

    abandon(course) {
        let courseAbandoned = this.currentCourses.pop() // Leaves last course enrolled
        this.unfinishedCourses.push(courseAbandoned)
    }

    finish(course) {
        let courseFinished = this.currentCourses.pop() // Completed last course enrolled
        this.finishedCourses.push(courseFinished)
    }

    payRegistration() {
        this.registrationIsPaid = true
        this.payments.push(registration.price)
    }

    payFee(amount) {
        this.payments.push(amount)
    }

    refund(amount) {
        let refund = this.payments.pop()
        this.refunds.push(refund)
    }

}

// Creating a course from HTML form

let coursesCreator = document.getElementById("courseCreator")

coursesCreator.addEventListener('submit', function(event) {
    event.preventDefault()
    
    const name = document.getElementById('courseName').value;
    const type = document.getElementById('courseType').value;
    const level = document.getElementById('courseLevel').value;
    const modality = document.getElementById('courseModality').value;
    const target = document.getElementById('courseTarget').value;
    const quantityOfClasses = document.getElementById('courseQuantityOfClasses').value;
    const groups = document.getElementById('courseGroups').value;
    const price = document.getElementById('coursePrice').value;
    const instructor = document.getElementById('courseInstructor').value;

    // Create a new Course object
    const course = new Course(name, type, level, modality, target, quantityOfClasses, groups, price, instructor);
    console.log(course)

    // Add the Course object to the courses array
    courses.push(course)
    console.log(courses)

    // Clear the form
    coursesCreator.reset()

    // Update the HTML table
    updateTable();

});

// Function to update the HTML table
function updateTable() {
    // Get the table body element
    const table = document.getElementById('courses');

    // Clear the table
    table.innerHTML = '';

    // Iterate over the courses array and add each Course object to the table
    courses.forEach(function(course) {
        const row = table.insertRow();
        row.insertCell().textContent = course.id
        row.insertCell().textContent = course.name
        row.insertCell().textContent = course.type
        row.insertCell().textContent = course.level
        row.insertCell().textContent = course.modality
        row.insertCell().textContent = course.ageGroupTarget
        row.insertCell().textContent = course.quantityOfClasses
        row.insertCell().textContent = course.groups
        row.insertCell().textContent = registration.price
        row.insertCell().textContent = course.fee
        row.insertCell().textContent = course.instructor
    })
}

// let newCourse = new Course('beginners', 'grammar', 'a1', 'blended', 'adults', 16)
// newCourse.addGroup(1, 'martes', '6:00PM')
// newCourse.setfeePrice(8990)
// newCourse.setInstructor('Hernán Agustín Campos')
// newCourse.addStudent('agustincps@gmail.com')
// newCourse.markAttendance('agustincps@gmail.com', '1 mar 2023')
// newCourse.markAttendance('agustincps@gmail.com', '8 mar 2023')
// newCourse.markAttendance('agustincps@gmail.com', '15 mar 2023')
// newCourse.addPayment('agustincps@gmail.com', 'march', 8900)
// newCourse.addPayment('agustincps@gmail.com', 'april', 8900)
// newCourse.addPayment('agustincps@gmail.com', 'may', 8900)

// console.log(newCourse)

// let newStudent = new Student('Hernán', 'Campos', 'agustincps@gmail.com', 3876047616)
// newStudent.enroll('beginners', 1)
// newStudent.enroll('elementary', 4)
// newStudent.payRegistration()
// newStudent.payFee(8990)
// console.log(newStudent)
// newStudent.refund(8990)

// newStudent.abandon('beginners')

// newCourse.getIncome()


