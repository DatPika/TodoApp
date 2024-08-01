import { Task } from './types';
import { useEffect } from 'react';
import TaskRow from './TaskRow';

type Props = {
  handleClick: () => void;
  data: Task[];
};

const TaskList: React.FC<Props> = ({ handleClick, data }) => {
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div id="taskList">
      {data.map((task: Task) => {
        return (
          <TaskRow
            handleClick={handleClick}
            task={task}
            buttonText={task.status == 'incomplete' ? 'Done' : 'Nevermind'}
            taskText={
              task.status == 'incomplete' ? task.name : <s>{task.name}</s>
            }
            key={task.id}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
