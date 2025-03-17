from . import db
from flask_login import UserMixin
from datetime import datetime
from enum import Enum

# Enum classes for role and statuses
class UserRole(Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"
    OPERATOR = "operator"

class RobotStatus(Enum):
    AVAILABLE = "available"
    BUSY = "busy"
    MAINTENANCE = "maintenance"

class DeliveryStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in progress"
    COMPLETED = "completed"
    CANCELED = "canceled"


# Delivery Model
class Delivery(db.Model):
    #__tablename__ = "deliveries"

    id = db.Column(db.Integer, primary_key=True)
    pickup_location = db.Column(db.String(255), nullable=False)
    dropoff_location = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Enum(DeliveryStatus), nullable=False, default=DeliveryStatus.PENDING)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    robot_id = db.Column(db.Integer, db.ForeignKey("robot.id", ondelete="SET NULL"), nullable=True)

    def __repr__(self):
        return f"<Delivery {self.id} - {self.status.value}>"

# User Model
class User(db.Model):
    #__tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.CUSTOMER)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to deliveries (one-to-many)
    deliveries = db.relationship("Delivery", backref="user", cascade="all, delete", lazy=True)

    
    def __repr__(self):
        return f"<User {self.full_name} - {self.role.value}>"


 # Robot Model
class Robot(db.Model):
    #__tablename__ = "robots"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Enum(RobotStatus), nullable=False, default=RobotStatus.AVAILABLE)
    battery_level = db.Column(db.Integer, nullable=False)  # Percentage (0-100)
    current_location = db.Column(db.String(255), nullable=False)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to deliveries (one-to-many)
    deliveries = db.relationship("Delivery", backref="robot", lazy=True)

    def __repr__(self):
        return f"<Robot {self.id} - {self.status.value}>"

# Store Model
class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=True)  
    products = db.relationship('Product', backref='store', lazy=True) 

    def __repr__(self):
        return f"<Store {self.name}>"

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(255), nullable=True) 
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False) 

    def __repr__(self):
        return f"<Product {self.name}>"