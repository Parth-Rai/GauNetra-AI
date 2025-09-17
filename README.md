# GauNetra AI 🐄

**India's Premier AI for Accurate Cattle Breed Recognition**

A full-stack web application built for the **Smart India Hackathon** to solve the challenge of accurate cattle and buffalo breed identification for the Department of Animal Husbandry & Dairying. This repository showcases the development of the project's web portal and backend systems.

-----

## 🎯 Problem Statement

**ID: 25004 (Ministry of Fisheries, Animal Husbandry & Dairying)**

Field Level Workers (FLWs) using the Bharat Pashudhan App (BPA) often misclassify cattle breeds due to a lack of breed-specific awareness. This leads to unreliable data in the national livestock database, which negatively impacts genetic improvement programs, disease control, and policy planning. Our project aims to solve this by providing an AI-driven decision-support tool.

-----

## ✨ Our Solution

GauNetra AI is a modern, full-stack application designed to empower FLWs with instant and reliable breed identification. The system consists of two main parts:

1.  **A Mobile-First Application:** For FLWs in the field to capture an image and get an instant AI-powered prediction of the animal's breed.
2.  **A Web-Based Dashboard:** For officials and researchers to view and analyze the collected data in real-time, visualizing breed distributions and identification locations across the country.

This project is the web-based portal, featuring a live demo of the AI model and the data analysis dashboard.

-----

## 🚀 Key Features

  * **Stunning Cover Page:** An immersive, animated entry point to the application.
  * **Live AI Demo:** An interactive drag-and-drop interface to test the breed recognition model in real-time.
  * **Data Dashboard:** A sleek dashboard with key metrics, a breed distribution chart, and a live map of all identifications.
  * **Modern "Glassmorphism" UI:** A seamless, stylish, and professional user interface with a dark theme and blue accents.
  * **Full-Stack Architecture:** Built with a robust separation of concerns between the frontend, backend, and machine learning service.

-----

## 🛠️ Technology Stack

| Component      | Technologies                                            |
| -------------- | ------------------------------------------------------- |
| **Frontend** | React, React Router, HTML5, CSS3, `react-icons`         |
| **Backend** | Node.js, Express.js                                     |
| **Database** | PostgreSQL                                              |
| **ML Inference** | Python, TensorFlow Lite                                 |
| **DevOps & Tools** | Git, GitHub, `npm`, `dotenv`, `concurrently`, `nodemon` |

-----

## 📸 Screenshots

| Cover Page                                       | Main Page                                 |
| ------------------------------------------------ | ----------------------------------------- |
| ![Cover Page](<INSERT_SCREENSHOT_URL_HERE>)      | ![Main Page](<INSERT_SCREENSHOT_URL_HERE>)      |
| **Live Demo & Dashboard** |                                           |
| ![Live Demo & Dashboard](<INSERT_SCREENSHOT_URL_HERE>) |                                           |


-----

## ⚙️ Setup and Installation

Follow these steps to run the project locally.

### Prerequisites

  * Node.js (v18 or later)
  * npm
  * Python (v3.9 or later)
  * PostgreSQL

### 1\. Clone the Repository

```bash
git clone https://github.com/parthsharmaa/GauNetra-AI.git
cd GauNetra-AI
```

### 2\. Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create the .env file for environment variables
# Then, fill in your PostgreSQL details
```

Your `backend/.env` file should look like this:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sih_breeds
DB_PASSWORD=your_password_here
DB_PORT=5432
```

*Make sure you have created the `sih_breeds` database and the `predictions` table in PostgreSQL.*

### 3\. Frontend Setup

```bash
# Navigate to the frontend folder from the root
cd ../frontend

# Install dependencies
npm install
```

### 4\. Run the Application

```bash
# Go back to the root folder
cd ..

# Run both the backend and frontend servers concurrently
npm run dev
```

The application will be available at `http://localhost:3000`.

-----

## 📧 Contact
Parth Rai - [GitHub Profile](https://github.com/Parth-Rai)

-----

## 📜 License

This project is licensed under the MIT License.
