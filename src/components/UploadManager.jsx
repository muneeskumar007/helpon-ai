
import React, { useState } from 'react'
import { ref as sref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, db } from '../firebase'
import { doc as fdoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'

export default function UploadManager({ docId }) {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  async function startUpload() {
    if (!file || !docId) return
    setUploading(true)
    const path = `documents/${docId}/${Date.now()}_${file.name}`
    const storageRef = sref(storage, path)
    const task = uploadBytesResumable(storageRef, file)

    task.on('state_changed', snapshot => {
      const p = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(p)
    }, err => {
      console.error('Upload err', err)
      setUploading(false)
    }, async () => {
      const url = await getDownloadURL(task.snapshot.ref)
      // update Firestore document files array
      const docRef = fdoc(db, 'documents', docId)
      await updateDoc(docRef, {
        files: arrayUnion({ name: file.name, path, type: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image', url, uploadedAt: serverTimestamp() })
      })
      setFile(null)
      setProgress(0)
      setUploading(false)
    })
  }

  return (
    <div className="p-3 border rounded-md">
      <label className="block text-sm font-medium mb-2">Upload file</label>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      {file && <div className="mt-2 text-sm">Selected: {file.name}</div>}
      {uploading && <div className="mt-2">Uploading: {progress}%</div>}
      <div className="mt-3 flex gap-2">
        <button onClick={startUpload} disabled={!file || uploading} className="px-3 py-1 bg-green-600 text-white rounded-md">Start Upload</button>
        <button onClick={() => setFile(null)} disabled={uploading} className="px-3 py-1 border rounded-md">Cancel</button>
      </div>
    </div>
  )
}
