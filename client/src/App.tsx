import { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { Task } from './types';

function App() {
  const [data, setData] = useState<Task[]>([]);
  const [formTaskName, setFormTaskName] = useState<string>('');

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3000/api');
    setData(response.data);
  };

  const createTask = async () => {
    if (!formTaskName.trim()) {
      setFormTaskName('');
      return alert('Please enter a task name');
    }

    await axios.post('http://localhost:3000/api/create', {
      name: formTaskName,
    });

    fetchTasks();
    setFormTaskName('');
  };

  const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  return (
    <>
      <h1 id="title">Todo App</h1>
      <div className="addTaskContainer">
        <input
          name="taskName"
          // This onChange allows the input to update
          onChange={(e) => {
            setFormTaskName(e.target.value);
          }}
          value={formTaskName}
          // Since adding isn't a form anymore, enter doesn't submit so must add manually
          onKeyDown={handlePressKey}
        ></input>
        <button onClick={createTask}>Add</button>
      </div>
      <TaskList handleClick={fetchTasks} data={data} />
    </>
  );
}

export default App;
