import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <div className="flex p-4 gap-4 font-['Helvetica_Neu_Bold']">
        <span className=" bg-blue-400 text-white inline-block rounded-xl w-12 h-12 text-sm text-center pt-[12px] font-semibold">
          Day {day}
        </span>
        <span className="font-['GangWon'] pt-3 duration-150 hover:font-extrabold hover:text-3xl text-2xl hover:border-b-[1px] border-black">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default MainCard;
