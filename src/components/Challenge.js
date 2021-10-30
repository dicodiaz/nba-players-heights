import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import findPairs from '../logic/findPairs';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    const startTime = performance.now();
    setPairs(findPairs(nbaPlayers, inputValue));
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
