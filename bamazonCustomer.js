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
    displayInventory();
    start();//figure out why this is running first, then running again after.
});


function start() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the product you would like to purchase?\n"
            },
            {
                name: "count",
                type: "input",
                message: "How many would you like to purchase?\n"
            },

        ])//will need something to validate user input.
        .then(function (answer) {
            var item = answer.item;
            var quantity = answer.count;
            var queryDB = 'SELECT * FROM products WHERE?';
            connection.query(
                queryDB, { id: item }, function (err, data) {
                    if (err) throw err;

                    if (data.length === 0) {
                        console.log('No ID selected, try again');
                    } else {
                        var productArr = data[0];


                        if (quantity <= productArr.stock_quantity) {
                            console.log('Processing order.....')


                            var updateDBQuery = 'UPDATE products SET stock_quantity = ' + (productArr.stock_quantity - quantity) + ' WHERE id = ' + item;


                            connection.query(updateDBQuery, function (err, data) {
                                if (err) throw err;
                                console.log(' Your order has been placed! Your total is $'+productArr.price*quantity);

                                displayInventory();
                                start();
                            })


                        } else {
                            console.log('Sorry there isnt enough in stock, please change quantity and re-order');
                            displayInventory();
                            start();
                        }
                    }
                })


        })

}

function displayInventory() {
    queryStore = ' SELECT * FROM products';
    connection.query(queryStore, function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            var storeFront = `'Item ID: ` + data[i].id + '|| ' + 'Product: ' + ' ' + data[i].product_name +'|| '+'Category: ' + ' ' + data[i].department_name+'|| ' + 'Price: ' + '$' + data[i].price;
            console.log(storeFront);

        }
        +'\n';

    })
}







