# MongoDB Setup Guide

## Quick Start (Using Docker)

### 1. Install Docker
If you don't have Docker installed, download it from [docker.com](https://docker.com)

### 2. Start MongoDB Container
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 3. Verify MongoDB is Running
```bash
docker ps
```
You should see a MongoDB container running on port 27017.

## Alternative: Install MongoDB Locally

### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Windows
1. Download MongoDB Community Server from [mongodb.com](https://mongodb.com)
2. Install and start the MongoDB service

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Test Connection

Once MongoDB is running, you can test the connection:

```bash
# Using MongoDB shell
mongosh mongodb://localhost:27017

# Or test from your app
cd Backend
npm run test
```

## Database Creation

The database `email_management` will be created automatically when you first run the application.

## Troubleshooting

- **Port 27017 already in use**: Check if MongoDB is already running
- **Connection refused**: Make sure MongoDB service is started
- **Permission denied**: Check if you have the right permissions to access the port
