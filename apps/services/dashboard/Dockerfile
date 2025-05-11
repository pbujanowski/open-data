# Use the official Node.js image as the base image
FROM docker.io/library/node:20 AS build

# Set the working directory
WORKDIR /app

# Copy workspace-specific package.json
COPY ./package.json ./

# Install dependencies using Yarn Workspaces
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN yarn build

# Expose the application port
EXPOSE 5002

# Start the application
CMD ["yarn", "start:prod"]