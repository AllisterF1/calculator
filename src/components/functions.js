
import { useState } from 'react';
import * as math from 'mathjs';

function Calc() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const operator = ['/', '*', '-', '+', '.'];


const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const createDigits = () => {
  return digits.map((digit) => (
	<button onClick={() => updateCalc(digit.toString())} key={digit}>
	  {digit}
	</button>
  ));
}
const updateCalc = (value) => {
  if (
	(operator.includes(value) && calc === '') ||
	(operator.includes(value) && operator.includes(calc.slice(-1)))
  ) {
	return;
  }


	setCalc(calc + value);

	if (!operator.includes(value)) {
	  try {
		const res = math.evaluate(calc + value);
		setResult(res.toString());
	  } catch (error) {
		setResult('');
	  }
	}
  }

const calculate = () => {
	try {
	  const res = math.evaluate(calc);
	  setCalc(res.toString());
	  setResult('');
	} catch (error) {
	  setResult('');
	}
  }

const clearAll = () => {
	setCalc('');
	setResult('');
  }


  
const deleteLast = () => {
  if (calc === '') {
	return;
  }
  const value = calc.slice(0, -1);

  setCalc(value);
  setResult('');

  if (value !== '') {
	try {
	  const res = math.evaluate(value);
	  setResult(res.toString());
	} catch (error) {
	  setResult('');
	}
  }
}

const calculatePercentage = () => {
  try {
	const res = math.evaluate(calc + '/100');
	setCalc(res.toString());
	setResult('');
  } catch (error) {
	setResult('');
  }
}

const calculateSquareRoot = () => {
  try {
	const res = math.evaluate(`sqrt(${calc})`);
	setCalc(res.toString());
	setResult('');
  } catch (error) {
	setResult('');
  }
}

const toggleSign = () => {
  setCalc(calc * -1);
}



	
	return (
		<div className="App">
			<div className="calculator">
				<div className= "displayContainer">
				<div className="display">
					<span>{result ? '(' + result + ')' : ''}</span> {calc || 0}
				</div>
				</div>
				<div className="functions">			
					<button onClick={() => calculatePercentage()}className="function-btn">%</button>
 					<button onClick={() => calculateSquareRoot()}className="function-btn">√</button>
					<button onClick={toggleSign}className="function-btn">+/-</button>
					<button onClick={deleteLast} className="delete-btn">DEL</button>
  					<button onClick={clearAll} className="clear-btn">Clear All</button>
				</div>
				<div className="operators">
					<button onClick={() => updateCalc ('/')}>/</button>
					<button onClick={() => updateCalc ('*')}>x</button>
					<button onClick={() => updateCalc ('-')}>-</button>
					<button onClick={() => updateCalc ('+')}>+</button>
  				

					

				</div>

				<div className="digits">
				{createDigits()}
					
					<button onClick={() => updateCalc ('0')}>0</button>
					<button onClick={() => updateCalc ('.')}>.</button>
					<button onClick={calculate}>=</button>

				</div>
			</div>
		</div>
	);

}



export default Calc;