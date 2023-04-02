// Each year registration price changes, 
// Students should pay in order to enroll in any of the courses.

class Registration {
    constructor(year, price) {
        this.year = year;
        this.price = price;
    }
}

let registration = new Registration(2023, 2000)

// Courses (full list)

let courses = []

// Students (full list)

let students = []

// Current date
let date = new Date()
        let current_date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        let current_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        let current_date_time = current_date + ' | '+ current_time

// Course constructor

class Course {
    constructor (name, classes, fee, instructor) {
                
        // Course information
        this.id = `${name}-${Math.floor(Math.random()*90000) + 10000}`
        this.name = name
        this.classes = classes
        this.fee = fee
        this.instructor = instructor
        this.registrationRequired = true

        // Course activity information
        this.students = []
        this.deserters = []
        this.attendance = {}
        this.payments = {}
    }

    // The following properties are designed to be set later because the information may change before or during the course.

    // Set fee price
    setFeePrice(fee) {
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

    removeStudent(studentEmail) {
        for (let student of this.students) {
            if (studentEmail === student.email) {
                this.students.splice(this.students.indexOf(student), 1)
                this.deserters.push(student)
                break
            }
        }
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

    enroll(course_id) {
        if (this.registrationIsPaid) {
            this.currentCourses.push(course_id)
        } else {
            alert('Primero debe registrar pago de la inscripción.')
        }
    }

    abandon(course_id) {
        for (let course of this.currentCourses) {
            if (course_id === course.id) {
                this.currentCourses.splice(this.currentCourses.indexOf(course_id), 1)
                this.unfinishedCourses.push(course)
                break;
            }
        }
    }

    finish(course_id) {
        for (let course of this.currentCourses) {
            if (course_id === course.id) {
                this.currentCourses.splice(this.currentCourses.indexOf(course_id), 1)
                this.finishedCourses.push(course)
                break
            }
        }
    }

    payRegistration() {
        this.registrationIsPaid = true
        let amount = registration.price
        let payment_id = `payment-reg-${this.email}-${Math.floor(Math.random()*90000) + 10000}`
        this.payments.push({payment_id, amount, current_date_time})
    }

    payFee(course_id, amount) {
        let payment_id = `payment-fee-${this.email}-${Math.floor(Math.random()*90000) + 10000}`
        this.payments.push({payment_id, course_id, amount, current_date_time})
    }

    refund(payment_id) {
        for (let payment of this.payments) {
            if (payment_id === payment.id) {
                this.payments.splice(this.payments.indexOf(payment_id), 1)
                this.refunds.push(payment)
                break;
            }
        }
        
    }

}

// Updating the 'courses' array with previous information provided in local storage.
function updateCourses () {
    let stringifiedCourses = localStorage.getItem('courses') // Gets the DOM object
    let parsedCourses = JSON.parse(stringifiedCourses) // Parses the string to object
    
    // Pushes each object to the courses array, for them to be separated by comas (,)
    if (parsedCourses !== null) {
        for (let course of parsedCourses) {
            courses.push(course)
        }
    }
}

updateCourses()
updateTable()

// Creating a course from HTML form

// Gets the form
let coursesCreator = document.getElementById("courseCreator")
let success = document.getElementById("alertSuccess")
let fail = document.getElementById("alertFail")

// Listens the 'submit' event
coursesCreator.addEventListener('submit', function(event) {
    
    // Prevents the page to be refreshed after submitting
    event.preventDefault()

    // Gets the values
    const name = document.getElementById('courseName').value
    const classes = document.getElementById('courseClasses').value
    const price = document.getElementById('coursePrice').value
    const instructor = document.getElementById('courseInstructor').value

    if (name !== '' && classes !== '' && price !== '' && instructor !== '') {
        
        // Creates a new course object
        const course = new Course(name, classes, price, instructor)

        // Pushes the new course to 'courses'
        courses.push(course)

        // Converts the 'courses' to string
        let stringifiedCourses = JSON.stringify(courses)

        // Sends stringified 'courses' to local storage
        localStorage.setItem('courses', stringifiedCourses)

        // Clears the form
        coursesCreator.reset()

        // Display success alert
        Toastify({
            text: 'Curso creado exitósamente',
            duration: 3000,
            gravity: 'bottom',
            style: {
                color: "#b2b2b2",
                background: "#0d0d0d",
                border: "1px solid #b2b2b2"
            }
        }).showToast()

    } else {
        // Display success alert
        Toastify({
            text: '¡Debe completar todos los campos!',
            duration: 3000,
            gravity: 'bottom',
            style: {
                color: "#000000",
                background: "#ffcc00",
                border: "1px solid #000000",
            }
        }).showToast()
    }

    // Update the HTML table
    updateTable()
    
})

// Function to update the HTML table
function updateTable() {

    const table = document.getElementById('courses')
    // Clears the table
    table.innerHTML = ''

    // Gets information from local storage
    let stringifiedCourses = localStorage.getItem('courses')
    let parsedCourses = JSON.parse(stringifiedCourses)

    if (parsedCourses !== null) {
        for (let course of parsedCourses) {
            const row = table.insertRow()
            row.insertCell().textContent = course.id
            row.insertCell().textContent = course.name
            row.insertCell().textContent = course.classes
            row.insertCell().textContent = `$${registration.price}`
            row.insertCell().textContent = `$${course.fee}`
            row.insertCell().textContent = course.instructor
            row.insertCell().innerHTML = '<div class="course__action"><a class="course__action-delete"><button>Borrar</button></a></div>'
        
            let courseDelete_buttons = document.querySelectorAll('a.course__action-delete button')

            courseDelete_buttons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    let btn = event.target // button
                    let anchor = btn.parentElement // a
                    let wrapper = anchor.parentElement // div
                    let cell = wrapper.parentElement // cell
                    let row = cell.parentElement // row
        
                    let courseId = row.cells[0].textContent // Gets the course ID to delete
                    console.log(courseId)

                    deleteCourse(courseId)
                })
            })

            
        }
    }
}

