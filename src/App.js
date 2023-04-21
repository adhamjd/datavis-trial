import './App.css';
import { createGraph } from './graph.js';
import { useEffect } from 'react';

function App() {
  const data = [
    {"Social Media": "Facebook", "Males": 326, "Females": 222},
    {"Social Media": "Instagram", "Males": 380, "Females": 535},
    {"Social Media": "Snapchat", "Males": 56, "Females": 29},
    {"Social Media": "Twitter", "Males": 122, "Females": 57},
    {"Social Media": "None", "Males": 678, "Females": 271}
  ];

  useEffect(() => {
    // Call the createGraph function here
    createGraph(data);
  }, []);

  // Return your JSX code here
  return (
    <div className="App">
      <div id="chart"></div> {/* Add a div with id "chart" to render the chart */}
    </div>
  );
}

export default App;
