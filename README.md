# Daily Task Planner

## Project Overview

The **Daily Task Planner** is a React-based productivity web application designed to help users organize and manage their daily activities efficiently.
Users can create tasks, track their progress, set deadlines, and remove completed tasks. The application also saves tasks locally using **localStorage**, ensuring that tasks persist even after the page is refreshed.

This project demonstrates the use of **React components, state management, and local storage** to build a simple yet practical productivity tool.

---

## Features

The application includes the following core features:

* **Add Tasks** – Users can create new tasks through an input form.
* **View Tasks** – All tasks are displayed in a task list.
* **Mark Tasks as Completed** – Users can toggle tasks between completed and incomplete.
* **Delete Tasks** – Tasks can be removed from the list when no longer needed.
* **Deadline Timer** – Users can track deadlines for tasks.
* **Notifications** – Alerts help users stay aware of upcoming deadlines.
* **Local Storage Persistence** – Tasks remain saved even after refreshing the page.

---

## Technologies Used

This project was built using modern front-end technologies:

* **React** – For building interactive UI components
* **Vite** – For fast development and build tooling
* **JavaScript (ES6+)** – Core programming language
* **CSS** – For styling the application
* **LocalStorage API** – For saving tasks locally in the browser

---

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/Bram-Alba/ALx_Project.git
```

2. Navigate into the project folder

```bash
cd ALx_Project
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

The application will run locally and can be accessed in your browser.

---

## Project Structure

```
src
 ├── components
 │   ├── Header.jsx
 │   ├── TaskForm.jsx
 │   ├── TaskList.jsx
 │   └── TaskItem.jsx
 │
 ├── App.jsx
 ├── main.jsx
 └── styles.css
```

Each component is responsible for a specific part of the user interface to keep the application modular and maintainable.

---

## Future Improvements

Potential improvements for future versions include:

* User authentication
* Cloud storage for tasks
* Task categories and filtering
* Drag-and-drop task reordering
* Mobile responsive enhancements

---

## Author

**Abraham Abaya**

GitHub:
https://github.com/Bram-Alba
