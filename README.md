# Interactive Landing Page with Scroll Animations

A modern, interactive landing page built with Next.js, Tailwind CSS, Three.js, and Framer Motion. Features smooth scroll animations, 3D elements, and responsive design.

## Features

- Animated 3D hero section with interactive elements
- Scroll-based parallax animations for a dynamic user experience
- Responsive design that works on all devices
- Modern UI with clean design aesthetics
- Performance-optimized animations and effects

## Technology Stack

- **Next.js**: React framework for production
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **Three.js**: For 3D elements and effects
- **Framer Motion**: For animations and transitions

## Local Development

First, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

Create your environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` to add your specific environment variables.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Vercel

This project is optimized for deployment on Vercel. Follow these steps:

### 1. Push your code to a Git repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repository-url>
git push -u origin main
```

### 2. Set up your project on Vercel

- Create an account on [Vercel](https://vercel.com)
- Create a new project and import your Git repository
- Link your repository to Vercel

### 3. Configure environment variables

- Go to your project settings in Vercel
- Navigate to the "Environment Variables" section
- Add all required environment variables from your `.env.local` file
- Make sure to mark variables correctly as Production, Preview, or Development

### 4. Deploy

- Vercel will automatically deploy your application
- For future updates, simply push to your main branch and Vercel will automatically redeploy

## Environment Variables

This project requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_APP_URL | The URL where your app is deployed | Yes |
| DATABASE_URL | Your database connection string (if applicable) | No |
| NEXTAUTH_URL | The URL where your app is deployed (for auth) | No |
| NEXTAUTH_SECRET | A secret string for NextAuth.js | No |

Refer to `.env.example` for a complete list of optional variables.

## License

[MIT](LICENSE)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
