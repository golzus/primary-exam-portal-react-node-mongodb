import { useState, useCallback } from 'react';

// פונקציה לחישוב המרחק לוונשטיין
const calculateLevenshteinDistance = (str1, str2) => {
  const dp = Array(str1.length + 1).fill(null).map(() => Array(str2.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= str2.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[str1.length][str2.length];
};

// פונקציה לבדוק קרבה פונטית
const areWordsClosePhonetically = (word1, word2, maxDistance) => {
  const normalizedWord1 = word1.normalize('NFD').toLowerCase().replace(/[\u0300-\u036F]/g, '');
  const normalizedWord2 = word2.normalize('NFD').toLowerCase().replace(/[\u0300-\u036F]/g, '');
  
  const levenshteinDistance = calculateLevenshteinDistance(normalizedWord1, normalizedWord2);

  return levenshteinDistance <= maxDistance;
};

// ה-Hook שלנו
const useWordComparison = (maxDistance = 2) => {
  const compareWords = useCallback((inputWord, correctAnswer) => {
    if (inputWord === correctAnswer) {
      return true;
    }
    return areWordsClosePhonetically(inputWord, correctAnswer, maxDistance);
  }, [maxDistance]);

  return compareWords;
};

export default useWordComparison;
