// Algorithm to find the pairs in O(n**2) time complexity

const findPairsSquareOn = (nbaPlayers, inputValue) => {
  const { values } = nbaPlayers;
  const results = [];
  let count = 0;
  for (let i = 0; i < values.length - 1; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      if (Number(values[i].h_in) + Number(values[j].h_in) === Number(inputValue)) {
        const firstPlayer = `${values[i].first_name} ${values[i].last_name}, ${values[i].h_in} in`;
        const secondPlayer = `${values[j].first_name} ${values[j].last_name}, ${values[j].h_in} in`;
        results.push({ count, firstPlayer, secondPlayer });
        count += 1;
      }
    }
  }
  return results;
};

export default findPairsSquareOn;
