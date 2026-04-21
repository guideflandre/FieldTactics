import { useState, useCallback } from 'react';

let nextId = 1;

function createPlayer(number, team, position) {
  return { id: nextId++, number, team, position };
}

function getDefaultPosition(team, playerIndex, maxPerTeam) {
  const cols = maxPerTeam <= 1 ? 1
    : maxPerTeam <= 2 ? 2
    : maxPerTeam <= 4 ? 2
    : maxPerTeam <= 9 ? 3
    : 4;

  const numRows = Math.ceil(maxPerTeam / cols);
  const row = Math.floor(playerIndex / cols);
  const col = playerIndex % cols;
  const isLastRow = row === numRows - 1;
  const playersInRow = isLastRow ? (maxPerTeam - row * cols) : cols;

  const x = playersInRow === 1
    ? 0.5
    : 0.15 + (col / (playersInRow - 1)) * 0.7;

  const teamA = team === 'A';
  const yStart = teamA ? 0.92 : 0.08;
  const yEnd = teamA ? 0.58 : 0.42;
  const y = numRows === 1
    ? (yStart + yEnd) / 2
    : yStart + (row / (numRows - 1)) * (yEnd - yStart);

  return { x: Math.max(0.1, Math.min(0.9, x)), y };
}

export function usePlayers(maxPerTeam = 2) {
  const [players, setPlayers] = useState([]);

  const addPlayer = useCallback((team) => {
    setPlayers((prev) => {
      const teamPlayers = prev.filter((p) => p.team === team);
      if (teamPlayers.length >= maxPerTeam) return prev;
      const number = teamPlayers.length + 1;
      const position = getDefaultPosition(team, teamPlayers.length, maxPerTeam);
      return [...prev, createPlayer(number, team, position)];
    });
  }, [maxPerTeam]);

  const removePlayer = useCallback((id) => {
    setPlayers((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      const teamCounts = { A: 0, B: 0 };
      return filtered.map((p) => {
        teamCounts[p.team] += 1;
        return { ...p, number: teamCounts[p.team] };
      });
    });
  }, []);

  const movePlayer = useCallback((id, normPosition) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, position: normPosition } : p))
    );
  }, []);

  const clearPlayers = useCallback(() => setPlayers([]), []);

  return { players, addPlayer, removePlayer, movePlayer, clearPlayers };
}
