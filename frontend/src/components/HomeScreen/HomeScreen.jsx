// App.js
import React from 'react';
import Header from '../Header/header'; // Atualize o caminho para Header.js
import Form from '../Form/form'; // Atualize o caminho para Form.js


function App() {
  const handleLogin = () => {
    console.log('Tentativa de login');
  };


  return (
    <div>
      <Header />
      <main>
        <Form onSubmit={handleLogin} buttonText="Entrar"/>
      </main>

    </div>
  );
}

export default App;