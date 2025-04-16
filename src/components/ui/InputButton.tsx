import '../../App.css';

interface InputButtonProps {
  string: string;
	defaultValue?: number;
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputButton: React.FC<InputButtonProps> = ({ string, className = '', onClick }) => {
  return (
    <>
			<div className={`w-full`}>
        <button className={`w-full text-center ${className}`} onClick={onClick}>{string}</button>
			</div>
    </>
  )
}

export default InputButton
