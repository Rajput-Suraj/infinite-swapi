import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && (
        <div
          style={{
            position: 'fixed',
            top: '5px',
            right: '5px',
          }}
        >
          Loading more data...
        </div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map(({ name, average_lifespan, language }) => (
            <Species
              key={name}
              name={name}
              averageLifespan={average_lifespan}
              language={language}
            />
          ));
        })}
      </InfiniteScroll>
    </>
  );
}
