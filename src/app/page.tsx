'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface Contestant {
  id: number;
  name: string;
  image: string;
  votes: number;
}

export default function LandingPage() {
  const [contestants, setContestants] = useState<Contestant[]>([
    { id: 1, name: "Candidate A", image: "/placeholder.svg?height=100&width=100", votes: 0 },
    { id: 2, name: "Candidate B", image: "/placeholder.svg?height=100&width=100", votes: 0 },
    { id: 3, name: "Candidate C", image: "/placeholder.svg?height=100&width=100", votes: 0 },
  ]);
  const [showPercentage, setShowPercentage] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem('hasVoted');
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const totalVotes = contestants.reduce((sum, contestant) => sum + contestant.votes, 0);

  const handleVote = (id: number) => {
    setContestants(prevContestants =>
      prevContestants.map(contestant =>
        contestant.id === id ? { ...contestant, votes: contestant.votes + 1 } : contestant
      )
    );
    setHasVoted(true);
    localStorage.setItem('hasVoted', 'true');
  };

  const getVoteDisplay = (votes: number) => {
    if (!hasVoted) return '***';
    return showPercentage ? `${((votes / totalVotes) * 100).toFixed(2)}%` : votes;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">I am not INEC</h1>
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <span>Show Percentage</span>
          <Switch
            checked={showPercentage}
            onCheckedChange={setShowPercentage}
            disabled={!hasVoted}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contestants.map(contestant => (
          <Card key={contestant.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={contestant.image}
                  alt={contestant.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h2 className="text-2xl font-semibold">{contestant.name}</h2>
                <p className="text-xl font-bold">
                  Votes: {getVoteDisplay(contestant.votes)}
                </p>
                <Button
                  onClick={() => handleVote(contestant.id)}
                  disabled={hasVoted}
                >
                  Vote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}