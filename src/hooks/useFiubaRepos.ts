// Creditos a FdelMazo/FIUBA-Repos
// https://github.com/FdelMazo/FIUBA-Repos/blob/master/src/useData.js

import { useEffect, useState } from "react";
import { Repository, ResponseData } from "../data/githubInterfaces";

function useFiubaRepos(): [Repository[], boolean] {
  const [fiubaRepos, setFiubaRepos] = useState<Repository[]>([]);
  const [partialLoading, setPartialLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let totalCount = null;
      const items: Repository[] = [];
      let i = 1;
      setPartialLoading(true);
      while (!totalCount || items.length < totalCount) {
        const res = await fetch(
          `https://api.github.com/search/repositories?` +
            new URLSearchParams({
              q: "topic:fiuba fork:true",
              sort: "updated",
              order: "desc",
              page: i.toString(),
              per_page: "100", //cambiar en produccion
            }),
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        const json: ResponseData = await res.json();
        if (!json.items || !json.items.length) {
          break;
        }
        totalCount = json.total_count;
        items.push(...json.items);
        setFiubaRepos(() => [...items]);
        i++;
      }
      setPartialLoading(false);
    };
    fetchData();
  }, []);

  return [fiubaRepos, partialLoading];
}

export default useFiubaRepos;
