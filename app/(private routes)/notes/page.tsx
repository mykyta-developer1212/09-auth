export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Note Details</h1>
      <p>Note ID: {params.id}</p>
    </div>
  );
}