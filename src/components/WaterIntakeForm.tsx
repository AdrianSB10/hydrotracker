import { useState } from 'react';

interface WaterIntakeFormProps {
  onAddIntake: (amount: number) => void;
}

const WaterIntakeForm: React.FC<WaterIntakeFormProps> = ({ onAddIntake }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIntake(amount);
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Cantidad de agua (ml)"
        />
      </div>
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
};

export default WaterIntakeForm;