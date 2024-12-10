import { useState } from 'react';

interface GoalFormProps {
  onSetGoal: (goal: number) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSetGoal }) => {
  const [goal, setGoal] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetGoal(goal);
    setGoal(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          placeholder="Meta de hidratación (litros)"
        />
      </div>
      <button type="submit" className="btn btn-primary">Establecer Meta</button>
    </form>
  );
};

export default GoalForm;