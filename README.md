# Dashboard App

## Overview

This assessment was to create a dashboard that displayed various charts that were created using information from a Django backend API. The frontend was built using React, axios, and Highcharts. This assessment uses Docker

## Setup Instructions

### Frontend
- navigate to the directory where your project is located
- npm install
- npm run dev

### Backend
- navigate to the directory where your project is located
- install dependencies

- apply the database migrations
    python manage.py migrate
- Start backend
    python manage.py runserver


- frontend should be avaliable at http://localhost:3000 
- backend should be avaliable at http://localhost:8000

## Libraries and Tools Used

### Frontend:
- React
- Next.js
- Highcharts
-tailwind CSS

### Backend: 
- Django
- Django REST Framework



## Approach and Thought Process

1. Since this project has two separate parts I started on the backend. I first started by getting all the neccessary things needed to create a Django project and learn what it takes to get it running. Once I get that down I worked on creating the API datasets up and running
2. Once I got this down I started working on the front-end fetching of data through the API calls from the Django backend. This allowed for me to test to make sure the calls were working and the backend was responding the way I wanted it to. 
3. I then started to work on the charts and displaying the data. This was the hardest part for me but once I got all the data to show up I worked on the responsive design. 
4. I then tackled error handling to make sure there the user knew if there was an error. 

# Conclusion

Thank you for allowing me to show you my skills in this assessment. I hope that this was all up to your standards and I hope that I can only learn from you all. 
