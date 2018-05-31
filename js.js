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

        ])
        .then(function (answer) {
            console.log("Updating user product choice\n");
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        id: answer.item
                    },
                    {
                        stock_quantity: answer.count
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                }
            );

            console.log(query.sql);
        });
}


// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;


