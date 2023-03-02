

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

// Students (full list)

let students = []

// Course constructor

class Course {
    constructor (name, type, level, modality, ageTarget, quantityOfClasses) {
        // Beginners, grammar, A1, online, adults, 16
        this.currentYear = new Date().getFullYear()
        this.id = `${name}-${modality}-${this.currentYear.toString().slice(2,4)}-${Math.floor(Math.random()*90000) + 10000}`
        this.name = name
        this.type = type
        this.level = level
        this.modality = modality
        this.ageTarget = ageTarget
        this.quantityOfClasses = quantityOfClasses
        this.groups = []
        this.fee = 0
        this.instructor = ''

        this.students = []
        this.attendance = {}
        this.payments = {}

        courses.push([this.id, this.name, this.type, this.level, this.modality, this.ageTarget, this.quantityOfClasses, this.groups, this.fee, this.instructor, this.students, this.attendance, this.payments])
    }

    // The following properties are designed to be set later because the information may change before or during the course.

    // Set groups
    addGroup(group, day, time) {
        this.group = group // Usually a number
        this.day = day
        this.time = time
        this.students = []
        
        let groupData = [this.group, this.day, this.time, this.students]
        this.groups.push(groupData)
    }

    // Set fee price
    setfeePrice(fee) {
        this.fee = fee
    }

    // Set instructor
    setInstructor(instructor) {
        this.instructor = instructor
    }
    
    addStudent(studentEmail) {
        this.students.push(studentEmail);
    }

    markAttendance(studentEmail, date) {
        this.attendance[studentEmail] = this.attendance[studentEmail] || {}
        this.attendance[studentEmail][date] = true
    }

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

        // Store student information in full students list object
        students.push([this.name, this.lastName, this.email, this.phone, this.registrationIsPaid, this.payments, this.refund, this.currentCourses, this.unfinishedCourses, this.finishedCourses])
    }

    enroll(course, group) {
        let courseData = [course, group];
        this.currentCourses.push(courseData)
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

// TESTING

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


