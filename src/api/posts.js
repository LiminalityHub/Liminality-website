import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy,
  where
} from 'firebase/firestore';

const POSTS_COLLECTION = 'posts';

export async function fetchPosts() {
  try {
    const postsRef = collection(db, POSTS_COLLECTION);
    
    // On the website, we only want to see 'published' posts
    const q = query(
      postsRef, 
      where('status', '==', 'published'),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    throw error;
  }
}
