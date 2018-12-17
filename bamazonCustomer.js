//required npm packages
const inquirer = require("inquirer");
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    //mySQL port
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

function Bamazon() {
	

	// Select everything from products in the Database
	db = 'SELECT * FROM products';

	// Connects to the database and uses the previous var to select products
	connection.query(db, function(err, data) {
		if (err) throw err;

		console.log('Inventory:');
		console.log('-------------');
        
        //Displays inventory so user can see details of the products
		var item = '';
		for (let i = 0; i < data.length; i++) {
			
			item = 'Item No. ' + data[i].item_id + ' || '
			+ data[i].product_name + ' || '
            + 'Genre:' + data[i].department_name + ' || '
            + 'Price:$' + data[i].price.toFixed(2) + ' || '
            + 'Stock:' + data[i].stock_quantity +" Remaining" + '\n'

			console.log(item);
		}

	  	console.log("------------");

	  	//Prompt the user for item/quantity they would like to purchase
	  	 userPrompt();
	})
}
 

//Validates Quantity
const valid = (val) => {
    if (Number.isInteger(val) && val > 0) {
        return true;
    } else {
        return "Please enter a valid quantity";
    }
}

const userPrompt=() => { 
  
        // Prompt user for item Selection and Quantity
        inquirer.prompt([
            {
                type: 'input',
                name: 'item_no',
                message:"Enter the Item No. you would like to buy.",
                validate: valid,
                filter: Number
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to buy?',
                validate: valid,
                filter: Number
            }
        ]).then(function(res) {
    
            var item = res.item_no;
            var quantity = res.quantity;
    
            // Used to Select Everything from the database the ? is a placeholder filed by the primary key item id
            var query = 'SELECT * FROM products WHERE ?';
    
            connection.query(query, {item_id: item}, function(err, data) {
                if (err) throw err;
    
                   var product = data[0];
    
                    // Checks that the quantity requested is in stock otherwise the user request is rejected
                    if (quantity <= product.stock_quantity) {
                        
                        //Calculate new Stock
                        var newStock = product.stock_quantity - quantity;
    
                        // Updating the database if the product is in stock
                        var updateDatabase = 'UPDATE products SET stock_quantity = ' + newStock + ' WHERE item_id = ' + item;

                        // Tell The user their item has been purchased and update the database
                        connection.query(updateDatabase, function(err, data) {
                            if (err) throw err;
    
                            console.log('Your order has been placed! \n The total cost is $' + product.price.toFixed(2) * quantity);


                            connection.end();
                        })
                        //runs if the the quantity requested is larger than the stock
                    } else {
                        console.log('Sorry, there is not enough in stock, please order a lower amount');
                       
    
                        Bamazon();
                    
                }
            })
        })
    }


Bamazon();