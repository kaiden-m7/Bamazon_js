let mysql = require("mysql2");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chefkaiden09",
    database: "bamazonDB"
});

connection.connect(function (err){
    if (err) throw err;
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

function start() {
    inquirer.prompt([
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
    ]).then(function (answer) { 
        connection.query("SELECT * FROM products WHERE item_id = ?",[answer.desiredItem], function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                let quantitySelected = parseInt(answer.desiredQuantity);
                let total = answer.desiredQuantity * res[i].price;
                let product_name = res[i].product_name
                let stockUpdate = res[i].stock_quantity - quantitySelected;
                if (quantitySelected > res[i].stock_quantity) {
                    console.log("Insufficient quantity, Sorry");
                    connection.end();
                }
                else {
                    console.log("Item Chosen: " + product_name);
                    updateStocks(answer.desiredItem, stockUpdate);
                    console.log("There is " + stockUpdate + " " + product_name + "left in stock");
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
                        console.log("stock updated");
                        connection.end();
                        console.log("Thank you for your purchase. Your final total is: $ " + total + "(Note: this does include tax)")
                    });
                }
            }

        });
    })
};
