import React, { useState, useEffect } from 'react';

const CountDisplayer = ({count}) => {
	return (
		<div>
			<p>Count: {count}</p>
		</div>
	)
}

const Cookie = ({onClick}) => {
	return (
		<button onClick={onClick}>
			<img src = "https://images.ricardocuisine.com/services/recipes/1x1/443664758542a9fa22f234.jpg" width="100px" height="100px" />
			<h1> Click Me!</h1>
		</button>
	)
}

export default function App() {
	const [currentCount, setCurrentCount] = useState(0);
	return (
		<div>
			<CountDisplayer count={currentCount}/>
			<Cookie onClick={() => setCurrentCount(currentCount + 1) }/>
		</div>
        );

}
