

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import FileList from '../FileList';
import Chatbot from '../Chatbot';
import BackButton from '../BackButton';
import UploadManager from '../UploadManager';

const DocumentViewer = () => {
  
};

export default DocumentViewer;