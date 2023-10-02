import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Resources.css";

const Resources = () => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://bing-news-search1.p.rapidapi.com/news?safeSearch=off&textFormat=Raw`,
        {
          headers: {
            "X-BingApis-SDK": "true",
            "X-RapidAPI-Key":
              "b05e0873a7msh014360ebd351fa9p137150jsnd9623429f690",
            "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setNewsData(response?.data?.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h5 className="text-success">Resources</h5>
      {newsData?.map((data, index) => {
        return (
          <div className="card my-3 resources_card" key={index}>
            <a href={data.url} target="blank">
              <div className="card-body">
                <img
                  className="news_img "
                  src={data?.image?.thumbnail?.contentUrl}
                  alt="News"
                />
                <div className="resources_card_text">
                  <p>{data.name}</p>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Resources;

// Marketing Channels that consistently work for founder.
// I’ve anlayzed all 479 founder interview on indie Hackers & uncoverd the mar......s
