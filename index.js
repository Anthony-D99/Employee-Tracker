const inquirer = require('inquirer')
const fs = require('fs')
const connection = require('./config/connection')


function init(){
inquirer.prompt([
   {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: ['view all departments','view all roles', 'view all employees','add a department','add a role','add an employee','update an employee role'],
   }
   
  
]).then(result => {

   if (result.choices === 'view all departments') {
      viewDepartments()
   } else if (result.choices === 'view all roles') {
      viewRoles()
   } else if(result.choices === 'view all employees'){
      viewEmployees()
   }else if(result.choices === 'add a department'){

   }else if(result.choices === 'add a role'){
      
   }else if(result.choices === 'add an employee'){
      
   }else{

   }

   
  

})}


function viewDepartments(){
   connection.query('SELECT * FROM department', (err, res)=>{
      if(err){
         throw err
      }
      console.table(res)
      init()
   })
}
function viewRoles(){
   connection.query('SELECT * FROM role', (err, res)=>{
      if(err){
         throw err
      }
      console.table(res)
      init()
   })
}
function viewEmployees(){
   connection.query('SELECT * FROM employee', (err, res)=>{
      if(err){
         throw err
      }
      console.table(res)
      init()
   })
}



init()