interface ProgressProps {
  intake: number;
  goal: number;
}

const Progress: React.FC<ProgressProps> = ({ intake, goal }) => {
  const progress = (intake / (goal * 1000)) * 100;

  return (
    <div className="mt-4">
      <h2>Progreso</h2>
      <p>{intake} ml / {goal * 1000} ml ({goal} litros)</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default Progress;