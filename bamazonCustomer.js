let mysql = require("mysql2"); //reference to database/npm package
let inquirer = require("inquirer"); //npm package

//variable that connects Mysql database to js file using root localhost
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chefkaiden09",
    database: "bamazonDB"
});

//console logging if no connection to databse is made 
connection.connect(function (err){
    if (err) throw err;
    console.log(connection.threadId);
    displayProducts();
});

//function used when user inputs 'node' js file name into the terminal 
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
       
        console.log("-----------------------");
        console.log("Welcome To Bamazon"); //text to begin the 'shopping' process 
        console.log("-----------------------");
        //loops through results from database and consle logs them for user to choose by ID_name
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity in Stock: " + res[i].stock_quantity + " | ");

        };
        start();
    });
};

//function prompt following listed items from table in database 
function start() {
    inquirer.prompt([ //prompts user to make a selection of which item they would like to purchase and how much
        {
            name: "desiredItem",
            type: "input",
            message: "Please enter item ID of the item you are looking for: ",
        },
        {
            name: "desiredQuantity",
            type: "input",
            message: "Enter the amount if items you would like to purchase: " 
        }
    ]).then(function (answer) { //reccords user answer 
        connection.query("SELECT * FROM products WHERE item_id = ?",[answer.desiredItem], function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                let quantitySelected = parseInt(answer.desiredQuantity);
                let total = answer.desiredQuantity * res[i].price;
                let product_name = res[i].product_name
                let stockUpdate = res[i].stock_quantity - quantitySelected;
                if (quantitySelected > res[i].stock_quantity) {
                    console.log("Insufficient quantity, Sorry!");
                    connection.end();
                }
                else {
                    console.log("Item Chosen: " + product_name);
                    updateStocks(answer.desiredItem, stockUpdate);
                    console.log("There are " + stockUpdate + " " + product_name + " left in stock");
                }
                
                function updateStocks(target_item, stockUpdate) {
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockUpdate
                        },
                        {
                            item_id: target_item
                        }
                    ], function (err, res){
                        if (err) throw err;
                        console.log("Stock Updated");
                        connection.end();
                        console.log("Thank you for your purchase! Your final total is: $ " + total + "(Note: This does include tax!)")
                    });
                }
            }

        });
    })
};
