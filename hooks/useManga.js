import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

import { useError } from "./common";
import { urls } from "../constants/urls";

export const useManga = () => {
  const setError = useError();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [manga, setManga] = useState([]);

  const getManga = useCallback(() => {
    setIsRefreshing(true);
    axios
      .get(urls.genreAll.replace(":pageNo", pageNo.toString()), {
        params: {
          type: "topview",
        },
      })
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const items = [];
        $(".content-genres-item").each(function () {
          const item = $(this);
          const name = item.find(".genres-item-name")?.text()?.trim();
          const info = item.find(".genres-item-img");
          let id = info?.attr("href")?.trim();
          const image = info.find("img")?.attr("src");
          const rating = info.find(".genres-item-rate").text().trim();
          const latestChapter = item.find(".genres-item-chap")?.text()?.trim();
          const views = item.find(".genres-item-view")?.text()?.trim();
          const genres = [];
       
          const time = item.find(".genres-item-time")?.text()?.trim();
          const author = item.find(".genres-item-author")?.text()?.trim();
          const description = item
            .find(".genres-item-description")
            ?.text()
            ?.trim();

          const idArr = id.split("/");

          if (idArr.length > 0) {
            id = idArr[idArr.length - 1];
          }

          items.push({
            id,
            name,
            image,
            rating: Number(rating),
            latestChapter,
            views,
            time,
            author,
            description,
            genres
          });
        });

        setManga((prevState) => {
          if (pageNo === 1) {
            return [...items];
          } else {
            return [...prevState, ...items];
          }
        });
        setIsRefreshing(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsRefreshing(false);
      });
  }, [pageNo, setError]);

  useEffect(() => {
    getManga();
  }, [getManga]);

  return [manga, setPageNo, isRefreshing];
};
