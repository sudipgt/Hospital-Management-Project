# Hospital-Management-Project

# Hospital Management System

A full-stack Hospital Management System built with Django REST Framework and React.

## Live Demo

Frontend: https://hospital-management-project-nine.vercel.app  
Backend: https://hospital-management-project-1.onrender.com  
Admin Panel: https://hospital-management-project-1.onrender.com/admin/

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Context API
- CSS

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- Role-Based Permissions

### Database
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

## Features

### Admin
- Create doctor users
- Create reception users
- Manage backend data from Django Admin

### Reception
- Login
- Add patients
- View patients
- Book appointments
- View appointments

### Doctor
- Login
- View assigned appointments
- Write diagnosis and prescription
- Complete appointment after prescription

## Application Flow


Admin creates doctor and reception users
        ↓
Reception adds patient
        ↓
Reception books appointment with doctor
        ↓
Doctor logs in and sees assigned appointment
        ↓
Doctor writes prescription
        ↓
Appointment status becomes completed

Local Setup

Backend(command)

cd hospital_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

-Create .env file inside hospital_backend:
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173


-Frontend
cd hospital_frontend
npm install
npm run dev
