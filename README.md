# How to run the app

##### pre-requisites
* Should have node installed
* Have mysql local server running

##### Steps
1.clone the app
2.checkout the the root directory
3.`npm install`
4. copy the content in backup.sql
5. Use `mysql -u username -p task_management < backup.sql` command to get the dump data in your local mysql
4. ##### start server: `npm run dev` (the local server will run at PORT: 5001. Make sure it is available)
5. `npm run test` - To run tests

Runs the app in the development mode.\
[http://localhost:5001](http://localhost:5001) 
### Feature implements

##### Routing
##### CORS policy
##### All necessary end points 
##### test coverage
##### Middleware
##### validations
##### Error handling
##### loggin



#### Improvement can be done in future

* implement user authentication to secure endpoints.
* Use JWT (JSON Web Tokens) for token-based authentication.
* Use Sequelize


