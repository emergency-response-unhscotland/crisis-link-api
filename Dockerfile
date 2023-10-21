# Use a Node.js base image
FROM node:20-slim

# Initialize PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json .

# Copy pnpm-lock.yaml
COPY pnpm-lock.yaml .

# Install application dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

RUN pnpm build

# Generate the Prisma client
RUN pnpm prisma generate

# Expose the port the NestJS app is running on
EXPOSE 3000

# Start the NestJS application
CMD ["pnpm", "start"]
