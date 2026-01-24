# CLAUDE.md

## Plugin Overview

Othello/Reversi game plugin for GUI Chat. Play Othello against the LLM.

## Common Guidelines

For standard plugin development guidelines, see:
https://github.com/receptron/GUIChatPluginTemplate/blob/main/CLAUDE.md

## Plugin-Specific Notes

### Features
- Interactive Othello game board
- User vs LLM gameplay
- Legal move validation
- Game state management via jsonData

### Game Pattern
This plugin uses the "User vs LLM" game pattern:
1. User makes a move via UI click
2. View sends move via `sendTextMessage()`
3. LLM processes and makes counter-move
4. Uses `updating: true` to update existing board
5. Uses `instructionsRequired: true` when it's LLM's turn

### Dependencies
- `gui-chat-protocol`: Core protocol for GUI Chat plugins

## Updating This Document

When making spec changes through discussion with Claude, update this file to reflect new constraints or architectural decisions.
