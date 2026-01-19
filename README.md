# @gui-chat-plugin/othello

Othello/Reversi game plugin for GUI Chat applications. Play Othello against an AI assistant or let it guide you through the game.

## Features

- Full Othello/Reversi game implementation
- Interactive board with clickable moves
- Legal move indicators
- Turn tracking (user vs computer)
- Game end detection and winner announcement

## Installation

```bash
npm install @gui-chat-plugin/othello
```

## Usage

### Vue Integration

```typescript
import { plugin } from "@gui-chat-plugin/othello/vue";
import "@gui-chat-plugin/othello/style.css";

// Register the plugin with your GUI Chat application
registerPlugin(plugin);
```

### Core-only Usage

```typescript
import { executeOthello, playOthello, TOOL_DEFINITION } from "@gui-chat-plugin/othello";

// Start a new game
const result = await executeOthello(context, {
  action: "new_game",
  firstPlayer: "user",
});

// Use the game logic directly
import { playOthello } from "@gui-chat-plugin/othello";

const state = playOthello({
  action: "new_game",
  playerNames: { B: "user", W: "computer" },
});
```

## API

### OthelloArgs

```typescript
interface OthelloArgs {
  action: "new_game" | "move" | "pass";
  col?: number;        // 0-7 for move action
  row?: number;        // 0-7 for move action
  board?: Cell[][];    // Current board state
  currentSide?: Side;  // "B" or "W"
  playerNames?: { B: OthelloPlayerType; W: OthelloPlayerType };
  firstPlayer?: OthelloPlayerType;  // "user" or "computer"
}
```

### OthelloState

```typescript
interface OthelloState {
  board: OthelloBoard;      // 8x8 grid of ".", "B", or "W"
  currentSide: Side;        // Whose turn is next
  playerNames: { B: string; W: string };
  legalMoves: { row: number; col: number }[];
  counts: { B: number; W: number; empty: number };
  isTerminal: boolean;
  winner: Side | "draw" | null;
  lastAction: { type: "new_game" | "move" | "pass"; ... };
  error?: string;
}
```

## Development

```bash
# Install dependencies
yarn install

# Run demo
yarn dev

# Build
yarn build

# Lint
yarn lint
```

## License

MIT
