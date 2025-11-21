export default function NotesFilterSlugPage({ params }: any) {
  return <div>Slug: {params.slug.join("/")}</div>;
}
