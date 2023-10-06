import { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

import { useError } from "./common";
import { BASE_URL, urls } from "../constants/urls";

export const useChapterDetails = (mangaId, chapterId) => {
  const url = urls.chapterDetails
    .replace(":mangaId", mangaId)
    .replace(":chapterId", chapterId);

  const setError = useError();

  const [isLoading, setIsLoading] = useState(true);
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const imagesInput = $(".container-chapter-reader img");
        const images = [];
        imagesInput.each(function () {
          const image = $(this)?.attr("src");
          if (image) {
            images.push({
              uri: image,
              referer: BASE_URL,
            });
          }
        });

        setChapter(images);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [setError, url]);

  return [chapter, isLoading];
};
