(function () {
    'use strict';

    class Student {
        constructor(first, last, age, grade) {
            this.firstName = first;
            this.lastName = last;
            this.age = age;
            this.grade = grade;
        }
    }

    const cohortH = [new Student('John', 'Smith', '20', 'A'), new Student('Jane', 'Doe', '19', 'B'), new Student('Joe', 'Bloggs', '18', 'C')];

    function printStudents(swap, ...students) {

        if (swap) {
            students.forEach(student => {
                console.log(`${student.firstName} ${student.lastName} is ${student.age} and is in ${student.grade}`);
            });
        }else{
            students.forEach(student => {
                console.log(`${student.lastName}, ${student.firstName} is ${student.age} and is in ${student.grade}`);
            });
        }
    }
    printStudents(false, ...cohortH);

    console.log('////////////////////');

    function copyStudents(...students){
        let newStudents = [];
        students.forEach(student => {
            let {firstName, lastName, ...rest} = student;
            newStudents.push(new Student(lastName, firstName, rest.age, rest.grade));
        });
        return newStudents;
    }

    printStudents(true, ...copyStudents(...cohortH));





}())