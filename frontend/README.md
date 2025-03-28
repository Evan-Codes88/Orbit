# Orbit Messaging App

## Overview

This messaging app is designed to provide real-time chat functionality similar to Kik and Facebook Messenger. Users can:

- Create an account, log in, and log out.
- Send and receive messages instantly.
- See other users' online/offline status.
- Update their profile picture and view others' profile pictures.

## Technologies Used

This project is built using modern frontend and backend technologies optimized for performance, scalability, and real-time interaction.

### **Frontend Technologies**

#### **React (Version 19.0.0)**

- **Purpose:** A JavaScript library for building interactive UIs with reusable components.
- **Industry Relevance:** Used by companies like Facebook and Airbnb.
- **Alternative:** Vue.js and Angular (React is preferred for its performance and ecosystem).
- **License:** MIT License.

#### **React-DOM (Version 19.0.0)**

- **Purpose:** Handles DOM-specific rendering for React components.
- **Alternative:** Preact (lighter but lacks full React compatibility).
- **License:** MIT License.

#### **React-Router & React-Router-Dom (Version 7.2.0)**

- **Purpose:** Enables client-side navigation within the app.
- **Industry Relevance:** Essential for Single Page Applications (SPAs).
- **Alternative:** Next.js (better for server-side rendering).
- **License:** MIT License.

#### **Tailwind CSS (Version 4.0.17) & Tailwind CSS Vite Plugin (Version 4.0.8)**

- **Purpose:** A utility-first CSS framework for styling the UI efficiently.
- **Industry Relevance:** Preferred for its speed and maintainability.
- **Alternative:** Bootstrap and Material UI (Tailwind offers better flexibility).
- **License:** MIT License.

#### **Lucide-React (Version 0.475.0)**

- **Purpose:** Provides a collection of customizable icons.
- **Alternative:** Font Awesome (but heavier in size).
- **License:** ISC License.

#### **React-Hot-Toast (Version 2.5.2)**

- **Purpose:** Displays notifications and alerts in the UI.
- **Alternative:** React-Toastify (more dependencies, slightly larger bundle size).
- **License:** MIT License.

#### **Zustand (Version 5.0.3)**

- **Purpose:** Lightweight state management for managing global state efficiently.
- **Alternative:** Redux and Context API (Zustand is simpler and more performant).
- **License:** MIT License.

### **Backend and Networking Technologies**

#### **Axios (Version 1.7.9)**

- **Purpose:** A promise-based HTTP client for making API requests.
- **Alternative:** Fetch API (Axios offers better request/response handling and interceptors).
- **License:** MIT License.

#### **Socket.IO-Client (Version 4.8.1)**

- **Purpose:** Enables real-time communication for instant messaging and online/offline status updates.
- **Industry Relevance:** Used in chat applications like Slack and WhatsApp.
- **Alternative:** WebSockets API (lower-level, requires manual implementation of features like reconnection).
- **License:** MIT License.

## Installation

To set up the project locally:

```sh
# Clone the repository
git clone https://github.com/your-repo/Orbit.git
cd Orbit

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Variables

Ensure you have a `.env` file in the root of the project directory with the following variables:

```
PORT=your_port
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit pull requests with improvements or bug fixes.

## Contact

For any issues or inquiries, please reach out via email or create a GitHub issue.

## Testing Tips

If you want to test the app, please use incognito mode in your browser. Regular browser sessions may cause issues with cookies, which can interfere with logging in and other functionality.
