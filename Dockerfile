# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install frontend dependencies and build the frontend
RUN npm install --prefix frontend && npm run build --prefix frontend

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
