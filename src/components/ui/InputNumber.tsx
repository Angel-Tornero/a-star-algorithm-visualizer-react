import '../../App.css';

interface InputNumberProps {
  string: string;
	defaultValue?: number;
	className?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	min?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({ string, defaultValue = 0, className = '', onChange, min = 0 }) => {
  return (
    <>
			<div className={`grid grid-flow-col grid-cols-2 gap-4 ${className}`}>
				<div className="text-sm col-span-6 text-left">
						{string}
				</div>
				<div className="col-span-6">
					<input type="number" className="!text-sm bg-gray-300 text-black text-right" defaultValue={defaultValue} onChange={onChange} min={min}></input>
				</div>
			</div>
    </>
  )
}

export default InputNumber
