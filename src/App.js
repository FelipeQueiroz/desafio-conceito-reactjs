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
    try{
      const response = await api.post('repositories', {
        title: `Novo projeto ${Date.now()}`,
        url: 'www.github.com/projeto-novo',
        techs: ['ReactJS', 'TypeScript']
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    }catch (err) {
      console.error(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => 
          <li key={repository.id} >
            {repository.title}
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
