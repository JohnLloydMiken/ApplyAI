export default function Stats() {
    const items = [
        {num: "200k+", label: "Resumes Created"},
        {num: "94%", label: "Interview Rate"},
        {num: "4.9★", label: "Average Rating"},
        {num: "3 min", label: "Average Build Time"},
    ]
  return (
    <div className='max-w-full bg-white border border-border'>
        <div className='flex items-center justify-between  md:w-9/12 w-11/12 mx-auto my-0 py-4'>
            {items.map((c, i)=>(
                <div key={i} className='text-primary flex flex-col md:items-center items-start justify-center'><span className="font-extrabold md:text-4xl text-xl font-sans">{c.num}</span> <div className="text-foreground-subtle md:text-sm text-xs font-light">{c.label}</div></div>
            ))}
        </div>
    </div>
  )
}
