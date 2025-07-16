"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Palette, RotateCcw, Play, Users, Trophy, Clock } from "lucide-react"

const WORDS = [
  "cat",
  "dog",
  "house",
  "car",
  "tree",
  "sun",
  "moon",
  "star",
  "flower",
  "bird",
  "fish",
  "book",
  "phone",
  "computer",
  "chair",
  "table",
  "door",
  "window",
  "apple",
  "banana",
  "pizza",
  "cake",
  "guitar",
  "piano",
  "bicycle",
  "airplane",
  "boat",
  "train",
  "elephant",
  "lion",
  "butterfly",
  "rainbow",
  "mountain",
  "ocean",
  "fire",
  "ice",
  "heart",
  "smile",
  "crown",
  "diamond",
]

const COLORS = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500"]

type GameState = "waiting" | "drawing" | "guessing" | "finished"

interface Player {
  id: string
  name: string
  score: number
  isDrawing: boolean
}

export default function PictionaryGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(3)
  const [gameState, setGameState] = useState<GameState>("waiting")
  const [currentWord, setCurrentWord] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [guess, setGuess] = useState("")
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player 1", score: 0, isDrawing: true },
    { id: "2", name: "Player 2", score: 0, isDrawing: false },
    { id: "3", name: "Player 3", score: 0, isDrawing: false },
  ])
  const [currentDrawer, setCurrentDrawer] = useState(0)
  const [guesses, setGuesses] = useState<Array<{ player: string; guess: string; correct: boolean }>>([])
  const [gameRound, setGameRound] = useState(1)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "drawing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("finished")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, timeLeft])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== "drawing") return
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || gameState !== "drawing") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = currentColor

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const startGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setCurrentWord(randomWord)
    setGameState("drawing")
    setTimeLeft(60)
    clearCanvas()
    setGuesses([])
  }

  const submitGuess = () => {
    if (!guess.trim()) return

    const isCorrect = guess.toLowerCase().trim() === currentWord.toLowerCase()
    const playerName = players.find((p) => !p.isDrawing)?.name || "Player"

    setGuesses((prev) => [...prev, { player: playerName, guess: guess.trim(), correct: isCorrect }])

    if (isCorrect) {
      // Award points
      setPlayers((prev) =>
        prev.map((p) =>
          p.isDrawing ? { ...p, score: p.score + 10 } : !p.isDrawing ? { ...p, score: p.score + 15 } : p,
        ),
      )
      setGameState("finished")
    }

    setGuess("")
  }

  const nextRound = () => {
    const nextDrawer = (currentDrawer + 1) % players.length
    setCurrentDrawer(nextDrawer)
    setPlayers((prev) => prev.map((p, index) => ({ ...p, isDrawing: index === nextDrawer })))
    setGameRound((prev) => prev + 1)
    setGameState("waiting")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Palette className="w-8 h-8 text-purple-600" />
            Pictionary Game
          </h1>
          <p className="text-gray-600">Draw, guess, and have fun!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Info Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Game Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Round:</span>
                  <Badge variant="secondary">{gameRound}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time:</span>
                  <Badge variant={timeLeft <= 10 ? "destructive" : "default"} className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(timeLeft)}
                  </Badge>
                </div>
                {gameState === "drawing" && (
                  <div className="text-center p-3 bg-yellow-100 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Current Word:</p>
                    <p className="text-lg font-bold text-yellow-900">{currentWord}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{player.name}</span>
                        {player.isDrawing && <Badge variant="outline">Drawing</Badge>}
                      </div>
                      <Badge variant="secondary">{player.score}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Drawing Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Drawing Canvas</CardTitle>
                <CardDescription>
                  {gameState === "waiting" && 'Click "Start Round" to begin drawing!'}
                  {gameState === "drawing" && "Draw the word above for others to guess!"}
                  {gameState === "finished" && "Round finished! Start next round or view results."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Drawing Tools */}
                  <div className="flex flex-wrap items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Color:</span>
                      <div className="flex gap-1">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            className={`w-6 h-6 rounded border-2 ${currentColor === color ? "border-gray-800" : "border-gray-300"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Size:</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm">{brushSize}px</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={clearCanvas}>
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>

                  {/* Canvas */}
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={400}
                      className="w-full cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>

                  {/* Game Controls */}
                  <div className="flex gap-2">
                    {gameState === "waiting" && (
                      <Button onClick={startGame} className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Start Round
                      </Button>
                    )}
                    {gameState === "finished" && (
                      <Button onClick={nextRound} className="flex-1">
                        Next Round
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guessing Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Guesses</CardTitle>
                <CardDescription>Enter your guess below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameState === "drawing" && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter your guess..."
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && submitGuess()}
                    />
                    <Button onClick={submitGuess} className="w-full" disabled={!guess.trim()}>
                      Submit Guess
                    </Button>
                  </div>
                )}

                <Separator />

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <h4 className="font-medium text-sm">Recent Guesses:</h4>
                  {guesses.length === 0 ? (
                    <p className="text-sm text-gray-500">No guesses yet...</p>
                  ) : (
                    guesses
                      .slice()
                      .reverse()
                      .map((g, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded text-sm ${g.correct ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                        >
                          <span className="font-medium">{g.player}:</span> {g.guess}
                          {g.correct && <span className="ml-2 text-green-600">✓ Correct!</span>}
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
