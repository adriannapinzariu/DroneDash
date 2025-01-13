# CSC396_Sample

# team members
- Adrianna Pinzariu
- Jeremiah Mustapha
- Yousef Philopos
- Nizam Mohammed

# project pitch
- The Autonomous Delivery Robot streamlines small-package deliveries within college campuses. Designed to navigate predefined campus pathways, the robot ensures efficient and safe delivery of items such as books, food, and supplies between dormitories, libraries, and other key locations. Using a Raspberry Pi for onboard processing, the robot leverages ultrasonic sensors to avoid obstacles and follows predefined routes. A user-friendly web interface enables students and staff to schedule deliveries, track the robot’s progress in real-time, and receive confirmation upon delivery completion.
  
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


# nonfunctional reqs
