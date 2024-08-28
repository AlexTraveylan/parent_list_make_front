export default function SchoolListPage({
  params,
}: {
  params: { school_id: string }
}) {
  return (
    <div>
      <h1>School List {params.school_id}</h1>
      <p>School List Page</p>
    </div>
  )
}
