import admin from 'firebase-admin';

function parsePrivateKey(key: string | undefined): string | undefined {
    if (!key) return key;
    key = key.trim();
    // Remove surrounding quotes (single or double) if present
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
        key = key.slice(1, -1);
    }
    let parsedKey = key.replace(/\\n/g, '\n').trim();
    // Ensure the key has PEM markers; otherwise wrap it
    if (!parsedKey.startsWith('-----BEGIN') || !parsedKey.endsWith('-----END PRIVATE KEY-----')) {
        parsedKey = `-----BEGIN PRIVATE KEY-----\n${parsedKey}\n-----END PRIVATE KEY-----`;
    }
    return parsedKey;
}

const initFirebaseAdmin = () => {
    const apps = admin.apps;
    if (!apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID, 
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY)
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        })
    }

    return {
        auth: admin.auth(),
        db: admin.firestore()
    }
}
export const { auth, db } = initFirebaseAdmin()

function getFirestore() {
    return admin.firestore();
}

