# Public Chat Room

This is a web-based application that allows users to create or join a public chat room where they can text other members in that room.

Demo video is attached at the end.

## Basic Features

- Sign up/Login via email and password, or with Google.
- Profile page where users can update their name, email, password or delete account.
- Show list of real-time chat rooms.
- Search chat rooms by heading and description.
- Create a room and set the limitation of the number of its members.
- See online status of the room's members.
- Chatting is real-time.
- Emoji picker is also integrated.
- Send files.
- Dark mode can be enabled.

## Technologies

- ReactJS/[TailwindCSS](https://tailwindcss.com/) for the front-end.
- SpringBoot for creating API endpoints.
- PostgreSQL for storing users.
- OAuth2, JWT for authentication and authorization.
- [ElasticSearch](https://www.elastic.co/elasticsearch) for search rooms.
- WebSocket/STOMP for the real-time chatting and sending any type of the message, such as text, file, emoji, notification,…

## Installation

Docker is the easiest way to set up the environment and install all the dependencies for running this project.

To run this project locally, follow these steps:

1. Clone the repository.
2. Install [Docker](https://docs.docker.com/engine/install/).
3. To use Google’s OAuth 2.0 authentication system for login, you must set up a project in the Google API Console to obtain OAuth 2.0 credentials:
   - Follow the instructions on the [OpenID Connect page](https://developers.google.com/identity/openid-connect/openid-connect), starting in the section, "Setting up OAuth 2.0".
   - After completing the "Obtain OAuth 2.0 credentials" instructions, you should have a new OAuth Client with credentials consisting of a Client ID and a Client Secret.
   - In the "Set a redirect URI" sub-section, ensure that the Authorized redirect URIs field is set to http://localhost:8080/login/oauth2/code/google.
4. Set up Environment Variables:
   - In the docker-compose.yml file, assign your `Client ID` to the `GOOGLE_ID`, and `Client Secret` to the `GOOGLE_SECRET`.
   - You can update the values of other environment variables too, according to your preferences.
5. Navigate to the root directory and run `docker-compose up`.
