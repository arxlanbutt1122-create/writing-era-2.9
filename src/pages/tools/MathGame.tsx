import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy, Clock, Target } from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

export default function MathGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (gameActive && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      endGame();
    }
  }, [gameActive, timer]);

  const generateQuestion = () => {
    const operators = ["+", "-", "×", "÷"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1 = Math.floor(Math.random() * 20) + 1;
    let n2 = Math.floor(Math.random() * 20) + 1;

    if (op === "÷") {
      n1 = n1 * n2;
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
  };

  const startGame = () => {
    setScore(0);
    setTimer(60);
    setGameActive(true);
    generateQuestion();
  };

  const endGame = () => {
    setGameActive(false);
    if (score > highScore) {
      setHighScore(score);
      toast.success(`New high score: ${score}!`);
    } else {
      toast.info(`Game over! Your score: ${score}`);
    }
  };

  const checkAnswer = () => {
    let correct = 0;
    switch (operator) {
      case "+": correct = num1 + num2; break;
      case "-": correct = num1 - num2; break;
      case "×": correct = num1 * num2; break;
      case "÷": correct = num1 / num2; break;
    }

    if (parseInt(answer) === correct) {
      setScore(score + 10);
      toast.success("Correct! +10 points");
      generateQuestion();
    } else {
      toast.error(`Wrong! The answer was ${correct}`);
    }
    setAnswer("");
  };

  return (
    <>
      <Helmet>
        <title>Sir Arslan Asif - Math Game | WritingEra</title>
        <meta name="description" content="Test your math skills with our fun and challenging math game." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Sir Arslan Asif - Math Master Challenge</h1>
            <p className="text-muted-foreground text-center mb-12">Test your mental math skills</p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{score}</p>
                <p className="text-sm text-muted-foreground">Current Score</p>
              </Card>
              <Card className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{timer}s</p>
                <p className="text-sm text-muted-foreground">Time Left</p>
              </Card>
              <Card className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{highScore}</p>
                <p className="text-sm text-muted-foreground">High Score</p>
              </Card>
            </div>

            {!gameActive ? (
              <Card className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Challenge Yourself?</h2>
                <p className="text-muted-foreground mb-6">Answer as many questions as you can in 60 seconds!</p>
                <Button onClick={startGame} size="lg">
                  Start Game
                </Button>
              </Card>
            ) : (
              <Card className="p-12">
                <div className="text-center mb-8">
                  <p className="text-6xl font-bold mb-4">
                    {num1} {operator} {num2} = ?
                  </p>
                </div>

                <div className="flex gap-4 max-w-md mx-auto">
                  <Input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    placeholder="Your answer"
                    className="text-center text-2xl"
                    autoFocus
                  />
                  <Button onClick={checkAnswer} size="lg">
                    Submit
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
