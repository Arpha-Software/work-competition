type PageParams = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: PageParams) {
  return (
    <main>
      Current page: {slug}
    </main>
  );
}
