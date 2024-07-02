import React from "react";
import { Emotion } from "../../lib/data/emotion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type TopEmotionsProps = {
  className?: string;
  emotions: Emotion[];
  numEmotions: number;
};

export function TopEmotions({ className, emotions, numEmotions }: TopEmotionsProps) {
  className = className || "";

  const sortedEmotions = emotions
    .sort((a: Emotion, b: Emotion) => b.score - a.score)
    .slice(0, numEmotions);

  const data = {
    labels: sortedEmotions.map(emotion => emotion.name),
    datasets: [
      {
        label: 'Top Emotions',
        data: sortedEmotions.map(emotion => emotion.score),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`${className}`}>
      <Pie data={data} />
    </div>
  );
}

TopEmotions.defaultProps = {
  numEmotions: 5,
};

