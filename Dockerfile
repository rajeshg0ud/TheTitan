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

# Expose the backend port
EXPOSE 5000

# Expose the frontend port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
