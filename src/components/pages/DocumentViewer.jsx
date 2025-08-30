

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import FileList from '../FileList';
import Chatbot from '../Chatbot';
import BackButton from '../BackButton';
import UploadManager from '../UploadManager';

const DocumentViewer = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, 'documents', id);``
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setDocumentData({ id: snap.id, ...snap.data() });
      }
    };
    fetchDoc();
  }, [id]);

  if (!documentData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-2">{documentData.title}</h1>
      <p className="mb-4">{documentData.description}</p>
      <UploadManager docId={id} />
      <FileList files={documentData.files} />
      <Chatbot docId={id} />
    </div>
  );
};

export default DocumentViewer;