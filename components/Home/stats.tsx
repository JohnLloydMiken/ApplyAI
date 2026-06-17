export default function Stats() {
    const items = [
        {num: "200k+", label: "Resumes Created"},
        {num: "94%", label: "Interview Rate"},
        {num: "4.9★", label: "Average Rating"},
        {num: "3 min", label: "Average Build Time"},
    ]
  return (
    <div className='max-w-full bg-white border border-border'>
        <div className='flex items-center justify-between w-9/12 mx-auto my-0 py-4'>
            {items.map((c, i)=>(
                <div key={i} className='text-primary flex flex-col items-center justify-center'><span className="font-extrabold text-4xl font-sans">{c.num}</span> <div className="text-foreground-subtle text-sm font-light">{c.label}</div></div>
            ))}
        </div>
    </div>
  )
}
