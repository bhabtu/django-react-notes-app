# Django-React Notes App

## Overview

This project is a full-stack **notetaking application** built with **Django (Django REST Framework) for the backend** and **React (Vite) for the frontend**. The goal was to refresh and reinforce my understanding of Django and React integration, authentication with JWT, and CRUD operations in React.

### Key Learning Goals:
- Integrating Django with React using a **REST API**
- Implementing **JWT-based authentication** for user login and token management
- Managing authentication state with **access and refresh tokens**
- Performing **CRUD operations** for notes

Users must **register and log in** to access the application, after which they can **create, update, and delete notes**.

## Features

- **User Authentication**: Register and log in using JWT authentication
- **Token Management**: Stores access and refresh tokens for authentication
- **Protected Routes**: Users must be authenticated to access the main application
- **CRUD Notes**: Users can create, read, update, and delete notes
- **Logout Functionality**: Clears authentication tokens and redirects to login

## Tech Stack

### Backend:

- Django
- Django REST Framework
- Simple JWT (for authentication)

### Frontend:

- React (Vite)
- React Router (for navigation)
- Axios (for API requests)

---

## Setup & Installation

### 1. Clone the Repository

```sh
git clone https://github.com/bhabtu/django-react-notes-app.git
cd django-react-notes-app
```

### 2. Backend Setup (Django API)

Create a virtual environment and activate it:

```sh
python -m venv env
env\Scripts\activate  # On Mac/Linux: source env/bin/activate
```

Navigate to the backend folder:

```sh
cd backend
```

Install dependencies:

```sh
pip install -r requirements.txt
```

Run database migrations:

```sh
python manage.py migrate
```

Start the backend server:

```sh
python manage.py runserver
```

The backend will be running at **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**.

### 3. Frontend Setup (React App)

Open a **new terminal** and navigate to the `frontend` folder:

```sh
cd ../frontend
```

Install dependencies:

```sh
npm install
```

Start the frontend server:

```sh
npm run dev
```

The frontend will be running at **[http://localhost:5173/](http://localhost:5173/)**.

**Note:** You need to keep **two terminals** open—one for the backend and one for the frontend, both running simultaneously.

---

## Usage Workflow

1. **User Authentication**:

   - When a user visits `http://localhost:5173/`, they are redirected to the login page.
   - If they are new, they can **register**, which creates an account and assigns JWT access/refresh tokens.
   - After logging in, the tokens are stored in the browser, allowing authenticated access to the app.

2. **Notes Management**:

   - Users can create **notes** by providing a title and text content.
   - Notes are displayed on the homepage, and users can **edit or delete** them.

3. **Logout**:

   - Users can log out, which **removes authentication tokens** and redirects them back to the login page.

---

## Future Improvements

- Improve UI/UX for a better user experience
- Add note-sharing functionality
- Implement sorting and searching for notes
- Deploy the app using cloud hosting
