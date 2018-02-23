# Node Mock
A simple light weight nodejs api mocking tool. This allows users to run a lightweight cross platform application to support mocking of API calls. 

**February 23, 2018** *This is still a work in progress*

### Prerequisites
1. nodejs installed
2. Firefox SQLite Manager plugin (optional)

The Firefox plugin is useful for querying the database or making changes when necessary.

### Setup
1. git clone https://github.com/mattvass/node-mock.git
2. cd node-mock
3. npm install

### Running
Run the following command to start the application

```npm start```

When it's started you'll see the following message

```
NodeMock RESTful API server started on: 3000
```

### Getting mocks
I kept this as simple as possible, the basis is you create a single route with the expected response. There is some sample data in the SQLite database, that can be used as a starter.


Using a client like Postman, you can call the mock and get the repsonse by using the following.
```
localhost:3000/mock/route1
```

**Example Response**
```
{
    "name": "route1/route3",
    "method": "GET"
}
```

To create a mock you'll need to call the api route, using the post method.
```
localhost:3000/api
```

**Example Postman Snippet**
```
POST /api HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Cache-Control: no-cache
Postman-Token: 3d6264dc-bbc8-524e-1e9b-2260cee877fc

{
	"route": "route1/route3",
	"method": "GET",
	"response": { 
		"name": "route1/route3", 
		"method": "GET" 
	}
}
```

To update the mock call the same api route with the put method.

**Example Postman Snippet**
```
PUT /api HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Cache-Control: no-cache
Postman-Token: 01d39a11-a280-f416-4741-bd64adebc19b

{
	"route": "route9/route1",
	"method": "GET",
	"response": {
		"name": "route9/route1",
		"method": "GET"
	}
}
```

### To Do
Since this is still a work in progress, I plan on updating this readme with more indepth information.  In addition to the documentation my current furture plans are as follows.

1. Ability to have more than one response for a give route supporting CRUD, using the method as the differentiator.
2. Ability to run only in memory, for those that do not want to store their mocks.
