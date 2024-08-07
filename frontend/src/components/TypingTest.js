import React, { useState, useEffect, useCallback } from 'react';
import './TypingTest.css';
import { FaRedo, FaTachometerAlt, FaCheckCircle, FaClock, FaHashtag, FaQuoteLeft, FaLeaf, FaCog, FaCode, FaBook } from 'react-icons/fa';

import wordsEasy from './texts/words_easy.txt';
import wordsMedium from './texts/words_medium.txt';
import wordsHard from './texts/words_hard.txt';
import punctuationEasy from './texts/punctuation_easy.txt';
import punctuationMedium from './texts/punctuation_medium.txt';
import punctuationHard from './texts/punctuation_hard.txt';
import numbersEasy from './texts/numbers_easy.txt';
import numbersMedium from './texts/numbers_medium.txt';
import numbersHard from './texts/numbers_hard.txt';
import quotesEasy from './texts/quotes_easy.txt';
import quotesMedium from './texts/quotes_medium.txt';
import quotesHard from './texts/quotes_hard.txt';
import codeEasy from './texts/code_easy.txt';
import codeMedium from './texts/code_medium.txt';
import codeHard from './texts/code_hard.txt';
import sentencesEasy15 from './texts/sentences_easy_15s.txt';
import sentencesEasy30 from './texts/sentences_easy_30s.txt';
import sentencesEasy60 from './texts/sentences_easy_60s.txt';
import sentencesEasy120 from './texts/sentences_easy_120s.txt';
import sentencesMedium15 from './texts/sentences_medium_15s.txt';
import sentencesMedium30 from './texts/sentences_medium_30s.txt';
import sentencesMedium60 from './texts/sentences_medium_60s.txt';
import sentencesMedium120 from './texts/sentences_medium_120s.txt';
import sentencesHard15 from './texts/sentences_hard_15s.txt';
import sentencesHard30 from './texts/sentences_hard_30s.txt';
import sentencesHard60 from './texts/sentences_hard_60s.txt';
import sentencesHard120 from './texts/sentences_hard_120s.txt';

