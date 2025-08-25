# Day-

## Description
A web app to organize your tasks and analyze your activities. Improve your time management by simply creating a task. This app is designed to make your day easier and more productive.


## Features 
- Create, edit, update and delete tasks.
- Analyze your activities with interactive charts
- Simple an responsive design

## Technologies
- **vite**  - Development and build tool
- HTML5
- Taildwind version 4.1
- Node.js
- Javascript
- Chart.js



## Available routes

- "/"      →  Home
- "/task" → Tasks CRUD
- "/data"  → Charts



## Instalation and use
 Install node_modules
```bash 
npm install
```
 Run database (json-server)
```bash 
npx json-server db/db.json
```
 Run
```bash 
npm run dev
```

# Project structure

```bash
│── db/                      
│   └── db.json            
│── public/                   
│   └── img/                
│       ├── logo_task.png
│       └── Person.png
│── src/                   
│   ├── css/                 
│   │   └── style.css
│   ├── js/               
│   │   ├── alerts.js        
│   │   ├── data.js          
│   │   ├── home.js         
│   │   ├── notFound.js      
│   │   └── task.js        
│   ├── routes/          
│   │   └── router.js        
│   ├── services/            
│   │   └── services.js
│   └── views/              
│       ├── data.html
│       ├── home.html
│       ├── notFound.html
│       └── task-manager.html
│── .gitignore
│── index.html               
│── LICENSE
│── main.js                 
│── package-lock.json
│── package.json
│── README.md             
│── vite.config.js          
```