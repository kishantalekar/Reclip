# Loom - Video Recording and Sharing Platform

Loom is a modern web application built with Next.js that enables users to record, upload, and share screen recordings and video content. It provides a seamless experience for creating and managing video content with features like screen recording, video playback, and user authentication.

## Features

- **Screen Recording**: Built-in screen recording functionality
- **Video Upload**: Support for uploading video content
- **User Authentication**: Secure user authentication system
- **Video Management**: Create, view, and manage video content
- **Responsive Design**: Mobile-friendly user interface
- **Profile Management**: User profile customization

## Tech Stack

- **Frontend**: Next.js 15.3.2, React 19
- **Styling**: TailwindCSS 4
- **Authentication**: Custom auth implementation with better-auth
- **Database**: PostgreSQL with Drizzle ORM
- **API Integration**: Xata Client
- **Type Safety**: TypeScript

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── (auth)/          # Authentication routes
│   ├── (root)/          # Main application routes
│   └── api/             # API endpoints
├── components/          # Reusable UI components
├── lib/                 # Core utilities and hooks
│   ├── actions/         # Server actions
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── public/              # Static assets
└── drizzle/             # Database schema and config
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with required configurations

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Key Components

- **RecordScreen**: Handles screen recording functionality
- **VideoPlayer**: Custom video playback component
- **VideoCard**: Displays video previews and metadata
- **Header**: Main navigation and user interface
- **FormField**: Reusable form input components

## Development

- Uses Next.js App Router for routing
- Implements server-side rendering for better performance
- Follows TypeScript best practices for type safety
- Utilizes custom hooks for screen recording and file handling

## Deployment

The application can be deployed on Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Configure environment variables
4. Deploy

## License

MIT
