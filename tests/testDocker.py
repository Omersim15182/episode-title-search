import docker
import requests
import redis
import subprocess
import time
import os

def start_docker_compose():
    
    print("Starting Docker Compose...")
    try:
        server_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'server')
        subprocess.run(["docker-compose", "-f", os.path.join(server_dir, "docker-compose.yml"), "up", "-d"], check=True)
        print("Docker Compose started successfully.")

        client_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'client')
        subprocess.run(["docker-compose", "-f", os.path.join(client_dir, "docker-compose.yml"), "up", "-d"], check=True)
        print("Client Docker Compose started successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error starting Docker Compose: {e}")
        return False
    return True

def check_service_health():
   
    # Docker containers check
    client = docker.from_env()
    containers = client.containers.list()
    container_names = {container.name for container in containers}

    expected_containers = ['server-server-1', 'server-mongo-1', 'server-redis-1', 'server-client-1']
    for container in expected_containers:
        print(f"Container {container} is {'running' if container in container_names else 'not running'}.")

    # Express server check
    try:
        response = requests.get("http://localhost:3500/health")
        print("Express server is good." if response.status_code == 200 else f"Express server returned {response.status_code}.")
    except requests.ConnectionError:
        print("Express server is not reachable.")

    # MongoDB check
    try:
        response = requests.get("http://localhost:27017")
        print("MongoDB is good." if response.status_code == 200 else f"MongoDB returned {response.status_code}.")
    except requests.ConnectionError:
        print("MongoDB is not reachable.")

    # Redis check
    try:
        client = redis.StrictRedis(host='localhost', port=6379, db=0)
        print("Redis is good." if client.ping() else "Redis returned an error.")
    except redis.ConnectionError:
        print("Redis is not reachable.")

    # Client service check
    try:
        response = requests.get("http://localhost:5173")
        print("Client service is good." if response.status_code == 200 else f"Client service returned {response.status_code}.")
    except requests.ConnectionError:
        print("Client service is not reachable.")

if __name__ == "__main__":
    if start_docker_compose():
        print("Waiting for containers to start...")
        time.sleep(10)  

        while True:
            print("\nChecking container and service health...\n")
            check_service_health()
            time.sleep(30)  