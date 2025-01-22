import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
	return (
    <h2>Hello from React! blah</h2>
	)
}

const root = createRoot(document.body);
root.render(<App />);
