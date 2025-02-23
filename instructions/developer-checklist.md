### Developer Checklist for Spotify Playlist Shuffler

1. **Project Setup**

    - [x] Initialize a Next.js project.
    - [x] Configure Tailwind CSS for styling.
    - [x] Integrate shadcn UI components.

2. **Spotify Authentication**

    - [x] Implement Spotify OAuth login.
    - [x] Configure environment variables for client ID, secret, and redirect URI.
    - [x] Securely manage tokens and session data using secure cookies.

3. **Playlist Retrieval**

    - [x] Call Spotify API to fetch authenticated user playlists.
    - [x] Display playlists with key details (name, cover image, track count).
    - [x] Implement a searchable list for easier selection.
    - [x] Filter out shuffled playlists from the grid view.

4. **Playlist Selection**

    - [x] Create a UI component for selecting a playlist.
    - [x] Show selected playlist details for confirmation.
    - [x] Display preview of shuffled tracks before saving.
    - [x] Allow reshuffling tracks in preview.

5. **Shuffling Logic**

    - [x] Develop a reliable algorithm to shuffle track order randomly.
    - [x] Ensure each shuffle produces a truly randomized order.
    - [x] Display the shuffled playlist in the UI.
    - [x] Allow the user to shuffle again without creating a new playlist.

6. **Duplicate Handling**

    - [x] Check for an existing shuffled playlist (via naming convention or secure cookie mapping).
    - [x] If found, update the existing playlist; otherwise, create a new one named "Shuffled [Original Playlist Name]".

7. **Playlist Creation/Update**

    - [x] Integrate with Spotify API endpoints to create a new playlist or update an existing one.
    - [x] Verify that the shuffled playlist appears correctly in the Spotify account.
    - [x] Implement deletion functionality for shuffled playlists:
        - [x] Add a global button to delete all shuffled playlists
        - [x] Add individual delete buttons for each shuffled playlist
        - [x] Create confirmation dialogs before deletion
        - [x] Integrate with Spotify API to perform deletions
        - [x] Update UI to reflect deleted playlists immediately

8. **Session & Data Management**

    - [x] Store any necessary session data (like mapping between original and shuffled playlists) in secure cookies.
    - [x] Ensure no persistent user data is stored in a database.

9. **Error Handling & Testing**

    - [x] Implement error handling for failed API calls and token expiration.
    - [x] Provide clear user feedback on errors.
    - [x] Test all flows (login, playlist retrieval, shuffle, create/update) to ensure functionality and UI responsiveness.

10. **Final Verification**
    - [x] Confirm that shuffling the same playlist multiple times reuses the existing shuffled playlist.
    - [x] Perform code review and update documentation.
    - [x] Validate the end-to-end user experience on both desktop and mobile.
