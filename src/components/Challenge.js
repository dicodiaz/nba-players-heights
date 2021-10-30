import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../redux/ducks/nbaPlayers';

const Counter = () => {
  const dispatch = useDispatch();
  const nbaPlayers = useSelector((state) => state.nbaPlayers);
  const [inputValue, setInputValue] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    console.log('hi');
    fetch('https://mach-eight.uc.r.appspot.com')
      .then((response) => response.json())
      .then((data) => dispatch(setPlayers(data)));
  }, [dispatch]);

  const filterPlayers = () => {
    const { values } = nbaPlayers;
    const result = [];
    let count = 0;
    for (let i = 0; i < values.length - 1; i += 1) {
      for (let j = i + 1; j < values.length; j += 1) {
        if (Number(values[i].h_in) + Number(values[j].h_in) === Number(inputValue)) {
          result.push([
            count,
            `${values[i].first_name} ${values[i].last_name}`,
            `${values[j].first_name} ${values[j].last_name}`,
          ]);
          count += 1;
        }
      }
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredPlayers(filterPlayers());
  };

  return (
    <div>
      <form className="row mx-0 text-center gy-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input target height..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <ul>
          {filteredPlayers.map((elem) => (
            <li key={elem[0]}>
              {elem[1]}, {elem[2]}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Counter;
