import "./StatCard.css";

function StatCard(props) {
  return (
    <div className="stat-card">
      <strong>{props.value}</strong>
      <span>{props.label}</span>
    </div>
  );
}

export default StatCard;
