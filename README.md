# 🎮 Tatris - A Tetris Game in HTML/CSS/JavaScript

Tatris is a simple web-based implementation of the classic Tetris block game. Built using vanilla JavaScript, HTML, and CSS — this game is lightweight, responsive, and containerized using Docker for easy deployment. A Kubernetes manifest is also included for deploying to a cluster.

---

## 📸 Game Preview

> *(Optional: Add a screenshot here)*  
> ![Tatris Screenshot](./screenshot.png)

---

## 🚀 Features

- Classic Tetris gameplay
- Clean and responsive UI
- No external libraries used — pure JS/CSS/HTML
- Dockerized for easy deployment
- Kubernetes manifest (`pod.yml`) included

---

## 🛠️ Tech Stack

- HTML5 / CSS3
- JavaScript (Vanilla)
- Docker
- Kubernetes (Pod deployment)

---

## 📦 Run Locally

### Option 1: Open Directly in Browser

1. Clone the repository:
   ```bash
   git clone https://github.com/puspender01/tatris.git
   cd tatris
Open index.html in your browser:

arduino
Copy
Edit
double-click index.html
Option 2: Run with Docker
bash
Copy
Edit
# Build Docker image
docker build -t tatris-game .

# Run container
docker run -d -p 8080:80 tatris-game

# Open in browser
http://localhost:8080
Option 3: Deploy to Kubernetes
Make sure your cluster is up and running.

Apply the pod manifest:

bash
Copy
Edit
kubectl apply -f pod.yml
Port-forward to access the game:

bash
Copy
Edit
kubectl port-forward pod/puspod 9090:80
# Open in browser: http://localhost:9090
📁 Project Structure
bash
Copy
Edit
tatris/
├── index.html         # Main game UI
├── style.css          # Game styling
├── script.js          # Game logic
├── Dockerfile         # Docker build file
├── pod.yml            # Kubernetes pod definition
🙋 Author
Puspender Kumar
GitHub

