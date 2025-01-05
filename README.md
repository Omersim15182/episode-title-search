Series Episode Title Finder
📖 Overview
Series Episode Title Finder is a modern web application that allows users to retrieve episode titles of a series efficiently. This project integrates advanced technologies like Redis for caching, Axios for seamless HTTP communication, and a secure authentication system with JWT. The user interface is polished with Material-UI (MUI) for a professional look.

🚀 Features
Episode Title Retrieval: Users can fetch the title of specific episodes based on their selections.
Caching with Redis: Speeds up repeated requests by caching frequently accessed data.
Axios Integration: Simplified HTTP requests and responses in both frontend and backend.
Secure Authentication: Users log in securely with JWT, stored in HTTP-only cookies.
Secure Communication: All communication is encrypted with HTTPS.
Email Validation: Ensures valid email addresses during registration using email-validator.
Modern UI Design: Interactive and responsive frontend styled with Material-UI (MUI).
Scalable Backend: Built with Express.js and MongoDB.

🛠️ Technologies Used
Frontend
React: Build interactive and dynamic user interfaces.
Material-UI (MUI): Provides professional and consistent design.
Axios: Handles all HTTP requests to the backend.
HTTPS: Ensures secure communication.

Backend
Node.js with Express.js: Serves APIs and handles business logic.
Redis: Acts as a caching layer for fast data retrieval.
MongoDB: Stores user and series data.
Axios: Handles server-to-server HTTP requests.
JWT (JSON Web Tokens): Manages secure authentication.
email-validator: Validates email addresses during user registration.

Infrastructure
Docker: Containerized deployment of frontend, backend, and Redis.
Docker Compose: Orchestrates all services seamlessly.

⚙️ How It Works
1. User Registers and Logs In
The user registers an account with a valid email address, which is validated using email-validator.
After registration, the user logs in and receives a JWT token, stored securely in HTTP-only cookies for authentication.
2. User Selects an Episode
The user enters the series name, season, and episode number in the frontend.
The frontend sends this information as a request to the backend using Axios.
3. Authentication
The backend securely verifies the user's identity by checking the JWT token stored in the HTTP-only cookie to ensure the user is authorized.
4. Data Fetching
The backend checks Redis to see if the episode title is already cached:
If cached: The title is returned immediately.
If not cached: The backend fetches the title from MongoDB, caches it in Redis for future requests, and then returns it.
5. Frontend Display
The episode title is displayed on the frontend using Material-UI components for a smooth and responsive user experience.
📦 Setup Instructions
Prerequisites
Docker installed on your machine.
SSL certificate for HTTPS (e.g., via Let's Encrypt for production).
Self-signed certificates (localhost-key.pem and localhost.pem) are provided for local development.
Steps
Clone the Repository

bash            
Copy code <br>                                                                                                                                                                                                      
git clone https://github.com/Omersim15182/episode-namer.git  # 🖱️ Click to copy <br>                                                                                                                  
cd episode-namer <br>                                                                                                                                                                                         
Install Dependencies  <br>                                                                                                                                                                                   
Frontend:__                                                                                                                                                                                                    
bash__                                                                                                                                                                                                
Copy code__                                                                                                                                                                                                
cd client__                                                                                                                                                                                                
npm install  # 🖱️ Click to copy__                                                                                                                                                                                  
docker-compose up --build client  # 🖱️ Click to copy__                                                                                                                                                             
cd ..__                                                                                                                                                                                                
Backend:__                                                                                                                                                                                                
bash__                                                                                                                                                                                                
Copy code__                                                                                                                                                                                                
cd server__                                                                                                                                                                                                
npm install  # 🖱️ Click to copy__                                                                                                                                                                                  
cd ..__                                                                                                                                                                                                
Start Services with Docker Compose__                                                                                                                                                                               
bash__                                                                                                                                                                                                
Copy code__                                                                                                                                                                                                
docker-compose up --build  # 🖱️ Click to copy__                                                                                                                                                                    
Access the Application__                                                                                                                                                                                              
Frontend: https://localhost:3000__                                                                                                                                                                                    
Backend: https://localhost:3501__

## Environment Variables

To set up your local development environment, create a `.env` file in the root directory of the project and add the following variables:

API_KEY=your-api-key\                                                                                                                                                                                             
PORT_SERVER=3501\                                                                                                                                                                                                   
MONGO_URI=mongodb://127.0.0.1:27017/episode-namer\                                                                                                                                                                 
REDIS_HOST=127.0.0.1\                                                                                                                                                                                           
REDIS_PORT=6379\                                                                                                                                                                                               
TOKEN_SECRET=your-secret-key\                                                                                                                                                               

vbnet
Copy code

Make sure to replace `your-api-key` and `your-secret-key` with actual values before starting the application.

### How to set up:

1. Copy the environment variables above.
2. Create a `.env` file in the root of your project.
3. Paste the copied environment variables into the `.env` file.
4. Replace `your-api-key` and `your-secret-key` with your real API key and secret key.

🌟 Key Benefits
Simplified HTTP Communication: Axios streamlines client-server and server-server requests.
Efficient Caching: Redis reduces response times for repeated requests.
Secure: HTTPS, JWT, and HTTP-only cookies safeguard user data.
Modern UI: Material-UI enhances user experience with a clean design.
Scalable Architecture: Supports growing demands with Redis and MongoDB.
Containerized Deployment: Docker ensures all dependencies and services work seamlessly across environments.

Clone the project
bash
Copy code
git clone https://github.com/Omersim15182/episode-namer.git


[folder strcture]![Screenshot 2025-01-05 225721](https://github.com/user-attachments/assets/f0f62fe6-583e-4a70-a24b-592e5d92150b)

