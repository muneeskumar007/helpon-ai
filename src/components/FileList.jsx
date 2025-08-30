
import React from 'react'

export default function FileList({ files = [], onSelect = () => {}, selected = null }) {
  if (!files || files.length === 0) return <div className="text-sm text-gray-500">No files attached</div>

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Files</h3>
      <div className="flex flex-col gap-2">
        {files.map(f => (
          <button
            key={f.name}
            onClick={() => onSelect(f)}
            className={`flex items-center gap-3 p-2 rounded-md text-left hover:bg-gray-50 ${selected?.name === f.name ? 'ring-2 ring-blue-200' : ''}`}
          >
            <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
              {f.type === 'image' && f.url ? (
                <img src={f.url} alt={f.name} className="object-cover w-full h-full" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium truncate">{f.name}</div>
              <div className="text-xs text-gray-500">{f.type.toUpperCase()}</div>
            </div>
            <div className="text-xs text-gray-400">{f.url ? 'Preview' : 'No URL'}</div>
          </button>
        ))}
      </div>
    </div>
  )
}