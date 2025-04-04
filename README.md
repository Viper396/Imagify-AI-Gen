# Imagify AI Image Generator

Generate unique AI images using DALL-E.

## Setup

1. Clone repository

```bash
git clone <your-repo-url>
cd imagify-ai-gen-app
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create `.env` file in root:

```
MONGODB_URL=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Setup MongoDB

- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- Create new cluster
- Get connection string and add to `.env`

5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- AI image generation
- Image transformations
- User authentication
- Image sharing
- Cloud storage

## Deployment

1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Deploy on Vercel

- Connect your GitHub repository to [Vercel](https://vercel.com)
- Add environment variables in Vercel project settings
- Deploy!