function deleteCourse(courseId) {  
    // Use the for loop in order to access the index of the course and splice it
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
            let deletedCourseFromCourses = courses.splice(i, 1);
            console.log(deletedCourseFromCourses[0].id + ' eliminado de Cursos');

            Toastify({
                text: 'Curso eliminado correctamente',
                duration: 3000,
                gravity: 'bottom',
                style: {
                    color: "#b2b2b2",
                    background: "#0d0d0d",
                    border: "1px solid #b2b2b2"
                }
            }).showToast()

            break;
        }
    }

    // Gets information from local storage
    let stringifiedCourses = localStorage.getItem('courses')
    let parsedCourses = JSON.parse(stringifiedCourses)
    
    for (let i = 0; i < parsedCourses.length; i++) {
        if (parsedCourses[i].id === courseId) {
            let deletedCourseFromStorage = parsedCourses.splice(i, 1);
            console.log(deletedCourseFromStorage[0].id + ' eliminado de Storage');
            break;
        }
    }

    // Saves the updated course list to local storage
    localStorage.setItem('courses', JSON.stringify(parsedCourses))

    updateTable()
}

// WEATHER

function showPosition(position) {

    let lat = position.coords.latitude
    let lon = position.coords.longitude
    let api = 'bbf8893c6e8030e157bb633d11a66e17'

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`)
        .then(response => response.json())
        .then(data => {
            const city = data.name
            const temperature = data.main.temp
            const feelsLike = data.main.feels_like
            const min = data.main.temp_min
            const max = data.main.temp_max
            const humidity = data.main.humidity

            let weatherCity = document.getElementsByClassName('weather__city-name')[0]
            weatherCity.textContent = city

            let weatherTemperature = document.getElementsByClassName('weather__temperature')[0]
            weatherTemperature.textContent = `${temperature - 273,15}°`

            let weatherFeelsLike = document.getElementsByClassName('feels-like')[0]
            weatherFeelsLike.textContent = `Sensación: ${feelsLike - 273,15}°`

            let weatherMin = document.getElementsByClassName('min')[0]
            weatherMin.textContent = `Mínima: ${min - 273,15}°`

            let weatherMax = document.getElementsByClassName('max')[0]
            weatherMax.textContent = `Máxima: ${max - 273,15}°`

            let weatherHumidity = document.getElementsByClassName('humidity')[0]
            weatherHumidity.textContent = `Humedad: ${humidity}%`
        })
        .catch(error => console.error(error));

}

navigator.geolocation.getCurrentPosition(showPosition)