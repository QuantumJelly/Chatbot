# README

This is a ChatBot Demo Project

## Available Scripts

In the project directory, you can run:

### `npm start`

Run the APP in DEV mode

### `npm run build`

Build the APP for production

## To integrate ChatBot in your React APP
```jsx
import './App.css';
import ChatBot from './components/ChatBot';

const App = () => {
  return (
    <div className="App">
      <h1>Chatbot Demo</h1>
      <ChatBot />
    </div>
  );
};

export default App;

```

## Components Directory
- Chatbot
    - index.jsx            # Chatbot entry
    - index.css # Chatbot style sheet
    - ChatbotDialog             # Chatbot Dialog
        - image     # assets
        - chat.js    # config file and chat function
        - index.jsx # Dialog Entry
        - index.css # Dialog style sheet

## TODOs
### build up backend project which includes
1. database design to store dialog content
2. rate limit
3. connect with open-source api
  
### upload chatbot components into official npm repo
 
