# The Library of Toys

The Library of Toys is a subscription based platform for users to rent toys for their children, in order to lower the amount of toys bought and discarded. The app utilizes a Ruby on Rails backend with a React frontend and a postgresql database. Action mailer is used for email automation.   

## User Features

Before a user decides to create an account they can view all of the toys offered on the site.

![gif of view toys](https://media.giphy.com/media/OAltdMbWjkPljaPK1R/giphy.gif)

 After a user creates an account they can add toys to their cart and submit orders, as well as view the status of previous orders.

 ![gif of submit order](https://media.giphy.com/media/O6SvIr2AK9EGL2MVet/giphy.gif) 

## Administrator Features

Administrators can upload new toys, update existing toys and delete toys that they would like to take out of circulation.

![gif of new toy](https://media.giphy.com/media/i7jgwkIQBuMGsCTQ1S/giphy.gif)

They can update existing order statuses from processing to shipped, shipped to returned or returned to restocked.

![gif of update order status](https://media.giphy.com/media/5M7CTpPRQ6djwG4BsX/giphy.gif)

 Administrators can also give other users administrative access. The first user will default to admin status, subsequent users will default to non-admin.

 ![gif of changing admin status](https://media.giphy.com/media/xieqL8H6JqZgCf279V/giphy.gif)

Action mailer: 
Automated emails are generated to welcome a newly created user and to inform existing users that their order status has changed. 

## Future Features

In the future this app will include a resource like Stripe or Paypal to pay subscription fees online, to purchase a rented toy or replace a broken one. The app will also include a model that allows the user to flag a toy as damaged upon arrival. 

## Running a local server

```bundle install```
```rails s```

```rails db:migrate db:seed```

```npm install --prefix client```
```npm start --prefix client```

View a demo at https://youtu.be/0d6rHnPyPCo

The app can be toured at https://toy-library.herokuapp.com/.

