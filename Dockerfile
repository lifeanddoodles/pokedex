# Use an official Node runtime as a parent image
FROM node:22.2.0-alpine3.19

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY ./ ./

# Change ownership to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 5173

# Set environment variable to disable auto-opening browser
ENV BROWSER=none

# Command to run the application
CMD ["npm", "start"]
