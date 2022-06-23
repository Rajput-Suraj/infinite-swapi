import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

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
          return pageData.results.map(({ name, eye_color, hair_color }) => (
            <Person key={name} name={name} eyeColor={eye_color} hairColor={hair_color} />
          ));
        })}
      </InfiniteScroll>
    </>
  );
}
