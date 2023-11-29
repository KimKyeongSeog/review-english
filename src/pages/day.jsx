import { useParams } from "react-router-dom";

const Day = () => {
  const { day } = useParams();

  return <div>Day {day}</div>;
};

export default Day;
