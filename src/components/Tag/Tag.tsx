import Calendar from "/public/icons/calendar.svg";

type TagProps = {
  label: string,
}

export const Tag = ({ label }: TagProps) => {
  return (
    <div className="flex gap-2 bg-primary px-4 py-2.5 rounded">
      <Calendar />
      <p className="font-bold text-white">{label}</p>
    </div>
  )
}
