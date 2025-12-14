interface NotesFilterSlugPageProps {
  params: {
    slug: string[]; 
  };
}

export default function NotesFilterSlugPage({ params }: NotesFilterSlugPageProps) {

  const slugPath = params.slug && params.slug.length > 0 ? params.slug.join("/") : "No slug";

  return <div>Slug: {slugPath}</div>;
}