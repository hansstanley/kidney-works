import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AppBlog from '../types/blog.app';
import { db } from '../utils/firebase';

export default function useBlogs() {
  const [blogs, setBlogs] = useState<AppBlog[]>([]);

  useEffect(() => {
    async function findJobs() {
      const ref = collection(db, 'blogs');
      const snapshot = await getDocs(ref);
      if (!snapshot.empty) {
        setBlogs(
          snapshot.docs.map((doc) => {
            const { title, story, createdAt } = doc.data();
            return { id: doc.id, title, story, createdAt: createdAt.toDate() };
          }),
        );
      }
    }
    findJobs();
  }, []);

  return { blogs };
}
