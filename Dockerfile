# First stage named "builder"

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install with legacy peer deps flag to handle MUI dependencies
RUN npm install --legacy-peer-deps

COPY . .

# This is the Second stage : use lightweight runtime image.
FROM node:lts-alpine AS development

WORKDIR /app

 # Copy files from builder stage to current stage
COPY --from=builder /app /app/

ENV NODE_ENV=development

EXPOSE 3000

CMD [ "npm", "run", "dev" ]


# --from=builder: Specifies the source stage named "builder"

# First /app: The source path in the builder stage

# Second /app: The destination path in the current stage