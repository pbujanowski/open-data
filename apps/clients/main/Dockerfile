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

# Build the React app
RUN yarn build

# Use a lightweight web server to serve the built app
FROM docker.io/library/nginx:alpine

# Copy the built app to the Nginx web server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]