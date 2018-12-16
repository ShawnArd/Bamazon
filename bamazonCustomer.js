const inquirer = require("inquirer");
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

function Bamazon() {
	

	// Construct the db query string
	db = 'SELECT * FROM products';

	// Make the db query
	connection.query(db, function(err, data) {
		if (err) throw err;

		console.log('Inventory:');
		console.log('-------------');

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
    
        // prompt for info about the item being put up for auction
        inquirer
          .prompt([
            {
              name: "item",
              type: "input",
              validate: valid,
              message: "Please select the item number you would like to purchase",
              filter: Number
            },
            {
              name: "quantity",
              type: "input",
              validate: valid,
              message: "Please input how many of the items you would like to purchase?",
              filter: Number
            },

          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
          
                var item = answer.item;
                var quantity = answer.quantity;

                db = 'SELECT * FROM products';

                // console.log(item)
                // console.log(quantity)

	        // Make the db query
	            connection.query(db, function(err, data) {
                    if (err) throw err;
                    
                    console.log(data[0])
                    if (quantity <= data[0].stock_quantity) {
                        					
                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (data[0].stock_quantity - quantity) + ' WHERE item_id = ' + item;
                        					
                        	connection.query(updateQueryStr, function(err, data) {
                        			if (err) throw err;
                        
                        						// End the database connection
                        						connection.end();
                        					})
                        				} else {
                        					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');

                                            Bamazon();
                                        }
             
                    },
                );
          });
}



Bamazon();