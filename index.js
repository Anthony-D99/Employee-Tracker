const inquirer = require('inquirer')
const fs = require('fs')
const connection = require('./config/connection')


function init() {
   inquirer.prompt([
      {
         type: 'list',
         name: 'choices',
         message: 'What would you like to do?',
         choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
      }


   ]).then(result => {

      if (result.choices === 'view all departments') {
         viewDepartments()
      } else if (result.choices === 'view all roles') {
         viewRoles()
      } else if (result.choices === 'view all employees') {
         viewEmployees()
      } else if (result.choices === 'add a department') {
         addDepartment()
      } else if (result.choices === 'add a role') {
         addRole()
      } else if (result.choices === 'add an employee') {
         addEmployee()
      } else {
         updateRole()
      }




   })
}


function viewDepartments() {
   connection.query('SELECT * FROM department', (err, res) => {
      if (err) {
         throw err
      }
      console.table(res)
      init()
   })
}
function viewRoles() {
   connection.query('SELECT * FROM role', (err, res) => {
      if (err) {
         throw err
      }
      console.table(res)
      init()
   })
}
function viewEmployees() {
   connection.query('SELECT * FROM employee', (err, res) => {
      if (err) {
         throw err
      }
      console.table(res)
      init()
   })
}

function addDepartment() {
   inquirer.prompt([
      {
         type: 'text',
         name: 'department',
         message: 'What is the name of the department',
      }
   ]).then(result => {
      connection.query(`INSERT INTO department(name) VALUES ('${result.department}')`, (err, res) => {
         if (err) {
            throw err
         }
         console.log(`Added ${result.name} to the database`)
         init()
      })
   })
}

function addRole() {
   inquirer.prompt([
      {
         type: 'text',
         name: 'role',
         message: 'What is the name of the role?',
      },
      {
         type: 'number',
         name: 'salary',
         message: 'What is the salary of the role?'
      },
      {
         type: 'number',
         name: 'department',
         message: 'What is the department number for this role?'
      },
   ]).then(result => {
      connection.query(`INSERT INTO role(title, salary,department_id) VALUES ('${result.role}',${result.salary},${result.department})`, (err, res) => {
         if (err) {
            throw err
         }
         console.log(`Added ${result.role} to the database`)
         init()
      })
   })
}

function addEmployee() {
   inquirer.prompt([
      {
         type: 'text',
         name: 'firstName',
         message: "What is the emmployee's first name?"
      },
      {
         type: 'text',
         name: 'lastName',
         message: "What is the employee's last name?"
      },
      {
         type: 'number',
         name: 'role',
         message: "What is the employee's role id number?"
      },
      {
         type: 'text',
         name: 'manager',
         message: "What is the employee's manager id number?(Type NULL if none)"
      },
   ]).then(result => {
      connection.query(`INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES ('${result.firstName}','${result.lastName}',${result.role},${result.manager})`, (err, res) => {
         if (err) {
            throw err
         }
         console.log(`Added ${result.firstName} ${result.lastName} to the database`)
         init()
      })
   })
}

function updateRole() {
   
      connection.query('SELECT title, first_name, last_name, employee.id, role.id FROM role, employee WHERE role.id = role_id', (err, res) => {
         if (err) {
            throw err
         }
         inquirer.prompt([
            {
               type: 'list',
               name: 'employee',
               message: "What is the employee's name?",
               choices: res.map(employee => `${employee.first_name} ${employee.last_name} (employee id: ${employee.id})`)
            },
            {
               type: 'list',
               name: 'role',
               message: "What is the role you would like to assign to the selected employee?",
               choices: res.map(role => `${role.title} (role id: ${role.id})`)
            },
         ]).then(result => {
            const employeeid = result.employee.split("id: ")[1].replace(")", "")
            const roleid = result.role.split("id: ")[1].replace(")", "")

            connection.query(`UPDATE employee SET role_id = ${roleid} WHERE id = ${employeeid}`, (err, res) => {
               if (err) {
                  throw err
               }
               console.log(`Updated ${result.employee} role to ${result.role}`)
               init()
            })
         })
      
})

   

}


init()