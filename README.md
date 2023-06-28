# Employee-Tracker

## Description

This project can be used as a tool for user to store information about their business in a local database. The user can display, add, and update the three tables being created in the application to keep track of their business's departments, roles, and employees.

## Installation

To install this project you must first clone the repository. The user must then start up their local MySQLserver connection and confirm in config folder that the connection.js file contains the correct port connection code, username, and password for their database to connect properly. After doing so the user can go in to the db folder and copy lines 1-30 in the schema.sql to be pasted into their personal sql database. Doing so will create the business_db and all the tables needed. In order for the application to work properly the user must open up the main 'Employee-Tracker' file in the intergrated terminal and enter 'npm i'. Doing so will install all the necessary packages needed for the application to run. While still in the terminal the user can now enter 'npm start' to run the application.

## Usage

Once the installation proccess has been completed and the user has entered 'npm start' while in the intergrated terminal for the 'Employee-Tracker' file, the user can now manipulate and display all the tables included in the business_db. When the application is run the user will be presented with 7 options. The first 3 will automatically display whatever data has been saved to each respected table. The following 3 options allow the user to add rows to the selected data table, and the finally option allows the user to select an employee and update the selected employees current role. The user will be notified through the console each time a table is updated successfully. 

## GitHub Link

https://github.com/Anthony-D99/Employee-Tracker