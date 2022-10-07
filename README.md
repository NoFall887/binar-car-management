# Binar Car Management

This project contains car's data management web-app and APIs. Data management can be done using either the API and Web-app.
Technologies used in this project :
**APIs** : Express, Cloudinary, Sequelize, PostgreSQL, Multer
**Web app** : HTML, CSS, JS, Bootstrap, EJS, Axios

## ERD (Entity Relationship Diagram)
![ERD](https://raw.githubusercontent.com/NoFall887/binar-car-management/main/Untitled.png)

## Set Up
### Install dependencies
Install API dependencies

    cd server && yarn install
   Install Web App dependencies

    cd ../client && yarn install
 ### Run API and Web App
 Open terminal for each API and Web App. 
 Execute this line on fiest terminal :

    cd server && yarn start
API server will run on `localhost:8000`
 
    cd client && yarn start
Web App will be served on `localhost:8800`

**make sure to run the API server before Web App*

## Web App Pages list

 - List Car - `localhost:8800/`
 - Add new car - `localhost:8800/new`
 - Update Car Information - `localhost:8800/edit?id=:carId`

## APIs
### Get cars data
There are some ways to get cars data from the API, they're listed below :

**Get all cars data**
use `localhost:8000/cars` to get all cars data.
Response body example :
```
[
	{
		"id":  7,
		"image":  "https://imgage.com",
		"rentPerDay":  4143123,
		"name":  "Car",
		"createdAt":  "2022-10-06T13:44:22.349Z",
		"updatedAt":  "2022-10-06T13:44:22.349Z",
		"sizeId":  1,
		"size":  {
			"id":  1,
			"size":  "Small"
		}
	},
	...
]
```
**Get cars data by id**
use `localhost:8000/cars:id` to get car data based on it's id. Replace :id with car's id.
Response body example :
```
[
	{
		"id":  7,
		"image":  "https://imgage.com",
		"rentPerDay":  4143123,
		"name":  "Car",
		"createdAt":  "2022-10-06T13:44:22.349Z",
		"updatedAt":  "2022-10-06T13:44:22.349Z",
		"sizeId":  1,
		"size":  {
			"id":  1,
			"size":  "Small"
		}
	},
]
```
### Create and Update a Car Data
To create new data, make a POST request to `localhost:8000/cars`, and for updating car data make a PUT request to `localhost:8000/cars/:id` instead. Replace `:id` with car id you want to update.
The endpoint accept `multipart/form-data`request body. Dont forget to set `Content-type` header value to `multipart/-form-data`.

Request body example :
|Key       |Value     |Type   |
|----------|----------|-------|
|image     |image.jpg |file   |
|rentPerDay|200000    |text   |
|name      |Mitsubushi|text   |
|size      |medium    |text   |

for size field use one of  **small, medium, or large** value

Response body example :
```
[
	{
		"id":  7,
		"image":  "https://imgage.com",
		"rentPerDay":  4143123,
		"name":  "Car",
		"createdAt":  "2022-10-06T13:44:22.349Z",
		"updatedAt":  "2022-10-06T13:44:22.349Z",
		"sizeId":  1,
	},
]
```

### Delete a Car Data
For deleting car data make a DELETE request to `localhost:8000/cars/:id`. The response will be the car id that has been deleted

