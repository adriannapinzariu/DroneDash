from fastapi import FastAPI

app = FastAPI()

deliveries = []
next_id = 1

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

# Get All Deliveries
@app.get("/deliveries")
def get_all_deliveries():
    return deliveries

# Create a New Delivery
@app.post("/deliveries")
async def get_all_deliveries():
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
def delete_delivery_by_id(id: int):
    for delivery in deliveries:
        if delivery["id"] == id:
            deliveries.remove(delivery)
            return delivery 

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