from fastapi import FastAPI

app = FastAPI()

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