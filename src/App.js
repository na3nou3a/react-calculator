import React, { useState } from 'react';

function App() {
  const operators = ['+', '-', '*', '/', '%'];
  const [operation, setOperation] = useState('');
  const [current, setCurrent] = useState(['0']);
  const [combained, setCombained] = useState(false);
  const [heighlighted, setHeighlighted] = useState(null);
  const [alert, setAlert] = useState(false);
  // handle clear
  function handleClear() {
    if (heighlighted) {
      heighlighted.classList.remove('heighlight');
    }
    setOperation('');
    setCurrent('0');
  }

  // handle degits
  const handleDegit = (e) => {
    const degit = e.target.value;

    if (
      operators.indexOf(current) >= 0 ||
      (current.length === 1 && current[0] === '0')
    ) {
      setCurrent(degit);
    } else {
      if (current.length >= 21) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 7000);
      } else {
        setCurrent(current.concat(degit));
      }
    }
    if (combained) {
      if (current.length === 1 && current[0] === '0') {
        setOperation(degit);
      } else {
        setOperation(current.concat(degit));
      }
      setCombained(false);
    } else {
      if (current.length === 1 && current[0] === '0') {
        setOperation(degit);
      } else {
        setOperation(operation.concat(degit));
      }
    }
  };

  // handle zero
  const handleZero = () => {
    if (current.length >= 21) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 7000);
    } else if (current.length === 1 && current[0] === '0') {
      return;
    }
    setCurrent(current.concat('0'));
    if (combained) {
      setOperation(current.concat('0'));
      setCombained(false);
    } else {
      setOperation(operation.concat('0'));
    }
  };

  // handle Operator
  const handleOperator = (e) => {
    if (heighlighted) {
      heighlighted.classList.remove('heighlight');
    }
    const opBtn = e.target;
    opBtn.classList.add('heighlight');
    setHeighlighted(opBtn);
    const op = opBtn.value;
    if (combained) {
      setOperation(current.concat(op));
      setCombained(false);
    } else {
      if (operators.indexOf(current) >= 0) {
        const l = operation.length;
        const newOperation = l ? operation.slice(0, l - 1) : '';
        setOperation(newOperation.concat(op));
      } else {
        setOperation(operation.concat(op));
      }
    }
    setCurrent(op);
  };

  // handle equals
  const handleEquals = (e) => {
    if (heighlighted) {
      heighlighted.classList.remove('heighlight');
    }
    const eqBtn = e.target;
    eqBtn.classList.add('heighlight');
    setHeighlighted(eqBtn);
    let answer;
    const l = operation.length;
    if (operators.indexOf(operation[l - 1]) >= 0) {
      const newOperation = operation.slice(0, l - 1);
      answer = Math.round(1000000000000 * eval(newOperation)) / 1000000000000;
    } else {
      answer = Math.round(1000000000000 * eval(operation)) / 1000000000000;
    }
    setCurrent(answer.toString());
    setCombained(true);
  };

  // handle decimal
  const handleDecimal = () => {
    if (current.includes('.')) {
      return;
    }
    setCurrent(current.concat('.'));
    if (!operation.length) {
      setOperation('0.');
    } else {
      setOperation(operation.concat('.'));
    }
  };
  return (
    <div className='wrapper'>
      <header className='header'>
        <h1>React calculator</h1>
      </header>
      <main className='main'>
        {alert && <p className='alert'>No more than 21 degits please!</p>}
        <div className='container'>
          <p id='display' className='display'>
            <span className='operation'>{operation}</span>
            <span className='result'>{current}</span>
          </p>
          <button
            type='button'
            id='clear'
            className='btn clear'
            value='clear'
            onClick={handleClear}
          >
            AC
          </button>
          <button
            type='button'
            className='btn percent'
            value='%'
            onClick={handleOperator}
          >
            %
          </button>
          <button
            type='button'
            id='divide'
            className='btn operator'
            value='/'
            onClick={handleOperator}
          >
            /
          </button>
          <button
            type='button'
            id='seven'
            className='btn degit'
            value='7'
            onClick={handleDegit}
          >
            7
          </button>
          <button
            type='button'
            id='eight'
            className='btn degit'
            value='8'
            onClick={handleDegit}
          >
            8
          </button>
          <button
            type='button'
            id='nine'
            className='btn degit'
            value='9'
            onClick={handleDegit}
          >
            9
          </button>
          <button
            type='button'
            id='multiply'
            className='btn operator'
            value='*'
            onClick={handleOperator}
          >
            x
          </button>
          <button
            type='button'
            id='four'
            className='btn degit'
            value='4'
            onClick={handleDegit}
          >
            4
          </button>
          <button
            type='button'
            id='five'
            className='btn degit'
            value='5'
            onClick={handleDegit}
          >
            5
          </button>
          <button
            type='button'
            id='six'
            className='btn degit'
            value='6'
            onClick={handleDegit}
          >
            6
          </button>
          <button
            type='button'
            id='subtract'
            className='btn operator'
            value='-'
            onClick={handleOperator}
          >
            -
          </button>
          <button
            type='button'
            id='one'
            className='btn degit'
            value='1'
            onClick={handleDegit}
          >
            1
          </button>
          <button
            type='button'
            id='two'
            className='btn degit'
            value='2'
            onClick={handleDegit}
          >
            2
          </button>
          <button
            type='button'
            id='three'
            className='btn degit'
            value='3'
            onClick={handleDegit}
          >
            3
          </button>
          <button
            type='button'
            id='add'
            className='btn operator'
            value='+'
            onClick={handleOperator}
          >
            +
          </button>
          <button
            type='button'
            id='zero'
            className='btn zero degit'
            value='0'
            onClick={handleZero}
          >
            0
          </button>
          <button
            type='button'
            id='decimal'
            className='btn decimal'
            value='.'
            onClick={handleDecimal}
          >
            .
          </button>
          <button
            type='button'
            id='equals'
            className='btn equals'
            value='='
            onClick={handleEquals}
          >
            =
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
