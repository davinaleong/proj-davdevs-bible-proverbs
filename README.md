# Dav/Devs Bible Proverbs

A modern, responsive web application for reading the Book of Proverbs with multiple Bible translations. Built with Next.js and powered by bible-api.com.

## Features

- 📖 **Daily Proverbs**: Automatically displays the chapter corresponding to today's date
- 🌍 **Multiple Translations**: Choose from 6 Bible translations:
  - **WEB** - World English Bible (default)
  - **ASV** - American Standard Version (1901)
  - **BBE** - Bible in Basic English
  - **Darby** - Darby Bible
  - **DRA** - Douay-Rheims 1899 American Edition
  - **KJV** - King James Version
- 🎨 **15+ Beautiful Themes**: From minimal to luxurious designs
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast & Offline-Ready**: Progressive Web App capabilities
- 🔧 **Customizable**: Text size, themes, date formats, and more
- 🔒 **Privacy-First**: All settings stored locally, no tracking

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/proj-davdevs-bible-proverbs.git
cd proj-davdevs-bible-proverbs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/         # Reusable UI components
├── content/           # Static content (Terms, Privacy)
├── data/              # JSON configuration files
├── helpers/           # Utility functions and API services
├── chapters/          # Chapter selection page
├── translations/      # Translation selection page
├── settings/          # User settings page
├── privacy/           # Privacy policy page
└── terms/             # Terms of service page
```

## API Integration

This application uses [bible-api.com](https://bible-api.com/) to fetch Bible content:
- Rate limited to 15 requests per 30 seconds
- CORS enabled for browser usage
- Public domain and freely-licensed translations
- RESTful JSON API

## User Flow

1. **Select Translation** → Choose your preferred Bible version
2. **Select Chapter** → Pick from Proverbs chapters 1-31
3. **Read & Navigate** → Enjoy the content with easy navigation

## Customization

The app offers extensive customization options:
- **Themes**: 15+ carefully designed themes
- **Text Size**: Adjustable reading comfort
- **Date Format**: Multiple display options
- **Storage**: Option to persist or reset settings

## Build & Deploy

Build the application for production:

```bash
npm run build
npm start
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/proj-davdevs-bible-proverbs)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [bible-api.com](https://bible-api.com/) for providing the Bible API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- All the Bible translation teams for their valuable work

---

*Built with ❤️ for daily Bible reading and spiritual growth*
