export function InputBox({label, placeholder, onChange}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div> 
      {/* Here onChange is a function that tooks {onChange} as a prop that is passed by parent component to it
      It mean that whenever this input feild get any keyPress/change it triggers the onChange function  */}
      <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}