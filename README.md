# Autonomous Delivery Robot for College Campus Deliveries

# Commands to Run Repo
- git clone https://github.com/adriannapinzariu/CSC396_Sample.git
- cd API
- python3 -m venv env
- source env/bin/activate 
- pip install fastapi uvicorn (if this doesn't work on vscode change your python interpreter)
- uvicorn main:app --reload

# team members
- Adrianna Pinzariu
- Jeremiah Mustapha
- Yousef Philopos
- Nizam Mohammed

# project pitch
- The Autonomous Delivery Robot streamlines small-package deliveries within college campuses. Designed to navigate predefined campus pathways, the robot delivers items such as books, food, and supplies between dormitories, libraries, etc. The robot leverages ultrasonic sensors to avoid obstacles and follows predefined routes by using a Raspberry Pi. A user-friendly web interface enables students and staff to schedule deliveries, track the robot’s progress in real-time, and receive confirmation upon delivery completion.
  
# frontend 
- The front end of the Autonomous Delivery Robot allows users to interact with the system. Users can schedule deliveries to predefined locations, track the robot's movement in real-time on a live map, and receive status updates, such as delivery completion or obstacle detection. The interface dynamically updates to reflect the robot’s progress and notifies users about any changes in delivery status. The front end is made using React.js, HTML and CSS for styling, Axios managing HTTP requests to the backend, and WebSocket integration enabling real-time updates.
  
- Tech stack
  - React.js
  - Javascript
  - HTML
  - CSS
  - Axios
  - WebSocket

# backend
- The back end processes user requests, manages the robot’s navigation logic, and stores data such as delivery details and logs. It uses Flask to handle RESTful API endpoints for scheduling deliveries, retrieving the robot’s current location and status, and logging completed activities. The PostgreSQL stores user sessions and delivery history. Communication with the Raspberry Pi hardware is facilitated by Python’s GPIO library, which controls the motors and sensors. WebSocket integration enables real-time updates.

- Tech stack
  - Flask
  - PostgreSQL
  - RESTful APIs (scheduling deliveries, fetching robot location and status, logging completed activities)
  - Python/GPIO library for pi communication
  - WebSocket

# hardware
- Pinzariu's Raspberry Pi
- Motor driver (e.g., L298N) connected to the Raspberry Pi GPIO pins
- DC motors and chassis 
- Ultrasonic sensors 
- Power supply for the Pi and motors.

# functional reqs
- Users should be able to schedule deliveries by selecting pickup and drop-off locations, track the robot’s movement via live map, receive notifications about delivery status i.e. "Delivery Started" and "Delivery Completed".
- Raspberry Pi Robot should navigate autonomously along predefined paths, avoid obstacles detected by its sensors, log all completed deliveries, and log all time and route details in the database.
- Administrators should be able to monitor and update robot routes through the backend, optimize navigation for new locations or conditions, and review delivery logs for troubleshooting.

# nonfunctional reqs

- Performance:
  - The platform should load within 2 seconds for 95% of users, even during peak traffic periods such as holidays or major events.
- Security:
  - All sensitive user data, including payment information, must be encrypted using AES-256 encryption to ensure data confidentiality and integrity.
- Usability:
  - The user interface should achieve a User Satisfaction Score of at least 85% for ease of use, based on surveys or user feedback.
- Scalability:
  - The system should support up to 100 users with minimal performance degradation during high-demand periods.
