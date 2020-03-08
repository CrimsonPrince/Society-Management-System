import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.pokemon.name}</h1>
    <p>{props.pokemon.xdescription}</p>
    {props.pokemon.imageurl ? <img src={props.pokemon.imageurl} /> : null}
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3001/pokemon/${id}`);
  const pokemon = await res.json();

  console.log(`Fetched Pokemon: ${pokemon.name}`);

  return { pokemon };
};

export default Post;
