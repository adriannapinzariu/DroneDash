from fastapi import FastAPI

# NOTE: We should probably randomize ID or something instead of numerical bc that can mix things up

app = FastAPI()

deliveries = []
next_id = 1

# Mock Data
deliveries = [
    {
        "id": next_id,
        "pickup_location": {"name": "Library", "latitude": 41.9249, "longitude": -87.6553},
        "dropoff_location": {"name": "Student Center", "latitude": 41.9228, "longitude": -87.6535},
        "status": "Completed",
        "distance": 0.30,
        "delivery_time": "2025-01-26T15:05:00"
    }
]

robots = [
    {
        "id": next_id,
        "current_location": {
            "latitude": 41.9249,
            "longitude": -87.6553
        },
        "status": "Available",
        "battery": 95.5,
        "max_load": 25.0
    },
    {
        "id": (next_id + 1),
        "current_location": {
            "latitude": 41.9228,
            "longitude": -87.6535
        },
        "status": "In Progress",
        "battery": 99.9,
        "max_load": 50.0
    }
]

users = [
    {
    	"id": 1, 
	    "full_name": "Vincent DePaul", 
        "username": "VDepaul", 
        "email": "VDepaul@depaul.edu",
        "role": "Student", 
        },
        {
        "id": 2, 
        "full_name": "Robert Manuel", 
        "username": "PrezDePaul",
        "email": "prezdepaul@depaul.edu", 
        "role": "Admin",
        }
]


# Get All Deliveries
@app.get("/deliveries")
async def get_all_deliveries():
    return deliveries

# Create a New Delivery
@app.post("/deliveries")
async def create_new_delivery():
    global next_id
    next_id += 1
    new_delivery = {
        "id" : next_id, #can you guys fix this in the documentation
        "pickup_location": {
            "name": "DePaul Art Museum",
            "latitude": 41.9252,
            "longitude": -87.6527
        },
        "dropoff_location": {
            "name": "Wish Field",
            "latitude": 41.9220,
            "longitude": -87.6565
        },
        "status": "Scheduled", #can you guys fix this in the documentation
        "distance": 0.25,
        "delivery_time": "2025-01-26T14:30:00" 
    }
    deliveries.append(new_delivery)
    return deliveries

# Get Delivery by ID
@app.get("/deliveries/{id}")
async def get_delivery_by_id(id: int):
    for delivery in deliveries:
        if delivery["id"] == id:
            return delivery

# Delete Delivery by ID
@app.delete("/deliveries/{id}")
async def delete_delivery_by_id(id: int):
    for delivery in deliveries:
        if delivery["id"] == id:
            deliveries.remove(delivery)
            return delivery 

# Someone help me with update please
'''
# Update a Delivery by ID
@app.patch("/deliveries/{id}")
async def update_delivery_by_id(id: int):
    # get deliveries list and id
    # go and check which one is different
    for delivery in deliveries:
        if delivery["id"] == id:
            updated_delivery = {
                "id": delivery["id"], # update this in documentation
                "pickup_location": {
                    "name": "Library",
                    "latitude": 41.9250,
                    "longitude": -87.6500
                },
                "dropoff_location": {
                    "name": "Student Center",
                    "latitude": 41.9200,
                    "longitude": -87.6600
                },
                "status": "Completed", # changed to completed
                "distance": 0.75,
                "delivery_time": "2025-01-26T15:05:00"
            }
        '''    

# Get All Robots
@app.get("/robots")
async def get_all_robots():
    return robots

# Create a New Robot
@app.post("/robots")
async def create_new_robot():
    new_robot = {
    	"id": len(robots) + 1, 
    	"current_location": { 
            "latitude": 41.4573, 
            "longitude": -87.0299, 
        },
    	"status": "Available", 
    	"battery": 100.0,
    	"max_load": 50.0 
    }
    robots.append(new_robot)
    return robots

# Get Robot by ID
@app.get("/robots/{id}")
async def get_robot_by_id(id: int):
    for robot in robots:
        if robot["id"] == id:
            return robot

# Delete Robot by ID
@app.delete("/robots/{id}")
async def delete_robot_by_id(id: int):
    for robot in robots:
        if robot["id"] == id:
            robots.remove(robot)
            return robot # is it supposed to return what we delete?

# Someone help me with update please

# Get All Users
@app.get("/users")
async def get_all_users():
    return users

# Create a New User
@app.post("/users")
async def create_new_user():
    new_user = {
        "id": len(users) + 1,
        "full_name": "John Smith",
        "username": "jsmith",
        "email": "“jsmith@depaul.edu",
        "role": "Student",
    }
    users.append(new_user)
    return users

# Get User by ID
@app.get("/users/{id}")
async def get_user_by_id(id: int):
    for user in users:
        if user["id"] == id:
            return user

# Delete User by ID
@app.delete("/users/{id}")
async def delete_user_by_id(id: int):
    for user in users:
        if user["id"] == id:
            users.remove(user)
            return user

# Someone help me with update please

'''

static_string = "Initial test"

listUsers = { "Name": "Adrianna", "id" : 1 }, { "Name": "hehe", "id" : 2 }

@app.get("/user")
async def root():
    return listUsers

# use post to add data
@app.post("/user")
async def root(name: str = 0):
    listUsers.append({"name":name, "id": 3})
    return listUsers

@app.get("/")
async def hello(name: str):
    return {"Message": "Congrats! " + name + " This is your first API!"}

@app.get("/test")
async def read_root():
    return {"Message": "Congrats! This is your first API!"}

'''