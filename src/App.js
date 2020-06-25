import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositorie ${new Date().toString()}`,
      url: 'blablablablabldfas',
      techs: ['React', 'Node', 'asdasasd'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newArray = [];
    repositories.filter((repository) => {
      if (repository.id !== id) {
        newArray.push(repository);
      }
    });

    setRepositories(newArray);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
