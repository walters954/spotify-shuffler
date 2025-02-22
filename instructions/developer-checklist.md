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

4. **Playlist Selection**

    - [ ] Create a UI component for selecting a playlist.
    - [ ] Show selected playlist details for confirmation.

5. **Shuffling Logic**

    - [ ] Develop a reliable algorithm to shuffle track order randomly.
    - [ ] Ensure each shuffle produces a truly randomized order.

6. **Duplicate Handling**

    - [ ] Check for an existing shuffled playlist (via naming convention or secure cookie mapping).
    - [ ] If found, update the existing playlist; otherwise, create a new one named "Shuffled [Original Playlist Name]".

7. **Playlist Creation/Update**

    - [ ] Integrate with Spotify API endpoints to create a new playlist or update an existing one.
    - [ ] Verify that the shuffled playlist appears correctly in the Spotify account.

8. **Session & Data Management**

    - [ ] Store any necessary session data (like mapping between original and shuffled playlists) in secure cookies.
    - [ ] Ensure no persistent user data is stored in a database.

9. **Error Handling & Testing**

    - [ ] Implement error handling for failed API calls and token expiration.
    - [ ] Provide clear user feedback on errors.
    - [ ] Test all flows (login, playlist retrieval, shuffle, create/update) to ensure functionality and UI responsiveness.

10. **Final Verification**
    - [ ] Confirm that shuffling the same playlist multiple times reuses the existing shuffled playlist.
    - [ ] Perform code review and update documentation.
    - [ ] Validate the end-to-end user experience on both desktop and mobile.
