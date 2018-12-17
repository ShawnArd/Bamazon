# Bamazon
In this Projects we are required to create a MySQL Database and populate it with potential items a customer might wish to purchase. The using a CLI the user is displayed which items they would like to purchase and how many of that item. This project uses the NPM packages mysql and inquirer to achieve the desired results.

In order to ensure the user does not break the console we make sure the user can only select valid inputs by adding a validation in our inquirer prompt.
![Screenshot](https://shawnard.github.io/Bamazon/images/validation.png)

![Screenshot](https://shawnard.github.io/Bamazon/images/validQuant.png)

Once the user has placed a valid order the script will check that the product is available and there is enough in stock. If there is not enough in stock the request won't go through and the order will have to be placed again. 

![Screenshot](https://shawnard.github.io/Bamazon/images/incorrect.png)

If there is enough in stock the order should go through and the remaining to stock will reflect the loss in stock

![Screenshot](https://shawnard.github.io/Bamazon/images/correct.png)