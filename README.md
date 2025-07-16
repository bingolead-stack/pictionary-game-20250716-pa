# Pictionary Game

A fun, interactive Pictionary game built with Next.js, TypeScript, React, and Tailwind CSS. Players take turns drawing words while others try to guess what they're drawing!

## Features

- 🎨 **Interactive Drawing Canvas** - Draw with different colors and brush sizes
- ⏱️ **Timer System** - 60-second rounds to keep the game exciting
- 👥 **Multi-Player Support** - Up to multiple players can participate
- 🏆 **Scoring System** - Points awarded for correct guesses and successful drawings
- 🎯 **Word Bank** - 40+ pre-loaded words to draw
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎮 **Real-time Gameplay** - Instant feedback and game state updates

## Game Rules

1. **Drawing Phase**: One player draws a randomly selected word
2. **Guessing Phase**: Other players try to guess the word
3. **Scoring**: 
   - Drawer gets 10 points for a correct guess
   - Guesser gets 15 points for guessing correctly
4. **Rounds**: Players take turns being the drawer
5. **Time Limit**: Each round lasts 60 seconds

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using git
   git clone <repository-url>
   cd pictionary-game
   
   # Or extract the zip file and navigate to the folder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## How to Play

1. **Start the Game**: Click "Start Round" to begin
2. **Drawing**: 
   - The current drawer sees the word to draw
   - Use the color palette and brush size controls
   - Draw on the canvas to represent the word
   - Use "Clear" to start over if needed
3. **Guessing**: 
   - Other players enter guesses in the input field
   - Submit guesses by clicking "Submit Guess" or pressing Enter
   - Correct guesses are highlighted in green
4. **Scoring**: Points are automatically awarded for correct guesses
5. **Next Round**: Click "Next Round" to continue with the next player

## Game Controls

### Drawing Tools
- **Color Palette**: 8 different colors to choose from
- **Brush Size**: Adjustable from 1px to 10px
- **Clear Canvas**: Reset the drawing area

### Game Features
- **Timer**: Visual countdown showing remaining time
- **Player List**: Shows current scores and who's drawing
- **Guess History**: Real-time display of all guesses
- **Round Counter**: Track game progress

## Technical Details

### Built With
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **HTML5 Canvas** - For drawing functionality
- **Lucide React** - Beautiful icons

### Project Structure
\`\`\`
pictionary-game/
├── app/
│   ├── page.tsx          # Main game component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/              # UI components
├── lib/
│   └── utils.ts         # Utility functions
└── README.md
\`\`\`

### Key Components
- **Game State Management**: React hooks for managing game flow
- **Canvas Drawing**: Mouse event handlers for drawing functionality
- **Timer System**: useEffect hook for countdown timer
- **Player Management**: State management for multiple players
- **Guess Validation**: Real-time guess checking and scoring

## Environment Variables

This project doesn't require any environment variables or external APIs. Everything runs locally in the browser.

## Customization

### Adding More Words
Edit the \`WORDS\` array in \`app/page.tsx\`:
\`\`\`typescript
const WORDS = [
  'cat', 'dog', 'house', // ... add your words here
]
\`\`\`

### Changing Colors
Modify the \`COLORS\` array in \`app/page.tsx\`:
\`\`\`typescript
const COLORS = ['#000000', '#FF0000', // ... add hex colors
]
\`\`\`

### Adjusting Game Settings
- **Timer Duration**: Change the initial \`timeLeft\` value
- **Scoring**: Modify point values in the \`submitGuess\` function
- **Canvas Size**: Adjust width/height in the canvas element

## Troubleshooting

### Common Issues

1. **Canvas not drawing**: Make sure you're clicking and dragging on the canvas area
2. **Timer not working**: Check that JavaScript is enabled in your browser
3. **Styles not loading**: Ensure Tailwind CSS is properly installed
4. **Build errors**: Run \`npm install\` to ensure all dependencies are installed

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements

Potential features that could be added:
- Real-time multiplayer with WebSockets
- Custom word lists
- Difficulty levels
- Drawing replay system
- Mobile touch drawing optimization
- Sound effects and animations
- Tournament mode with brackets

## Contributing

This is a demo project, but feel free to fork and enhance it! Some areas for improvement:
- Better mobile responsiveness
- More drawing tools (shapes, text)
- Undo/redo functionality
- Save/load drawings
- Custom game rooms

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all dependencies are properly installed
3. Try clearing your browser cache
4. Check the browser console for error messages

Enjoy playing Pictionary! 🎨🎮
\`\`\`

## Development Time

This project was completed in approximately 45 minutes, focusing on core gameplay mechanics and a polished user interface.
