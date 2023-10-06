import { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

import { useError } from "./common";
import { urls } from "../constants/urls";

export const useMangaDetails = (mangaId) => {
  const setError = useError();

  const [isLoading, setIsLoading] = useState(true);
  const [manga, setManga] = useState({
    id: mangaId,
    cover: "",
    name: "",
    genres: [],
    author: [],
    status: "",
    updated: "",
    rating: 0,
    description: "",
    chapters: [],
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urls.getDetails.replace(":mangaId", mangaId))
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const imgInfo = $(".info-image .img-loading");
        const cover = imgInfo.attr("src");
        const name = imgInfo.attr("alt");
        const infoTable = $(".variations-tableInfo tr");
        const authorsTag = infoTable.eq(1).find("td:last-child a");
        const status = infoTable.eq(2).find("td:last-child").text();
        const genreTag = infoTable.eq(3).find("td:last-child a");
        const updated = $(".story-info-right-extent")
          .find(".stre-value:first")
          .text();
        const rating = $("[property=v:average]").text();
        const description = $("#panel-story-info-description").text();

        const authors = [];
        authorsTag.each(function () {
          const urlArr = $(this).attr("href").split("/");
          if (urlArr.length > 0) {
            const id = urlArr[urlArr.length - 1];
            const name = $(this).text();
            authors.push({ id, name });
          }
        });

        const genres = [];
        genreTag.each(function () {
          const urlArr = $(this).attr("href").split("/");
          if (urlArr.length > 0) {
            const id = urlArr[urlArr.length - 1];
            const name = $(this).text();
            genres.push({ id, name });
          }
        });

        const chapterTags = $(".row-content-chapter li");

        const chapters = [];
        chapterTags.map(function () {
          const anchor = $(this).find("a");
          const name = anchor.text();
          const date = $(this).find(".chapter-time").text();

          const link = anchor.attr("href").split("/");
          if (link.length > 0) {
            const id = link[link.length - 1];
            chapters.push({ id, name, date });
          }
        });

        setManga({
          id: mangaId,
          cover: cover,
          name: name,
          genres: genres,
          author: authors,
          status: status,
          updated: updated,
          rating: Number(rating),
          description: description,
          chapters: chapters,
        });

        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [mangaId, setError]);

  return [manga, isLoading];
};
