# Use lightweight Node image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

# Copy package files first (for Docker layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the application code
COPY . .

# Expose application port
EXPOSE 8081

# Start app using PM2 ecosystem file
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]

