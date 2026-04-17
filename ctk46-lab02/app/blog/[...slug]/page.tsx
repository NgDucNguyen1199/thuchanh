type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function BlogCatchAllPage({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="card">
      <h2>Catch-all blog route</h2>
      <p>Ban dang truy cap duong dan:</p>
      <code>/blog/{slug.join("/")}</code>
    </section>
  );
}

