import { useState } from 'react';
import './Counter.css';

const Counter = ({ initialValue = 1, min = 1, max = 99, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onValueChange && onValueChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onValueChange && onValueChange(newValue);
    }
  };

  return (
    <div className="counter-container">
      <button
        className="counter-button"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        −
      </button>
      <span className="counter-value">{value}</span>
      <button
        className="counter-button"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
