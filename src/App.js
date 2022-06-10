import './App.css';

import Body from './Components/Body';

function App() {


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className='col-md-12'>
        <div className='row'>
          <h1 className='text-center'>Currency Converter</h1>
        </div>

        <div className='row'>
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;
