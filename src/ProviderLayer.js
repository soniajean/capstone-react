import { useFirebaseApp, AuthProvider, DatabaseProvider } from "reactfire";
import App from "./App";
import DataProvider from "./context/DataProvider";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const ProviderLayer = () => {

    const app = useFirebaseApp();
    // Our SDK initialization for the DB
    const db = getFirestore(app);
    const auth = getAuth(app);
    return (
        <DataProvider>
            <AuthProvider sdk={auth}>
                <DatabaseProvider sdk={db}>
                    <App />
                </DatabaseProvider>
            </AuthProvider>
        </DataProvider>
    )
}
export default ProviderLayer;