import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/ducks/nbaPlayers';

const Counter = () => {
  const dispatch = useDispatch();
  const nbaPlayers = useSelector((state) => state.nbaPlayers);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    fetch('https://mach-eight.uc.r.appspot.com')
      .then((response) => response.json())
      .then((data) => dispatch(setPlayers(data)));
  }, [dispatch]);

  // Algorithm to find the pairs in O(n) time complexity
  const getPairs = () => {
    const { values } = nbaPlayers;
    const hashMap = {};
    const results = [];
    let count = 0;

    for (let i = 0; i < values.length; i += 1) {
      const playerName = `${values[i].first_name} ${values[i].last_name}`;
      if (hashMap[values[i].h_in]) {
        hashMap[values[i].h_in].push(playerName);
      } else {
        hashMap[values[i].h_in] = [playerName];
      }
    }
    for (let i = 0; i < values.length; i += 1) {
      const pairsArr = hashMap[Number(inputValue) - Number(values[i].h_in)];
      if (pairsArr) {
        for (let j = 0; j < pairsArr.length; j += 1) {
          const firstPlayer = `${values[i].first_name} ${values[i].last_name}`;
          const secondPlayer = pairsArr[j];
          if (
            firstPlayer !== secondPlayer &&
            !results.some(
              (result) =>
                result.firstPlayer === secondPlayer && result.secondPlayer === firstPlayer,
            )
          ) {
            results.push({ count, firstPlayer, secondPlayer });
            count += 1;
          }
        }
      }
    }

    console.log(hashMap);
    console.log(results);
    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setPairs(getPairs());
    setInputValue('');
  };

  return (
    <div>
      <form className="row mx-0 text-center gy-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input target height (in inches)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <ul className="list-unstyled">
          {pairs.length > 0 && (
            <p className="lead mb-1">
              Found {pairs.length} pair{pairs.length > 1 ? 's' : ''} of players whose heights add up
              to {submittedValue} inches:
            </p>
          )}
          {pairs.map((elem) => (
            <li key={elem.count}>
              {elem.firstPlayer}, {elem.secondPlayer}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Counter;
