import inquirer from "inquirer";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    console.log("Welcome!");

    let exitProgram = false;

    do {
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact?",
            choices: ["staff", "student", "exit"]
        });

        if (ans.select === "staff") {
            console.log("You approach the staff room. Please feel free to ask any question.");
        } else if (ans.select === "student") {
            const studentAns = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the student's name you wish to engage with:"
            });

            let student = persons.students.find(val => val.name === studentAns.student);

            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New student added.");
            } else {
                console.log(`Hello again, ${student.name}! Nice to meet you again.`);
            }

            console.log("Current student list:");
            console.log(persons.students);
        } else if (ans.select === "exit") {
            console.log("Exiting the program.");
            exitProgram = true;
        }
    } while (!exitProgram);
};

programStart(persons);

