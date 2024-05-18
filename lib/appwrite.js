import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '664757f0003bac5d3324',
  databaseId: '664758d1000824aaa381',
  userCollectionId: '664758e4003783efeb21',
  vidoeCollectionId: '664758fa0033337f8bca',
  storageId: '66475a3b002899833982',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  vidoeCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error('Account not created');
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('No user found');
    }

    console.log(currentAccount);

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error('No user found');
    }

    console.log(currentUser);

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, vidoeCollectionId);

    return posts.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.orderDesc('$createdAt', Query.limit(7)),
    ]);
    console.log('ye');
    return posts.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.search('title', query),
    ]);
    return posts.documents;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId, vidoeCollectionId, [
      Query.equal('users', userId),
    ]);
    return posts.documents;
  } catch (e) {
    throw new Error('ye');
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (e) {
    throw new Error(e);
  }
};
