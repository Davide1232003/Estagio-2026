function Button({ className, onClick, disabled, children }) {
  return (
    <button className={className} 
            onClick={onClick} 
            disabled={disabled}
    >
            {children}
    </button>
  );
}

export default Button;
