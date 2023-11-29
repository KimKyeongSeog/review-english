import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";

const Day = () => {
  const [dailyData, setDailyData] = useState();

  const [isVisible, setIsVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { day } = useParams();

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };

  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(dailyData.sentences.length - 1)
      : setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    englishData.forEach((v) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, [day]);
  //map은 리턴값을 요구, forEach로!
  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading......</div>;

  return (
    <div className="container relative">
      <div className="absolute">
        <button className="btn-style py-1 px-2 bg-pink-400 text-white font-semibold  rounded-xl ml-2">
          <Link to="/">Back</Link>
        </button>
      </div>
      <h1 className="text-center text-2xl font-semibold text-blue-500">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div className="font-['GangWon'] text-2xl">
          {dailyData.sentences[currentPage].english}
        </div>
        <button
          className={`font-['GangWon'] text-2xl ${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>

        <div className="mt-4 ml-2">
          <button
            className="btn-style py-1 px-2 bg-blue-400 text-white rounded-xl font-semibold"
            onClick={onClickPrev}
          >
            Prev
          </button>
          <button
            className="btn-style py-1 px-2 bg-blue-400 text-white font-semibold rounded-xl ml-2"
            onClick={onClickNext}
          >
            Next
          </button>
          <button className="btn-style py-1 px-2 bg-blue-400 text-white font-semibold  rounded-xl ml-2">
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day;
