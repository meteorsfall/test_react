import React, { useState, useEffect } from 'react';
import CountDisplayer from "./CountDisplayer";
import Cookie from "./Cookie";

const CookieImage = () => (
	<img src = "https://images.ricardocuisine.com/services/recipes/1x1/443664758542a9fa22f234.jpg" 
	width="100px"
	height="100px" />
);

const MoreCookies = () => (
	<button>
		<CookieImage></CookieImage>
	<h1> "Don't click!"</h1>
	</button>
);

export default function App() {
	const [currentCount, setCurrentCount] = useState(0);

	const cookies = [];
	for (let i = 0; i < currentCount; i++){
		cookies.push(<MoreCookies key={i} left={100 + i*100} />);
	}
	return (
		<div>
			<CountDisplayer count={currentCount}/>
			<Cookie onClick={() => setCurrentCount(currentCount + 1) }/>
			{cookies}
		</div>
        );

}
