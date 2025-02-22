# Spotify Playlist Shuffler

A modern web application that creates truly random shuffled versions of your Spotify playlists. Unlike Spotify's built-in shuffle feature which uses weighted randomization, this app provides genuine random shuffling for better variety in your music listening experience.

## Why This Exists

Spotify's shuffle algorithm uses "weighted randomness" which can make some songs play more often than others. This app solves that problem by:

-   Creating truly random shuffled versions of your playlists
-   Keeping your original playlists intact
-   Allowing you to preview and reshuffle until you're happy with the order

## Features

-   **True Random Shuffle**: Uses a reliable shuffling algorithm for genuine randomness
-   **Preview Before Saving**: See and adjust the shuffled order before saving
-   **Duplicate Prevention**: Automatically updates existing shuffled playlists instead of creating duplicates
-   **Dark Mode Support**: Choose between light, dark, or system theme
-   **Responsive Design**: Works seamlessly on both desktop and mobile devices
-   **Secure Authentication**: Uses Spotify OAuth for secure access to your playlists
-   **Zero Data Storage**: No user data is stored; everything is handled within your session

## Getting Started

### Prerequisites

-   Node.js 18.0.0 or later
-   PNPM package manager
-   A Spotify account
-   Spotify Developer credentials (Client ID and Secret)

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Spotify credentials:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_CALLBACK_URL=http://localhost:3000/api/auth/callback/spotify
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Installation

```bash
# Install dependencies
pnpm install

# Build the application
pnpm build

# Start the production server
pnpm start
```

## How to Use

1. **Login**: Click "Sign in with Spotify" to securely connect your account
2. **Select**: Choose any playlist you want to shuffle
3. **Preview**: View the first 15 tracks in the new shuffled order
4. **Adjust**: Click "Shuffle Again" if you want a different order
5. **Save**: Click "Save to Spotify" to create or update your shuffled playlist

The app will create a new playlist named "Shuffled [Original Playlist Name]" or update an existing one if you've shuffled this playlist before.

## Tech Stack

-   **Frontend**: Next.js 14, TailwindCSS, shadcn/ui components
-   **Authentication**: NextAuth.js with Spotify OAuth
-   **State Management**: React Hooks and Context
-   **Styling**: Tailwind CSS with custom theme support
-   **Icons**: Lucide React
-   **Package Management**: PNPM

## Development

```bash
# Install a new shadcn component
pnpm dlx shadcn@latest add [component-name]

# Format code
pnpm format

# Lint and fix issues
pnpm lint:fix

# Build for production
pnpm build
```

## Security

-   No database or persistent storage used
-   All data is handled transiently within the session
-   Secure cookie-based session management
-   OAuth tokens are never exposed to the client

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT license.

## Acknowledgments

-   [Next.js](https://nextjs.org) - The React Framework
-   [shadcn/ui](https://ui.shadcn.com) - UI Components
-   [Spotify Web API](https://developer.spotify.com/documentation/web-api) - Spotify API
-   [NextAuth.js](https://next-auth.js.org) - Authentication
-   [Tailwind CSS](https://tailwindcss.com) - Styling
