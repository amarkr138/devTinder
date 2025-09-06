import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './component/Body';
import Login from './component/Login';
import Profile from './component/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './component/Feed';
import Connections from './component/Connections';
import Requests from './component/Requests';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connections />} />
              <Route path="/request" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
