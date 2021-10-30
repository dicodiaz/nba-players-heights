// Algorithm to find the pairs in O(n) time complexity

const findPairs = (nbaPlayers, inputValue) => {
  const { values } = nbaPlayers;
  const hashMap = {};
  const results = [];
  let count = 0;

  for (let i = 0; i < values.length; i += 1) {
    const firstPlayer = `${values[i].first_name} ${values[i].last_name}, ${values[i].h_in} in`;
    const diff = Number(inputValue) - Number(values[i].h_in);
    if (hashMap[values[i].h_in]) {
      for (let j = 0; j < hashMap[values[i].h_in].length; j += 1) {
        const secondPlayer = hashMap[values[i].h_in][j];
        results.push({ count, firstPlayer, secondPlayer });
        count += 1;
      }
    }
    if (hashMap[diff]) {
      hashMap[diff].push(firstPlayer);
    } else {
      hashMap[diff] = [firstPlayer];
    }
  }

  return results;
};

export default findPairs;
