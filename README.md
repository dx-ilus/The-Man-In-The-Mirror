# 🪞 Man In The Mirror

A lightweight, feature-packed Discord utility bot built with **Discord.js v14**. Designed to automate role-based nickname formatting and streamline Question of the Day (QOTD) discussions with automated threads and reactions.

---

## ⚡ Features

* 🏷️ **Dynamic Role Nicknames:** Automatically formats member nicknames with customizable server badges (e.g., `﹒〔OWN〕#`, `﹒〔ADM〕#`) when administrative/staff roles are assigned.
* 🧹 **Automatic Nickname Cleanup:** Strips role prefixes and restores clean display names immediately when roles are removed.
* 💬 **Automated QOTD Threads:** Detects Question of the Day posts in designated channels and automatically creates a dedicated discussion thread.
* 🗳️ **Auto-Reactions:** Adds voting emojis (`👍` / `👎`) to QOTD posts to boost server engagement.
* 🎵 **Custom Presence Rotation:** Includes a rotating bot activity status with classic custom presence messages in which you can change.

---

## 🛠️ Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.11.0 or higher)
* A Discord Bot Token from the [Discord Developer Portal](https://discord.com/developers/applications)

### 1. Clone & Install Dependencies
```bash
git clone [https://github.com/dx-ilus/The-Man-In-The-Mirror](https://github.com/dx-ilus/The-Man-In-The-Mirror)
cd Man-In-The-Mirror
npm install discord.js dotenv
