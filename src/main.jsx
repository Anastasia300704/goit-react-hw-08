import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <BrowserRouter basename="/goit-react-hw-08">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
