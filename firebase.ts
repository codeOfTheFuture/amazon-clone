import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "@/permissions.json";

const PRODUCTION_ENV: boolean = process.env.NODE_ENV === "production";
const FIREBASE_CONFIG: admin.ServiceAccount = process.env.FIREBASE_CONFIG as ServiceAccount;

type App = admin.app.App;

const app: App = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(
				PRODUCTION_ENV ? FIREBASE_CONFIG : (serviceAccount as ServiceAccount)
			),
	  })
	: admin.app();

const db: admin.firestore.Firestore = app.firestore();

export default db;
