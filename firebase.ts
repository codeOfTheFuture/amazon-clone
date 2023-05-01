import admin, { ServiceAccount } from "firebase-admin";

const FIREBASE_CONFIG: admin.ServiceAccount = process.env.FIREBASE_CONFIG as ServiceAccount;

type App = admin.app.App;

const app: App = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(FIREBASE_CONFIG),
	  })
	: admin.app();

const db: admin.firestore.Firestore = app.firestore();

export default db;