const TypingTest = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(60);
  const [initialTime, setInitialTime] = useState(60);
  const [wordCount, setWordCount] = useState(50);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const fetchText = useCallback(async (mode, diff, time, words) => {
    let textFile;
    if (mode === 'time') {
      if (diff === 'easy') {
        textFile = time === 15 ? sentencesEasy15 : time === 30 ? sentencesEasy30 : time === 60 ? sentencesEasy60 : sentencesEasy120;
      } else if (diff === 'medium') {
        textFile = time === 15 ? sentencesMedium15 : time === 30 ? sentencesMedium30 : time === 60 ? sentencesMedium60 : sentencesMedium120;
      } else {
        textFile = time === 15 ? sentencesHard15 : time === 30 ? sentencesHard30 : time === 60 ? sentencesHard60 : sentencesHard120;
      }
    } else {
      switch (mode) {
        case 'punctuation':
          textFile = diff === 'easy' ? punctuationEasy : diff === 'medium' ? punctuationMedium : punctuationHard;
          break;
        case 'numbers':
          textFile = diff === 'easy' ? numbersEasy : diff === 'medium' ? numbersMedium : numbersHard;
          break;
        case 'quote':
          textFile = diff === 'easy' ? quotesEasy : diff === 'medium' ? quotesMedium : quotesHard;
          break;
        case 'code':
          textFile = diff === 'easy' ? codeEasy : diff === 'medium' ? codeMedium : codeHard;
          break;
        default:
          textFile = diff === 'easy' ? wordsEasy : diff === 'medium' ? wordsMedium : wordsHard;
      }
    }
    const response = await fetch(textFile);
    const content = await response.text();
    const texts = content.split('\n').filter(t => t.trim() !== '');
    let randomText = texts[Math.floor(Math.random() * texts.length)];
    
    if (mode === 'words') {
      while (randomText.split(/\s+/).length < words) {
        randomText += ' ' + texts[Math.floor(Math.random() * texts.length)];
      }
      randomText = randomText.split(/\s+/).slice(0, words).join(' ');
    }
    
    setText(randomText);
  }, []);

  const handleReset = useCallback(() => {
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(initialTime);
    setTestCompleted(false);
    if (gameMode) {
      fetchText(gameMode, difficulty, initialTime, wordCount);
    }
  }, [fetchText, gameMode, difficulty, initialTime, wordCount]);

  useEffect(() => {
    if (gameMode) {
      fetchText(gameMode, difficulty, initialTime, wordCount);
    }
  }, [fetchText, gameMode, difficulty, initialTime, wordCount]);

  useEffect(() => {
    let timer;
    if (gameMode === 'time' && startTime && !endTime) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setEndTime(new Date());
            setTestCompleted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, endTime, gameMode]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(new Date());
    }
    setInput(value);

    const words = value.trim().split(/\s+/);
    const elapsedTime = (new Date() - startTime) / 60000;
    const newWpm = Math.round(words.length / elapsedTime);
    setWpm(newWpm || 0);

    if (text) {
      const correctChars = text.slice(0, value.length).split('').filter((char, i) => char === value[i]).length;
      const newAccuracy = Math.round((correctChars / value.length) * 100) || 100;
      setAccuracy(newAccuracy);
    }

    if (gameMode === 'words' && words.length >= wordCount) {
      setEndTime(new Date());
      setTestCompleted(true);
      submitResults();
    }

    if (value === text) {
      setEndTime(new Date());
      setTestCompleted(true);
      submitResults();
    }
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setShowDifficulty(true);
    handleReset();
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    handleReset();
  };

  const handleWordCountChange = (count) => {
    setWordCount(count);
    handleReset();
  };

  const handleTimeChange = (time) => {
    setTimeLeft(time);
    setInitialTime(time);
    handleReset();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && testCompleted) {
      e.preventDefault();
      handleReset();
    }
  };

  const submitResults = async () => {
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          wpm,
          accuracy,
          gameMode,
          difficulty,
          wordCount,
          timeLeft
        })
      });
      if (!response.ok) throw new Error('Failed to save results');
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const renderModeButtons = () => (
    <div className="mode-selector">
      <button onClick={() => handleModeChange('words')} className={gameMode === 'words' ? 'active' : ''}><FaTachometerAlt /> Words</button>
      <button onClick={() => handleModeChange('time')} className={gameMode === 'time' ? 'active' : ''}><FaClock /> Time</button>
      <button onClick={() => handleModeChange('quote')} className={gameMode === 'quote' ? 'active' : ''}><FaQuoteLeft /> Quote</button>
      <button onClick={() => handleModeChange('punctuation')} className={gameMode === 'punctuation' ? 'active' : ''}><FaCog /> Punctuation</button>
      <button onClick={() => handleModeChange('numbers')} className={gameMode === 'numbers' ? 'active' : ''}><FaHashtag /> Numbers</button>
      <button onClick={() => handleModeChange('code')} className={gameMode === 'code' ? 'active' : ''}><FaCode /> Code</button>
    </div>
  );

  const renderDifficultyButtons = () => (
    <div className="difficulty-selector">
      <button onClick={() => handleDifficultyChange('easy')} className={difficulty === 'easy' ? 'active' : ''}><FaLeaf /> Easy</button>
      <button onClick={() => handleDifficultyChange('medium')} className={difficulty === 'medium' ? 'active' : ''}>Medium</button>
      <button onClick={() => handleDifficultyChange('hard')} className={difficulty === 'hard' ? 'active' : ''}>Hard</button>
    </div>
  );

  const renderTimeButtons = () => (
    <div className="time-selector">
      <button onClick={() => handleTimeChange(15)}>15s</button>
      <button onClick={() => handleTimeChange(30)}>30s</button>
      <button onClick={() => handleTimeChange(60)}>60s</button>
      <button onClick={() => handleTimeChange(120)}>120s</button>
    </div>
  );

  const renderWordCountButtons = () => (
    <div className="word-count-selector">
      <button onClick={() => handleWordCountChange(10)}>10</button>
      <button onClick={() => handleWordCountChange(25)}>25</button>
      <button onClick={() => handleWordCountChange(50)}>50</button>
      <button onClick={() => handleWordCountChange(100)}>100</button>
    </div>
  );

  return (
    <div className="typing-test">
      <div className="header">
        <h1>Speed Typing Test</h1>
        <p>Improve your typing skills with our interactive test</p>
      </div>
      {renderModeButtons()}
      {showDifficulty && gameMode !== 'zen' && renderDifficultyButtons()}
      {gameMode === 'time' && renderTimeButtons()}
      {gameMode === 'words' && renderWordCountButtons()}
      <div className="test-area">
        <div className="test-text">{text}</div>
        {!testCompleted ? (
          <textarea
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing..."
            disabled={endTime !== null}
          />
        ) : (
          <div className="result">
            <p>Test completed! Press TAB to retry or click the button below.</p>
            <button onClick={handleReset}>Next Test</button>
          </div>
        )}
      </div>
      <div className="stats">
        <p><FaTachometerAlt /> {wpm} WPM</p>
        <p><FaCheckCircle /> {accuracy}% Accuracy</p>
        {gameMode === 'time' && <p><FaClock /> {timeLeft}s left</p>}
        {gameMode === 'words' && <p><FaBook /> {wordCount - input.trim().split(/\s+/).length} words left</p>}
      </div>
      <button className="reset-button" onClick={handleReset}><FaRedo /> Reset</button>
    </div>
  );
};

export default TypingTest;
