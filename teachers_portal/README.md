# Student Management System

This is a Ruby on Rails (RoR) application for managing students and their performance. The application provides features for teachers to log in, view, add, edit, delete, and filter students by name, subject, and marks. The application also includes pagination, search, sorting, and performance classification.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [Additional Notes](#additional-notes)
- [Contributing](#contributing)

## Features

- User Authentication with Devise
- Student listing with search, sorting, and filtering by subject and performance level
- Pagination using Kaminari
- Ability to add, edit, and delete student records
- Inline editing for student details
- Forgot password and sign-up features for users

## Requirements

- **Ruby**: 3.1.2
- **Rails**: 7.0.8
- **Database**: PostgreSQL (or SQLite for development)
- **Node.js** and **Yarn** (for JavaScript dependencies)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/student-management-system.git
cd student-management-system

Install Dependencies
Make sure you have Bundler installed:

- gem install bundler

Database Setup
Create and set up the database:

- rails db:create
- rails db:migrate

Running the Server

Start the Rails server with:

-rails server

By default, the application runs on http://localhost:3000. Open this URL in your browser to access the application.

Running Tests
To run the tests, use:

rails test


Additional Notes
Development Environment

Customization
Stylesheets: Styles are located in app/assets/stylesheets/. There are separate CSS files for different pages to avoid style conflicts.
JavaScript: JavaScript functions for UI interactions are located in app/javascript/.
```
