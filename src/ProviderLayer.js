import {
    AuthProvider,
    DatabaseProvider,
    FirestoreProvider,
    useFirebaseApp,
  } from "reactfire";
  import App from "./App";
  import DataProvider from "./context/DataProvider";
  
  import { getAuth } from "firebase/auth";
  import { getDatabase } from "firebase/database";
  import { getFirestore } from "firebase/firestore";
  
  const ProviderLayer = () => {
    const app = useFirebaseApp();
    // Our SDK initialization for the DB
    const db = getDatabase(app);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return (
      <DataProvider>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <DatabaseProvider sdk={db}>
              <App />
            </DatabaseProvider>
          </FirestoreProvider>
        </AuthProvider>
      </DataProvider>
    );
  };
  export default ProviderLayer;