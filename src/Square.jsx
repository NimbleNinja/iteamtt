import './Square.css';

const Square = (props) => {
  return (
    <div
      className="square"
      onClick={props.onClick}>
      <div className={props.className}></div>
    </div>
  );
}

export default Square;