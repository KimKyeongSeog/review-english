import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import axios from "axios";

const Day = () => {
  const [dailyData, setDailyData] = useState();

  const [isVisible, setIsVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

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

  const onClickSound = async () => {
    try {
      setIsLoading(true);

      if (isLoading) return;

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english
          },
          voice: {
            languageCode: "en-gb",
            name: "en-GB-Standard-A",
            ssmlGender: "FEMALE"
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: "1",
            pitch: "1"
          }
        }
      );

      console.log(response);

      const binaryData = atob(response.data.audioContent);

      const byteArray = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });

      const newAudio = new Audio(URL.createObjectURL(blob));

      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 5000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
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
          {dailyData.sentences[currentPage].number}
          {dailyData.sentences[currentPage].english}
        </div>
        <button
          className={`text-left font-['GangWon'] text-2xl ${
            !isVisible && "bg-black"
          }`}
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
          <button
            className="btn-style py-1 px-2 bg-blue-400 text-white font-semibold  rounded-xl ml-2"
            onClick={onClickSound}
          >
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day;

// 1. api 가져오기

// 2. binaryData = atob(response.data.audioContent); base64 형식의 데이터 디코딩

// 3.  const byteArray = new Uint8Array(binaryData.length);

// for (let i = 0; i < binaryData.length; i++) {
//   byteArray[i] = binaryData.charCodeAt(i);
// } 을 통해 바이트 단위로 쪼갠 후 숫자로 출력

// 4. 바이너리 라지 오브젝트(BLOB)로 다시 변경
// 5. html 사용 (오디오 사용, 다운로드)
// 6. 딜레이 설정
