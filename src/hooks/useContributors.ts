import { useEffect, useState } from "react";
import { Contributor } from "../data/githubInterfaces";

function useContributors(url_contributors?: string): [Contributor[], boolean] {
  const [data, setData] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        url_contributors +
          "?" +
          new URLSearchParams({
            sort: "updated",
            order: "desc",
          }),
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      setData(await res.json());
      setLoading(false);
    };

    fetchData();
  }, []);

  return [data, loading];
}

export default useContributors;
