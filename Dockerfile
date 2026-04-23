# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to the nodejs user
USER nodejs

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]</content>
<parameter name="filePath">/Users/harish.shete/Library/CloudStorage/OneDrive-PERFORCESOFTWARE,INC/Documents/projects/JAM projects/api-server/Dockerfile