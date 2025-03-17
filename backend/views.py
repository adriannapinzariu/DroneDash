import os
import requests
from flask import Blueprint, render_template, request
from backend.models import Store, Product, Delivery, User, Robot, UserRole, RobotStatus, DeliveryStatus
from flask.json import jsonify
from . import db
from datetime import datetime
from dotenv import load_dotenv

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

views = Blueprint('views', __name__)


#Home page
@views.route('/')
def home(methods=['GET']):
    return "<h1>DroneDash</h1><p>Welcome to DroneDash</p>"
    #return render_template("home.html") # This is the template that will be rendered Later!!!

#Delivery routes
#get all deliveries -> Only accessible by admin
@views.route('/deliveries', methods=['GET'])
def get_all_deliveries():
# Querying all deliveries from the database

    # -> here we will update the query to get all deliveries
    deliveries = Delivery.query.all()
    
    # Formatting response data
    deliveries_list = [
        {
            "delivery_id": delivery.id,
            "status": delivery.status,
            "destination": delivery.destination_address,
            "robot_id": delivery.robot_id,
            "customer_id": delivery.customer_id,
            "created_at": delivery.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for delivery in deliveries
    ]

    return jsonify({"statusCode": 200, "deliveries": deliveries_list})
    #returning Json data object containg all delieveries to the react frontend so it can display accordingly -> For Adriana


#Get delivery by 'id'-> Only accessible by admin
@views.route('/delivery/<int:delivery_id>')
def get_delivery_by_id(delivery_id, methods=['GET']):
    
    # Querying delivery by id from the database
    delivery = Delivery.query.get(delivery_id)

    if not delivery:
        return jsonify({'error': 'Delivery not found'}), 404
    
    # Formatting response data
    delivery_data = {
        'id': delivery.id,
        'user_id': delivery.user_id,
        'pickup_location': delivery.pickup_location,
        'dropoff_location': delivery.dropoff_location,
        'status': delivery.status.value,
        'created_at': delivery.created_at,
        'updated_at': delivery.updated_at
    }
    return jsonify({'delivery': delivery_data}), 200
    #returning Json data object containg the delivery to the react frontend so it can display accordingly -> For Adriana

# Create a New Delivery
@views.route('/delivery', methods=['POST'])
def create_delivery():
# Get & load the data from the request
    data = request.get_json()
#validate the required fields
    required_fields = ['pickup_location', 'dropoff_location']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
# Query for an available robot (optional: can also include additional checks if needed)
    robot = Robot.query.filter_by(status=RobotStatus.AVAILABLE).first()
    if not robot:
        return jsonify({'error': 'No available robots at the moment'}), 400
    
#create a new delivery object
    new_delivery = Delivery(
        user_id=data['user_id'],
        pickup_location=data['pickup_location'],
        dropoff_location=data['dropoff_location'],
        status=DeliveryStatus.PENDING,  # default status
        robot_id=robot.id  # Assign the available robot to the delivery
    )

#add the delivery object to the database
    db.session.add(new_delivery)
    db.session.commit()
    
    return jsonify({'message': 'Delivery created successfully', 'delivery_id': new_delivery.id}), 201
    #returning Json data object containg the delivery id to the react frontend so it can display accordingly -> For Adriana

# Delete a Delivery by 'id' -> Only accessible by admin
@views.route('/deliveries/<int:delivery_id>', methods=['DELETE'])
def delete_delivery(delivery_id):
    # Querying the delivery by id from the database
    delivery = Delivery.query.get(delivery_id)

    if not delivery:
        return jsonify({'error': 'Delivery not found'}), 404

    # Deleting the delivery from the database
    try:
        db.session.delete(delivery)
        db.session.commit()
        return jsonify({'message': f'Delivery {delivery_id} has been deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while trying to delete the delivery'}), 500
    
@views.route('/deliveries/<int:delivery_id>', methods=['PATCH'])
def update_delivery(delivery_id):
    # Querying the delivery by id from the database
    delivery = Delivery.query.get(delivery_id)

    if not delivery:
        return jsonify({'error': 'Delivery not found'}), 404

    # Get the data from the request body (JSON)
    data = request.get_json()

    # Only update the fields that were provided in the request body
    if 'pickup_location' in data:
        delivery.pickup_location = data['pickup_location']
    
    if 'dropoff_location' in data:
        delivery.dropoff_location = data['dropoff_location']
    
    if 'status' in data:
        try:
            delivery.status = DeliveryStatus[data['status'].upper()]
        except KeyError:
            return jsonify({'error': 'Invalid status provided'}), 400
    
    if 'robot_id' in data:
        # If robot_id is provided, update it
        robot = Robot.query.get(data['robot_id'])
        if not robot:
            return jsonify({'error': 'Robot not found'}), 404
        delivery.robot_id = robot.id

    # Update the updated_at field to the current timestamp
    delivery.updated_at = datetime.utcnow()

    # Commit the changes to the database
    try:
        db.session.commit()
        return jsonify({'message': 'Delivery updated successfully', 'delivery': delivery.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while updating the delivery'}), 500
    


#Robot routes
#get all robots -> Only accessible by admin
@views.route('/robots', methods=['GET'])
def get_all_robots():
    # Querying all robots from the database
    robots = Robot.query.all()

    # Formatting the response data
    robots_list = [
        {
            "id": robot.id,
            "status": robot.status.value,
            "battery_level": robot.battery_level,
            "current_location": robot.current_location,
            "last_active": robot.last_active.strftime("%Y-%m-%d %H:%M:%S")
        }
        for robot in robots
    ]

    return jsonify({"statusCode": 200, "robots": robots_list})
    #returning Json data object containg all robots to the react frontend so it can display accordingly -> For Adriana

#create a new robot -> Only accessible by admin
@views.route('/robots', methods=['POST'])
def create_robot():
    # Get the data from the request body (JSON)
    data = request.get_json()

    # Ensure the required fields are present in the request
    required_fields = ['battery_level', 'current_location', 'status']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Create a new robot object
    new_robot = Robot(
        battery_level=data['battery_level'],
        current_location=data['current_location'],
        status=RobotStatus[data['status'].upper()]  # Ensure the status is valid
    )

    # Add the new robot to the database
    try:
        db.session.add(new_robot)
        db.session.commit()
        return jsonify({'message': 'Robot created successfully', 'robot_id': new_robot.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while creating the robot'}), 500

# get robot by 'id' -> Only accessible by admin
@views.route('/robots/<int:robot_id>', methods=['GET'])
def get_robot_by_id(robot_id):
    # Query the robot by its ID
    robot = Robot.query.get(robot_id)

    # If the robot doesn't exist, return a 404 error
    if not robot:
        return jsonify({'error': 'Robot not found'}), 404

    # Format the response data
    robot_data = {
        "id": robot.id,
        "status": robot.status.value,
        "battery_level": robot.battery_level,
        "current_location": robot.current_location,
        "last_active": robot.last_active.strftime("%Y-%m-%d %H:%M:%S")
    }

    return jsonify({"statusCode": 200, "robot": robot_data})
    #returning Json data object containg the robot to the react frontend so it can display accordingly -> For Adriana

# Delete a Robot by 'id' -> Only accessible by admin
@views.route('/robots/<int:robot_id>', methods=['DELETE'])
def delete_robot(robot_id):
    # Query the robot by its ID
    robot = Robot.query.get(robot_id)

    # If the robot doesn't exist, return a 404 error
    if not robot:
        return jsonify({'error': 'Robot not found'}), 404

    # Delete the robot from the database
    try:
        db.session.delete(robot)
        db.session.commit()
        return jsonify({'message': 'Robot deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while deleting the robot'}), 500

# Update a Robot by 'id' -> Only accessible by admin
@views.route('/robots/<int:robot_id>', methods=['PATCH'])
def update_robot(robot_id):
    # Query the robot by its ID
    robot = Robot.query.get(robot_id)

    # If the robot doesn't exist, return a 404 error
    if not robot:
        return jsonify({'error': 'Robot not found'}), 404

    # Get the data from the request body
    data = request.get_json()

    # Update the fields if provided in the request
    if 'status' in data:
        robot.status = RobotStatus[data['status'].upper()]
    if 'battery_level' in data:
        robot.battery_level = data['battery_level']
    if 'current_location' in data:
        robot.current_location = data['current_location']
    if 'last_active' in data:
        robot.last_active = datetime.strptime(data['last_active'], "%Y-%m-%d %H:%M:%S")

    # Commit the changes to the database
    try:
        db.session.commit()
        return jsonify({'message': 'Robot updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while updating the robot'}), 500
    
#User routes
#get all users -> Only accessible by admin
@views.route('/users', methods=['GET'])
def get_all_users():
    # Query all users from the database
    users = User.query.all()

    # Formatting response data
    users_list = [
        {
            "user_id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.value,
            "created_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for user in users
    ]

    # Return the list of users in JSON format
    return jsonify({"statusCode": 200, "users": users_list})
#returning Json data object containg all users to the react frontend so it can display accordingly -> For Adriana

# create a new user -> Only accessible by admin
@views.route('/users', methods=['POST'])
def create_user():
    # Get the data from the request
    data = request.get_json()

    # Validate the required fields
    required_fields = ['full_name', 'email', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email already in use'}), 400

    # Create a new user
    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        role=data['role']
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Return the response
    return jsonify({'message': 'User created successfully', 'user_id': new_user.id}), 201

# get user by 'id' -> Only accessible by admin
@views.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    # Querying the user by ID
    user = User.query.get(user_id)

    # Check if the user exists
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Formatting the user data
    user_data = {
        'id': user.id,
        'full_name': user.full_name,
        'email': user.email,
        'role': user.role.value,
        'created_at': user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }

    # Returning the user details
    return jsonify({'user': user_data}), 200

# Delete a User by 'id' -> Only accessible by admin
@views.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Querying the user by ID
    user = User.query.get(user_id)

    # Check if the user exists
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Deleting the user
    db.session.delete(user)
    db.session.commit()

    # Returning a success response
    return jsonify({'message': 'User deleted successfully'}), 200

# Update a User by 'id' -> Only accessible by admin
@views.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    # Querying the user by ID
    user = User.query.get(user_id)

    # Check if the user exists
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get the request data
    data = request.get_json()

    # Update the user's fields if provided in the request
    if 'full_name' in data:
        user.full_name = data['full_name']
    if 'email' in data:
        user.email = data['email']
    if 'role' in data:
        # Ensure that the role is a valid UserRole
        if data['role'] in [role.value for role in UserRole]:
            user.role = UserRole(data['role'])
        else:
            return jsonify({'error': 'Invalid role'}), 400

    # Commit the changes to the database
    db.session.commit()

    # Return a success response with the updated user details
    return jsonify({
        'message': 'User updated successfully',
        'user': {
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role.value,
            'created_at': user.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
    }), 200



    # Get All Stores
    '''
@views.route('/stores', methods=['GET'])
def get_stores():
    stores = Store.query.all()
    stores_list = [
        {
            "id": store.id,
            "name": store.name,
            "location": store.location,
            "image": store.image,
            "products": [
                {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "description": product.description,
                    "image": product.image
                }
                for product in store.products
            ]
        }
        for store in stores
    ]
    return jsonify(stores_list)'''

# Get Store by ID
@views.route('/stores/<int:store_id>', methods=['GET'])
def get_store(store_id):
    store = Store.query.get(store_id)
    if not store:
        return jsonify({"error": "Store not found"}), 404

    store_data = {
        "id": store.id,
        "name": store.name,
        "location": store.location,
        "image": store.image,
        "products": [
            {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "description": product.description,
                "image": product.image
            }
            for product in store.products
        ]
    }
    return jsonify(store_data)

# Add a Store
@views.route('/stores', methods=['POST'])
def add_store():
    data = request.get_json()
    new_store = Store(
        name=data["name"],
        location=data["location"],
        image=data.get("image", "")
    )
    db.session.add(new_store)
    db.session.commit()
    return jsonify({"message": "Store added successfully!", "store_id": new_store.id}), 201

# Add a Product to a Store
@views.route('/stores/<int:store_id>/products', methods=['POST'])
def add_product(store_id):
    data = request.get_json()
    new_product = Product(
        name=data["name"],
        price=data["price"],
        description=data.get("description", ""),
        image=data.get("image", ""),
        store_id=store_id
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully!", "product_id": new_product.id}), 201

load_dotenv()

@views.route('/api/stores', methods=['GET'])
def get_stores():
    location = request.args.get('location')
    radius = request.args.get('radius', 1500)

    if not location:
        return jsonify({"error": "Location parameter required"}), 400

    lat, lng = map(float, location.split(','))

    url = 'https://places.googleapis.com/v1/places:searchNearby'
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': os.getenv("GOOGLE_API_KEY"),
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.photos'
    }
    data = {
        "includedTypes": ["restaurant"],
        "maxResultCount": 20,
        "locationRestriction": {
            "circle": {
                "center": {"latitude": lat, "longitude": lng},
                "radius": float(radius)
            }
        }
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()

    return jsonify(response.json())



