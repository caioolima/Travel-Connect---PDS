// App.js
import React from 'react';
import Header from './components/Header/header'; // Atualize o caminho para Header.js
import Form from './components/Form/form'; // Atualize o caminho para Form.js
import Footer from './components/Footer/footer'; // Atualize o caminho para Footer.js

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

      <Footer />
    </div>
  );
}

export default App;