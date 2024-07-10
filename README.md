# Project Title

**GymRat** - Mobile Working Out Dialog Application

![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![React Version](https://img.shields.io/badge/react-%3E%3D%2017.0.0-brightgreen)

## Overview

**GymRat** is a mobile application that demonstrates various exercises that users can choose based on their fitness level (beginner, intermediate, expert). The app also allows users to log their workouts and feelings, track their progress, and analyze their performance over time.

### Problem

Existing workout applications often lack features for logging daily feelings and tracking workout progress comprehensively. **GymRat** aims to fill this gap by providing users with the ability to log their workouts and feelings, helping them monitor their weight adaptation and workout history.

### User Profile

**GymRat** targets fitness enthusiasts who want to log their workout data and track their progress. The app must cater to users who are interested in comparing their workout data over weeks and need insights into their workout patterns.

### Features

- **Workout Logging**: Users can log their workout data to track and compare their progress over weeks.
- **Daily Feelings Logging**: Users can write down their feelings each day to monitor their body conditions.
- **Weekly Weight Tracking**: Users can see how much weight they lifted in a week and identify which body parts were less worked out.
- **Workout Frequency Filtering**: Users can use filters on the dashboard to see how many days they worked out specific body parts in a month.
- **Exercise Suggestions**: Users can explore different workouts and get suggestions to create their workout routine.

## Implementation

### Tech Stack

- **Backend**: Express.js, Node.js
- **Frontend**: React, Tailwind CSS, Material-UI (MUI), DaisyUI
- **Database**: MySQL, Knex.js
- **Libraries**: react-big-calendar

### APIs

- **External**: [Ninja API](https://api-ninjas.com/api/exercises) for exercise data (custom file will be created for usage).

### Sitemap

- **Login/Signup Page**: Initial page with buttons for login and signup.
- **Dashboard**: Contains a calendar for planning and logging workouts.
- **Navbar**: Options for navigation - Home, Exercise, Statistics, Profile.
- **Exercise Page**: Dropdown menus to select body part and difficulty level, displaying exercises based on selections.
- **Statistics Page**: Human body illustration showing workout percentages and weights compared with the previous week.
- **Profile Page**: Displays max weights for key exercises (bench press, squat, deadlift), user photo, username, and password.

### Mockups

Visual representations of app screens (to be created using tools like Figma or hand-drawn sketches).

### Data

Description of data and relationships, visually represented using diagrams or written descriptions.

### Endpoints

List of server endpoints:

- **/api/exercise**
- **/api/user** - /:id, /signup, /login
- **/api/home/:id**
- **/api/day/:id**
- **/api/week/:id**

### Authentication

**GymRat** will include user authentication and profile functionality, implemented using JWT for token-based authentication and bcrypt for secure password management.

## Roadmap

Project tasks are divided into sprints:

- **Sprint 1**: Backend implementation, login, and register page.
- **Sprint 2**: Dashboard page.
- **Sprint 3**: Remaining features.

## Nice-to-haves

Additional features that may be implemented if time permits:

- Advanced analytics and insights.
- Social features for sharing progress with friends.
- Integration with wearable devices for automatic workout logging.
