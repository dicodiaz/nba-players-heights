import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/ducks/nbaPlayers';

const Counter = () => {
  const dispatch = useDispatch();
  const nbaPlayers = useSelector((state) => state.nbaPlayers);
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [pairs, setPairs] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('nbaPlayers')) {
      dispatch(setPlayers(JSON.parse(localStorage.getItem('nbaPlayers'))));
    } else {
      fetch('https://mach-eight.uc.r.appspot.com')
        .then((response) => response.json())
        .then((data) => {
          dispatch(setPlayers(data));
          localStorage.setItem('nbaPlayers', JSON.stringify(data));
        });
    }
  }, [dispatch]);

  // Algorithm to find the pairs in O(n) time complexity
  const findPairs = () => {
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

  // Algorithm to find the pairs in O(n**2) time complexity
  // const findPairsSquareOn = () => {
  //   const { values } = nbaPlayers;
  //   const results = [];
  //   let count = 0;
  //   for (let i = 0; i < values.length - 1; i += 1) {
  //     for (let j = i + 1; j < values.length; j += 1) {
  //       if (Number(values[i].h_in) + Number(values[j].h_in) === Number(inputValue)) {
  //         const firstPlayer = `${values[i].first_name} ${values[i].last_name}, ${values[i].h_in} in`;
  //         const secondPlayer = `${values[j].first_name} ${values[j].last_name}, ${values[j].h_in} in`;
  //         results.push({ count, firstPlayer, secondPlayer });
  //         count += 1;
  //       }
  //     }
  //   }
  //   return results;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    const startTime = performance.now();
    setPairs(findPairs());
    const endTime = performance.now();
    setTime(Math.round((endTime - startTime) * 1000) / 1000);
    setInputValue('');
  };

  return (
    <div>
      <form className="row mx-0 text-center gy-2" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Input target height (in inches)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {pairs.length > 0 ? (
          <p className="lead mb-1">
            Found {pairs.length} pair{pairs.length > 1 ? 's' : ''} of players whose heights add up
            to {submittedValue} inches in {time} milliseconds:
          </p>
        ) : (
          <p>No matches found</p>
        )}
        <ul className="list-unstyled">
          {pairs.map((elem) => (
            <li key={elem.count}>
              {elem.firstPlayer} - {elem.secondPlayer}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Counter;
