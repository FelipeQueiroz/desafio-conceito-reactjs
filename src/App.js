import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      return setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'www.github.com/projeto-novo',
      techs: 'ReactJS'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <h1> Lista de repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id} >
            {repository.title}<br/>
            {repository.url}<br/>
            {repository.techs}<br/>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
        )}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
