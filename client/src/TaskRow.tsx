import axios from 'axios';
import { Task } from './types';

type Props = {
  handleClick: () => void;
  task: Task;
  buttonText: string;
  taskText: string | React.ReactNode;
};

const TaskRow: React.FC<Props> = ({
  handleClick,
  task,
  buttonText,
  taskText,
}) => {
  const updateTaskStatus = async (id: number, status: string) => {
    const newStatus = status === 'incomplete' ? 'complete' : 'incomplete';

    await axios.patch('http://localhost:3000/api/' + id, {
      status: newStatus,
    });
    handleClick();
  };

  const removeTask = async (id: number) => {
    await axios.delete('http://localhost:3000/api/' + id);
    handleClick();
  };

  return (
    <div key={String(task.id)} className="task">
      <p>
        {taskText} | {task.status}
      </p>
      <div className="actions">
        <button
          onClick={() => {
            updateTaskStatus(task.id, task.status);
            handleClick();
          }}
        >
          {buttonText}
        </button>
        <button
          onClick={() => {
            removeTask(task.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TaskRow;
