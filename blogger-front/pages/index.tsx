export default function Home() {
  return <div></div>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/blogs",
    },
  };
}
