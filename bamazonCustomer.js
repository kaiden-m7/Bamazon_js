let mysql = require("mysql2");
let inquirer = require("inquirer");
const { start } = require("repl");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chefkaiden09",
    database: "bamazonDB"
});

connection.connect(function (error){
    if (error) throw error;
    console.log(connection.threadId);
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res);
        console.log("-----------------------");
        console.log("Welcome To Bamazon");
        console.log("-----------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");

        };
        start();
    });
};