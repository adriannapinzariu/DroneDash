from flask import Blueprint, render_template, request

auth = Blueprint('auth', __name__)

#Login
@auth.route('/login', methods=['GET', 'POST'])
def login():
    return "<h1>Login</h1>"
    #seperate code blocks for GET and POST
    #return render_template("login.html") # This is the template that will be rendered Later!!! -> For Adriana    

#sign up
@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    return "<h1>Sign Up</h1>"
    #return render_template("sign_up.html") # This is the template that will be rendered Later!!! -> For Adriana

#logout
@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    return "<h1>Logout</h1>"
    #return render_template("logout.html") # This is the template that will be rendered Later!!! -> For Adriana

