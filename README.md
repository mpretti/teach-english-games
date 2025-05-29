# Point Salad - English Learning Game

A fun and interactive web application designed to help Korean students learn English through the engaging "Point Salad" game. Students shop for vegetables, make salads, and practice English grammar while scoring points.

## 🎮 Game Overview

**Point Salad (포인트 샐러드)** is an educational game that combines:
- **Vocabulary Learning**: Learn vegetable names in English and Korean
- **Grammar Practice**: Interactive exercises covering key grammar points
- **Math Skills**: Calculate costs, manage resources, and score points
- **Strategic Thinking**: Optimize purchases and salad combinations

## 🎯 Educational Goals

### Skills Developed
- **English Language**: Vocabulary, grammar, and expressions
- **Math**: Addition, resource management, probability
- **Critical Thinking**: Risk management and strategic planning

### Key Vocabulary
- Vegetables: carrots (당근), onions (양파), lettuce (상추), cabbage (양배추), tomatoes (토마토), bell peppers (피망)

### Grammar Points Covered
- Singular/plural forms
- Countable/uncountable nouns
- Future tense expressions
- Article usage (a/an)
- Expressing quantities and desires
- Superlatives (most, least, at least)

## 📚 Game Synopses

The application now includes a comprehensive **Game Synopses** section featuring educational outlines for 25+ board games designed for English learning. Each synopsis includes:

- **Theme and Description**: Clear explanation of the game's educational context
- **Skills Developed**: Multiple skills practiced through gameplay
- **Key Vocabulary**: Essential words students will learn and use
- **Grammar Points**: Specific grammatical structures reinforced during play
- **Key Expressions**: Common phrases students will practice repeatedly

### Featured Synopses Include:
- **Century: Spice Road** - Trading and economic vocabulary
- **Ticket to Ride** - Geography and transportation terms
- **Splendor** - Gem trading and achievement expressions
- **Azul** - Artistic and pattern-building language
- **Stone Age** - Historical and civilization vocabulary
- And many more!

Access the synopses by clicking "📚 View Game Synopses" on the main page.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teach-english-games
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎲 How to Play

### Phase 1: Shopping
1. **Browse the Market**: View available vegetables with prices and point values
2. **Add to Cart**: Select quantities of vegetables you want to buy
3. **Manage Budget**: You start with $20 and get bonus money each round
4. **Purchase**: Buy your selected vegetables

### Phase 2: Grammar Challenge
- Answer grammar questions correctly to earn bonus points
- Questions cover vocabulary and grammar concepts from the game
- Immediate feedback with explanations in both English and Korean

### Phase 3: Cooking
1. **View Inventory**: See all vegetables you've purchased
2. **Choose Recipes**: Select from available salad recipes
3. **Make Salads**: Combine ingredients to create salads and earn bonus points
4. **Strategic Planning**: Decide which salads to make for maximum points

### Scoring System
- **Vegetable Points**: Each vegetable has inherent point values
- **Salad Bonuses**: Complete recipes for additional points
- **Grammar Bonuses**: Correct answers earn +2 points
- **Final Score**: Combination of all point sources

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Korean-friendly fonts
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React for UI icons
- **Fonts**: Noto Sans KR for Korean text support

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Game.tsx        # Main game orchestrator
│   ├── GameSynopses.tsx # Game synopses viewer
│   ├── LandingPage.tsx # Main landing page
│   ├── VegetableCard.tsx   # Individual vegetable display
│   ├── SaladRecipeCard.tsx # Salad recipe display
│   └── GrammarExercise.tsx # Grammar question component
├── data/               # Game data and content
│   ├── gameData.ts     # Point Salad game data
│   ├── forSaleGameData.ts # For Sale game data
│   ├── kitesGameData.ts # Kites game data
│   └── [other game data files]
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related interfaces
├── utils/              # Utility functions
│   └── gameUtils.ts    # Game logic helpers
└── styles/             # CSS and styling
    └── index.css       # Global styles with Tailwind
```

## 🎨 Features

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Bilingual Support**: English and Korean text throughout
- **Visual Feedback**: Clear indicators for game state and progress
- **Intuitive Interface**: Easy-to-understand controls and navigation

### Educational Features
- **Immediate Feedback**: Instant responses to grammar questions
- **Progressive Difficulty**: Multiple rounds with increasing complexity
- **Cultural Relevance**: Korean translations and familiar concepts
- **Gamification**: Points, rounds, and achievement tracking
- **Comprehensive Synopses**: Educational outlines for 25+ games

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable React components
- **State Management**: Efficient game state handling
- **Performance**: Optimized rendering and fast load times

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Content

#### New Vegetables
Add to `src/data/gameData.ts` in the `vegetables` array:
```typescript
{
  id: 'new-vegetable',
  name: 'English Name',
  nameKorean: '한국어 이름',
  price: 2,
  points: 3,
  emoji: '🥕',
  category: 'root',
  countable: true
}
```

#### New Recipes
Add to `src/data/gameData.ts` in the `saladRecipes` array:
```typescript
{
  id: 'new-recipe',
  name: 'Recipe Name',
  nameKorean: '레시피 이름',
  requiredVegetables: ['vegetable-id-1', 'vegetable-id-2'],
  bonusPoints: 5,
  description: 'English description',
  descriptionKorean: '한국어 설명'
}
```

#### New Grammar Exercises
Add to `src/data/gameData.ts` in the `grammarExercises` array:
```typescript
{
  id: 'new-exercise',
  type: 'grammar-type',
  question: 'English question',
  questionKorean: '한국어 질문',
  options: ['option1', 'option2', 'option3', 'option4'],
  correctAnswer: 1,
  explanation: 'English explanation',
  explanationKorean: '한국어 설명'
}
```

#### New Game Synopses
Add to `src/components/GameSynopses.tsx` in the `synopses` array:
```typescript
{
  id: 'new-game',
  title: 'Game Title',
  theme: 'Game theme description',
  description: 'Detailed game description',
  skills: ['English', 'Math', 'Strategy'],
  vocabulary: ['word1', 'word2', 'word3'],
  grammar: ['grammar point 1', 'grammar point 2'],
  expressions: ['expression 1', 'expression 2'],
  emoji: '🎲',
  color: 'from-blue-400 to-purple-600'
}
```

## 🌟 Future Enhancements

- **More Games**: Additional educational games beyond Point Salad
- **Progress Tracking**: Save student progress and performance analytics
- **Multiplayer Mode**: Compete with classmates
- **Teacher Dashboard**: Tools for educators to track student progress
- **Audio Support**: Pronunciation practice and listening exercises
- **Difficulty Levels**: Adaptive difficulty based on student performance
- **Printable Synopses**: PDF export functionality for game synopses

## 📝 License

This project is designed for educational purposes. Please ensure proper attribution when using or modifying the code.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests to improve the educational experience.

---

**Happy Learning! 즐거운 학습 되세요!** 🎓📚
