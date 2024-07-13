# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt inside the container
RUN npm rebuild bcrypt

# Build the frontend
RUN cd frontend && npm install && npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
