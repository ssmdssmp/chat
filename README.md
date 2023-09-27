# React Native RealTime Chat

![Chat App Gif](https://github.com/ssmdssmp/chat/assets/93074427/14b834da-dda4-42df-bf5a-476fe495b8d4)

**Backend for this project**: https://github.com/ssmdssmp/chat-backend

**Tech Stack:** React Native, TypeScript, Firebase, Socket.io, styled-components

**Description:** This is a real-time chat application with automatic message and chat updates.

*Current features*:

- Realtime updates for both single chat screen and list screen
- Auth: sign in, sign up, logout
- Message statuses: uploading, sent, received
- User search and new chat creation

*Upcoming features*:

- Add photo or file to message
- Change user info
- Onboarding navigator
- Online and last seen status for users
- Chat folders
- Typing status
- Search by message or username at list screen
- Code cleaning

## Usage

You can create new account or use existing accounts for testing:

Login: user.1@gmail.com

Password: 123123123

To test realtime updates you will need to run another simulator with another creditentials, create or use another test account:

Login: user.2@gmail.com

Password: 12312313

You can use user search to find an account to start chat with. Searchable accounts:

andrew.wiggins

steph.curry

draymond.green

user.1

user.2


## Start the project

- For this project backend you also need to run backend (https://github.com/ssmdssmp/chat-backend)
- `npm install`
- `cd ios && pod install `
- `../ && npx react-native start`
  
## Prerequisites!

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

