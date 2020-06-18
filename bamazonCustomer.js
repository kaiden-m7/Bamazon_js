let mysql = require("mysql2");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chefkaiden09",
    databse: "bamazonDB"
});

connection.connect(function (error){
    if (error) throw error;
    console.log(connection.threadId);
    displayProducts();
});

