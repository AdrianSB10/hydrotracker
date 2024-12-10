import { useState } from 'react';

interface DailyIntakeProps {
  onAddIntake: (amount: number) => void;
  dailyIntake: { date: string, time: string, amount: number }[];
}

const DailyIntake: React.FC<DailyIntakeProps> = ({ onAddIntake, dailyIntake }) => {
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState<'ml' | 'l'>('ml');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const intakeAmount = unit === 'ml' ? amount : amount * 1000;
    onAddIntake(intakeAmount);
    setAmount(0);
  };

  return (
    <div className="mt-4">
      <h2>Registro Diario de Consumo de Agua</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder={`Cantidad de agua (${unit})`}
          />
        </div>
        <div className="form-group">
          <button type="button" className={`btn ${unit === 'ml' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setUnit('ml')}>Mililitros</button>
          <button type="button" className={`btn ${unit === 'l' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setUnit('l')}>Litros</button>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <h3 className="mt-4">Historial de Consumo</h3>
      <ul className="list-group">
        {dailyIntake.map((entry, index) => (
          <li key={index} className="list-group-item">
            {entry.date} {entry.time}: {entry.amount} ml
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyIntake;