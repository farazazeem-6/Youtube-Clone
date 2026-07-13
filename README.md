# 🎬 YouTube Clone

A responsive YouTube-style video streaming app built with **React**, **Redux Toolkit**, **React Router**, **Tailwind CSS**, and **Firebase Authentication**.

---

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10.1-764ABC?style=for-the-badge&logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

</div>

---

# 📚 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Configuration](#-configuration)
5. [Folder Structure](#-folder-structure)
6. [Installation](#-installation)
7. [Future Enhancements](#-future-enhancements)
8. [Contributing](#-contributing)
9. [License](#-license)

---

# 📌 Overview

This project replicates the core experience of YouTube with a modern React architecture. It includes:

* Home page with trending videos and channel discovery
* Search suggestions and results
* Watch page with embedded video playback
* Liked videos, watch later, history, and subscription flows
* Global state management with Redux Toolkit
* Responsive UI optimized for mobile, tablet, and desktop

---

# ✨ Features

* Trending / popular video feed
* Search with live suggestions
* Embedded YouTube video player
* Related video recommendations
* Like / unlike videos
* Save videos to watch later
* Watch history tracking
* Subscription-style channel state
* Firebase authentication support
* Skeleton loading states for improved UX

---

# 🧩 Tech Stack

| Category       | Tools / Libraries                     |
| -------------- | ------------------------------------- |
| Framework      | React 19                              |
| State          | Redux Toolkit                         |
| Routing        | React Router DOM 7                    |
| Styling        | Tailwind CSS + Styled Components      |
| UI Components  | Material UI                           |
| Build Tool     | Vite                                  |
| API            | YouTube Data API v3                   |
| Firebase       | Firebase Auth + Analytics             |

---

# 🔧 Configuration

The project reads the YouTube API key from a Vite environment variable.

Create a `.env` file in the project root with the following content:

```bash
VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
```

> Firebase configuration is already included in `src/utils/firebase.js`.

---

# 🗂 Folder Structure

```text
src/
├── Layout/
│   └── Layout.jsx
├── assets/
├── components/
│   ├── AuthenticationModal.jsx
│   ├── CommentsCard.jsx
│   ├── ConfirmationModal.jsx
│   ├── DownloadButton.jsx
│   ├── LikeButton.jsx
│   ├── NavButton.jsx
│   ├── ProfileDropDown.jsx
│   ├── ReportModal.jsx
│   ├── ResultCardShimmer.jsx
│   ├── SearchResultCard.jsx
│   ├── SideBarButton.jsx
│   ├── SubscribeButton.jsx
│   ├── SuggestionCard.jsx
│   ├── SuggestionCardShimmer.jsx
│   ├── ToasterNotification.jsx
│   ├── VideoCard.jsx
│   ├── VideoCardShimmer.jsx
│   ├── WatchLaterButton.jsx
│   └── Wrapper.jsx
├── hooks/
│   ├── useFetchCategoryVideos.js
│   ├── useFetchChannels.js
│   ├── useFetchComments.js
│   ├── useFetchNextPageCategoryVideos.js
│   ├── useFetchNextPagePopularVideos.js
│   ├── useFetchPopularVideos.js
│   ├── useFetchSearchResults.js
│   ├── useFetchSingleVideoData.js
│   ├── useFetchSuggestions.js
│   ├── useIsDownloaded.js
│   └── useVideoDownload.js
├── store/
│   ├── appStore.js
│   └── slices/
│       ├── channelSlice.js
│       ├── commentsSlice.js
│       ├── downloadsSlice.js
│       ├── filterSlice.js
│       ├── historySlice.js
│       ├── likedSlice.js
│       ├── moviesSlice.js
│       ├── reportSlice.js
│       ├── searchSlice.js
│       ├── sideBarToggleSlice.js
│       ├── subscriptionSlice.js
│       ├── userSlice.js
│       └── watchLaterSlice.js
├── utils/
│   ├── constants.js
│   ├── firebase.js
│   ├── socialAuth.js
│   └── validations.js
└── views/
    ├── Body.jsx
    ├── ButtonList.jsx
    ├── CommentsList.jsx
    ├── DownloadsPage.jsx
    ├── Header.jsx
    ├── HistoryPage.jsx
    ├── LikedVideosPage.jsx
    ├── MainContainer.jsx
    ├── ReportPage.jsx
    ├── SearchResultsPage.jsx
    ├── Sidebar.jsx
    ├── SubscriptionsPage.jsx
    ├── SuggestionPage.jsx
    ├── VideoContainer.jsx
    ├── WatchLaterPage.jsx
    └── WatchPage.jsx
```

---

# 🚀 Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd "Youtube-Clone"
npm install
```

Create `.env`:

```bash
VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🛠 Future Enhancements

* Dark mode / theme switch
* Full authentication and user profiles
* Backend-powered subscriptions and comments
* Video upload support
* Offline download improvements
* Multi-language support

---

# 🤝 Contributing

Contributions are welcome. Open an issue or submit a pull request.

---

# 📜 License

MIT License
