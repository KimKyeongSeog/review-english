import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

console.log(englishData);

const Main = () => {
  return (
    <div className="bg-gray-100 min-h-screen max-w-screen-md mx-auto px-8 pt-20">
      <h1 className="font-['HB'] text-center text-3xl font-bold text-blue-500 ">
        Daily Sentences
      </h1>
      <ul className="mt-12">
        {englishData.map((v, i) => (
          <MainCard key={i} title={v.title} day={v.day} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
