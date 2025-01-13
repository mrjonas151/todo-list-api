import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './components/ConfirmModal';


interface Task {
  id: number;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

const App: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; description: string; status: Task['status'] }>({ title: '', description: '', status: 'NOT_STARTED' });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({ isOpen: false, taskId: null });

  const API_URL = 'http://localhost:8080/tasks';

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Task[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      toast.error('Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      toast.warning('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post<Task>(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', status: 'NOT_STARTED' });
      await fetchTasks();
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar tarefa');
      console.error('Erro ao criar tarefa:', error);
    }
  };

   const deleteTask = async (id: number) => {
    setDeleteModal({ isOpen: true, taskId: id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.taskId) return;
    
    try {
      await axios.delete(`${API_URL}/${deleteModal.taskId}`);
      setTasks(tasks.filter(task => task.id !== deleteModal.taskId));
      setSelectedTask(null);
      await fetchTasks();
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
      console.error('Erro ao deletar tarefa:', error);
    } finally {
      setDeleteModal({ isOpen: false, taskId: null });
    }
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      const response = await axios.put<Task>(`${API_URL}/${id}`, {
        ...selectedTask,
        ...updatedTask
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setSelectedTask(response.data);
      setEditMode(false);
      await fetchTasks();
      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  //esse método que recebe o status de uma tarefa e retorna a classe CSS correspondente deixando dinâmico o estilo
  const getStatusBadgeClass = (status: Task['status']): string => {
    switch (status) {
      case 'NOT_STARTED':
        return 'status-badge status-not-started';
      case 'IN_PROGRESS':
        return 'status-badge status-in-progress';
      case 'COMPLETED':
        return 'status-badge status-completed';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className={`App ${theme}`}>
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        onConfirm={confirmDelete}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta tarefa?"
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <header className="app-header">
        <h1>Gerenciador de tarefas cotidianas</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div className="task-container">
        <div className="task-form">
          <h2>Criar Nova Tarefa</h2>
          <div className="input-group">
            <label>Título</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Descrição</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Status</label>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task['status'] })}
            >
              <option value="NOT_STARTED">Não iniciada</option>
              <option value="IN_PROGRESS">Em progresso</option>
              <option value="COMPLETED">Completa</option>
            </select>
          </div>
          <button onClick={createTask}>Criar Tarefa</button>
        </div>

        <div className="task-list">
          <h2>Lista de Tarefas</h2>
          {loading ? (
            <p>Carregando suas tarefas...</p>
          ) : tasks.length === 0 ? (
            <p>Não há tarefas</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div className="task-item-content" onClick={() => setSelectedTask(task)}>
                    <span className="task-title">{task.title}</span>
                    <span className={getStatusBadgeClass(task.status)}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="task-actions">
                    <button 
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                        setEditMode(true);
                      }}
                    >
                      Editar
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedTask && (
          <div className="task-details">
            <h2>{editMode ? 'Editar Tarefa' : 'Detalhes da Tarefa'}</h2>
            {editMode ? (
              <>
                <div className="input-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={selectedTask.title}
                    onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Descrição</label>
                  <textarea
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => setSelectedTask({...selectedTask, status: e.target.value as Task['status']})}
                  >
                    <option value="NOT_STARTED">Não iniciada</option>
                    <option value="IN_PROGRESS">Em progresso</option>
                    <option value="COMPLETED">Completa</option>
                  </select>
                </div>
                <div className="button-group">
                  <button onClick={() => updateTask(selectedTask.id, selectedTask)}>Salvar</button>
                  <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Título:</strong> {selectedTask.title}</p>
                <p><strong>Descrição:</strong> {selectedTask.description}</p>
                <p>
                  <strong>Status:</strong>
                  <span className={getStatusBadgeClass(selectedTask.status)}>
                    {selectedTask.status.replace('_', ' ')}
                  </span>
                </p>
                <div className="button-group">
                  <button onClick={() => setEditMode(true)}>Editar</button>
                  <button className="delete-btn" onClick={() => deleteTask(selectedTask.id)}>Excluir</button>
                  <button className="cancel-btn" onClick={() => setSelectedTask(null)}>Fechar</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;