import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Adicionei esses status padrão pois na api o enum força a ser um desses valores
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'NOT_STARTED' });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8080/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  //Carregar direto do bd as tarefas salvas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Task[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post<Task>(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', status: 'NOT_STARTED' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const getStatusBadgeClass = (status: Task['status']) => {
    switch (status) {
      case 'NOT_STARTED': return 'status-badge status-not-started';
      case 'IN_PROGRESS': return 'status-badge status-in-progress';
      case 'COMPLETED': return 'status-badge status-completed';
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Gerenciador de tarefas cotidianas</h1>
      </header>

      <div className="task-container">
        <div className="task-form">
          <h2>Criar uma nova tarefa</h2>
          <div className="input-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Digite o título da tarefa..."
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Digite a descrição da tarefa..."
            />
          </div>
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
            >
              <option value="NOT_STARTED">Não iniciada</option>
              <option value="IN_PROGRESS">Em progresso</option>
              <option value="COMPLETED">Completa</option>
            </select>
          </div>
          <button onClick={createTask}>Criar tarefa</button>
                  </div>

        <div className="task-list">
          <h2>Task List</h2>
          {loading ? (
            <p>Carregando suas tarefas...</p>
          ) : tasks.length === 0 ? (
            <p>Não há tarefas</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="task-item" onClick={() => setSelectedTask(task)}>
                  <span>{task.title}</span>
                  <span className={getStatusBadgeClass(task.status)}>{task.status.replace('_', ' ')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedTask && (
          <div className="task-details">
            <h2>Detalhes da tarefa</h2>
            <p><strong>Título:</strong> {selectedTask.title}</p>
            <p><strong>Descrição:</strong> {selectedTask.description}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={getStatusBadgeClass(selectedTask.status)}>
                {selectedTask.status.replace('_', ' ')}
              </span>
            </p>
            <button onClick={() => setSelectedTask(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
