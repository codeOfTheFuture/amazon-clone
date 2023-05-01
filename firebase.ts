import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "@/permissions.json";

type App = admin.app.App;

const app: App = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount as ServiceAccount),
	  })
	: admin.app();

const db: admin.firestore.Firestore = app.firestore();

export default db;
