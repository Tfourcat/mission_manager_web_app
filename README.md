# Mission manager web app

Little app made with:
- NodeJS
- React and material UI for frontend
- Express for backend

Contains an authentication app where admins can register new employees.
An other app where expert can add new missions assigned to technicians.
And technicians can validate missions assigned to them.

# Dependencies

- nodejs >= v14.7.0
- docker >= v19.03.12
- docker-compose >= v1.26.2

# Quick start

## Dev

```zsh
$> git clone https://github.com/Tfourcat/mission_manager_web_app.git

$> cd mission_manager_web_app

$> docker-compose build

$> docker-compose up [-d] 
```

### A default admin is created: 

- Login: admin

- Password: xyz

### Routes are:

- localhost:3000 for the mission manager app

- localhost:8080 for the authentication app
