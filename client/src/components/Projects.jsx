import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

const Projects = ({id}) => {
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <p>loading</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <p>{data.project.client.name}</p>
        </div>
      )}
    </>
  );
}

export {Projects}