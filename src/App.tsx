import { useEffect } from 'react';
import './main.global.css';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer, saveToken } from './store/store';
import { LoadFormContainer } from './shared/LoadFormContainer';
import { Content } from './shared/Content';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function App() {
  useEffect(() => {
    if (window.location.hash !== '') {
      store.dispatch<any>(saveToken());
    }
  }, []);

  return (
    <Provider store={store}>
      <Content>
        <LoadFormContainer />
      </Content>
    </Provider>
  )
}

export default App;
