import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

import { useError } from "./common";
import { urls } from "../constants/urls";

export const useMangaNew = () => {
  const setError1 = useError();

  const [isRefreshing1, setIsRefreshing1] = useState(false);
  const [pageNo1, setPageNo1] = useState(1);
  const [manga1, setManga1] = useState([]);

  const getManga1 = useCallback(() => {
    setIsRefreshing1(true);
    axios
      .get(urls.genreAll.replace(":pageNo", pageNo1.toString()), {
        params: {
          type: "genre-all"
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
          });
        });

        setManga1((prevState) => {
          if (pageNo1 === 1) {
            return [...items];
          } else {
            return [...prevState, ...items];
          }
        });
        setIsRefreshing1(false);
      })
      .catch((e) => {
        setError1(e.message);
        setIsRefreshing1(false);
      });
  }, [pageNo1, setError1]);

  useEffect(() => {
    getManga1();
  }, [getManga1]);

  return [manga1, setPageNo1, isRefreshing1, setManga1];
};
