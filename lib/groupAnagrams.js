const groupAnagrams = (words) => {
  let anagrams = {};
  for (let word of words) {
    let sortedWord = word.replace(/ /g, '').split('').sort().join('');
    if(sortedWord in anagrams){
      anagrams[sortedWord].push(word);
    }else{
      anagrams[sortedWord] = [word];
    }
  }
  return Object.values(anagrams);
};

export default groupAnagrams;