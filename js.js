var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "pw",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});


function start() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the product you would like to purchase?"
            },
            {
                name: "count",
                type: "input",
                message: "How many would you like to purchase?"
            },

        ])//will need something to validate user input.
        .then(function (answer) {
            var item = answer.item;
            var quantity = answer.count;
            console.log(item);
            console.log(quantity);
            var queryDB = 'SELECT * FROM products WHERE?';
            connection.query(
                queryDB, { id: item }, function (err, data) {
                    if (err) throw err;

                    if (data.length === 0) {
                        console.log('No ID selected, try again');
                    } else {
                        var productArr = data[0];
                        console.log(productArr);

                        if (quantity <= productArr.stock_quantity) {
                            console.log('Processing order.....')

            
                            var updateDBQuery = 'UPDATE products SET stock_quantity = ' + (productArr.stock_quantity - quantity) + ' WHERE id = ' + item;


                            connection.query(updateDBQuery, function (err, data) {
                                if (err) throw err;
                                console.log(' Your order has been placed!')
                                start();
                            })


                        } else {
                            console.log('Sorry there isnt enough in stock, please change quanitity and re-order');
                            start();
                        }
                    }
                })

        })

     
}




