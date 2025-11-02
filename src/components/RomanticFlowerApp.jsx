import React, { useState } from 'react';

const RomanticFlowerApp = () => {
  const [page, setPage] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [responseGif, setResponseGif] = useState(null);

  const questions = [
    "Will you be my girlfriend?",
    "Do you love me?",
    "Will you make me the happiest person alive?",
    "Can I hold your hand forever?",
    "Will you be mine, today and always?"
  ];


  // Anime gif URLs for responses (feel free to replace with your favorite anime reaction gifs)
  const yesGifs = [
    'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', // Happy
    'https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif', // Blushing
    'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', // Excited
    'https://media.giphy.com/media/l2Je66zG6mAAZxg00/giphy.gif', // Love
    'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif', // Romantic
  ];

  // Reserved for future use if needed
  // const noGifs = [
  //   'https://media.giphy.com/media/l0MYt27jjQQ2hAZ6o/giphy.gif', // Sad anime
  //   'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', // Disappointed anime
  // ];

  const handleAnswer = (answer) => {
    if (answer === 'no') {
      // No button is unclickable, but just in case
      return;
    }

    // Set the gif for this response
    const gifIndex = currentQuestion % yesGifs.length;
    setResponseGif(yesGifs[gifIndex]);
    setShowResponse(true);

    // Show response for 2.5 seconds, then proceed
    setTimeout(() => {
      const newAnswers = [...answers, { question: questions[currentQuestion], answer }];
      setAnswers(newAnswers);
      setShowResponse(false);
      setResponseGif(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setPage('finale');
      }
    }, 2500);
  };

  // SVG Rose component for background with rotation animation
  const RoseSVG = () => (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20 rotate-rose"
      viewBox="0 0 400 400" 
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="roseGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#c2185b" />
        </radialGradient>
      </defs>
      {/* Rose petals */}
      <g transform="translate(200, 180)">
        {/* Outer petals */}
        <ellipse cx="0" cy="-40" rx="25" ry="50" fill="url(#roseGradient)" transform="rotate(0)" />
        <ellipse cx="0" cy="-40" rx="25" ry="50" fill="url(#roseGradient)" transform="rotate(45)" />
        <ellipse cx="0" cy="-40" rx="25" ry="50" fill="url(#roseGradient)" transform="rotate(90)" />
        <ellipse cx="0" cy="-40" rx="25" ry="50" fill="url(#roseGradient)" transform="rotate(135)" />
        {/* Middle petals */}
        <ellipse cx="0" cy="-30" rx="20" ry="40" fill="#ff4d7a" transform="rotate(22.5)" />
        <ellipse cx="0" cy="-30" rx="20" ry="40" fill="#ff4d7a" transform="rotate(67.5)" />
        <ellipse cx="0" cy="-30" rx="20" ry="40" fill="#ff4d7a" transform="rotate(112.5)" />
        <ellipse cx="0" cy="-30" rx="20" ry="40" fill="#ff4d7a" transform="rotate(157.5)" />
        {/* Inner petals */}
        <ellipse cx="0" cy="-20" rx="15" ry="30" fill="#ff1a5c" transform="rotate(0)" />
        <ellipse cx="0" cy="-20" rx="15" ry="30" fill="#ff1a5c" transform="rotate(45)" />
        <ellipse cx="0" cy="-20" rx="15" ry="30" fill="#ff1a5c" transform="rotate(90)" />
        <ellipse cx="0" cy="-20" rx="15" ry="30" fill="#ff1a5c" transform="rotate(135)" />
        {/* Center */}
        <circle cx="0" cy="-10" r="12" fill="#b3003d" />
        {/* Stem */}
        <rect x="-3" y="40" width="6" height="120" fill="#228b22" rx="3" />
        {/* Leaves */}
        <ellipse cx="15" cy="80" rx="20" ry="35" fill="#32cd32" transform="rotate(-30)" />
        <ellipse cx="-15" cy="100" rx="20" ry="35" fill="#32cd32" transform="rotate(30)" />
      </g>
    </svg>
  );

  const Landing = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
      <RoseSVG />
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Something Special
          </h1>
          <p className="text-2xl text-pink-200 mb-12">
            For someone extraordinary
          </p>
          <button
            onClick={() => setPage('questions')}
            className="px-20 py-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-2xl font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 cursor-pointer"
          >
            Start ♡
          </button>
        </div>
      </div>
    </div>
  );

  const Questions = () => {
    if (showResponse && responseGif) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex items-center justify-center">
          <div className="max-w-2xl w-full mx-4 p-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center">
            <div className="mb-6">
              <img 
                src={responseGif} 
                alt="Anime reaction" 
                className="mx-auto rounded-lg max-w-md w-full"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              That makes me so happy! ♡
            </h2>
            <p className="text-xl text-pink-200">
              Moving to the next question...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4 p-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <span className="text-pink-300 text-lg">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-16 text-center leading-tight">
            {questions[currentQuestion]}
          </h2>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => handleAnswer('yes')}
              className="px-24 py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-2xl font-bold rounded-full shadow-xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
            >
              Yes! ♡
            </button>
            <button
              onClick={() => handleAnswer('no')}
              disabled
              className="px-24 py-6 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-2xl font-bold rounded-full shadow-xl opacity-50 cursor-not-allowed transition-all duration-300"
              style={{ pointerEvents: 'none' }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Finale = () => {
    const allYes = answers.every(a => a.answer === 'yes');
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-4 p-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center">
          <div className="text-8xl mb-8">
            {allYes ? '💕' : '💔'}
          </div>
          <h2 className="text-5xl font-bold text-white mb-8">
            {allYes ? "You've made me so happy!" : "I understand..."}
          </h2>
          <p className="text-2xl text-pink-200 mb-12">
            {allYes 
              ? "Thank you for saying yes. You mean the world to me. ♡" 
              : "I respect your feelings. You're still amazing to me."}
          </p>
          <button
            onClick={() => {
              setPage('landing');
              setCurrentQuestion(0);
              setAnswers([]);
            }}
            className="px-20 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-semibold rounded-full shadow-xl hover:scale-110 hover:shadow-pink-500/50 transition-all duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {page === 'landing' && <Landing />}
      {page === 'questions' && <Questions />}
      {page === 'finale' && <Finale />}
    </div>
  );
};

export default RomanticFlowerApp;