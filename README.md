famdoc - Find Your Doctor

famdoc is a full stack web application designed to connect patients with doctors through easy searching and appointment booking.

## Features
* **Role-Based Authentication:** A secure JWT login system distinguishes users between patients and doctors.
* **Search:** Find doctors based on area codes
* **Real-Time Appointment Hub:** View appointments or appointment requests as a patient and manage your appointments. As a doctor, view your scheduled appointments and also accept or decline new appointment requests.
* **Responsive UI:** Clean and modern interface built with React

## Tech Stack
* **Frontend:** React.js, HTML/CSS, Node.js
* **Backend:** Java 17, Spring Boot, Spring Security (JWT)
* **Database:** PostgreSQL (Dockerized)

## Quick Start
1. Navigate to the backend folder and ensure the Docker container is running: 
`docker run --name famdoc-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=famdoc -p 5432:5432 -d postgres`

2. Start the backend:
cd backend
./mvnw spring-boot:run

3. Start the frontend:
cd frontend
npm install
npm start

<img width="957" height="534" alt="image" src="https://github.com/user-attachments/assets/8d546cca-7482-4fa0-89d3-afa84d6457f9" />
<img width="959" height="535" alt="image" src="https://github.com/user-attachments/assets/fc44704c-0ae2-4538-9140-21d257a0bc72" />
<img width="957" height="534" alt="image" src="https://github.com/user-attachments/assets/b71fede2-0092-4821-a5d5-4924f4c78c96" />
<img width="958" height="537" alt="image" src="https://github.com/user-attachments/assets/380a75c6-fd9f-4130-be2c-3bbdda746617" />



