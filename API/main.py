from fastapi import FastAPI

app = FastAPI()

deliveries = [
    {
        "id": 1,
        "pickup_location": {"name": "Library", "latitude": 41.9249, "longitude": -87.6553},
        "dropoff_location": {"name": "Student Center", "latitude": 41.9228, "longitude": -87.6535},
        "status": "Completed",
        "distance": 0.30,
        "delivery_time": "2025-01-26T15:05:00"
    }
]


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