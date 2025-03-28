from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_cors import CORS
from dotenv import load_dotenv

db = SQLAlchemy()
DB_NAME = "database.db"

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'ThisIsNotTheKeyYouAreLookingFor_👀'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    CORS(app) 


    from .views import views
    from .auth import auth

    


    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from . import models 
    create_database(app)

    return app

def create_database(app):
    if not path.exists('dronedash/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print('Created Database!')
    else:
        print('Database already exists!')