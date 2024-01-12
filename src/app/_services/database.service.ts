'use server'
import {environment} from "@environments/environment";
import {Collection, Db, MongoClient} from "mongodb";

export const collections: { account?: Collection } = {}

export async function connectToDatabase () {

  const client: MongoClient = new MongoClient(environment.databaseUrl);

  await client.connect();

  const db: Db = client.db("utc-vitis");

  const accountCollection: Collection = db.collection("account");

  collections.account = accountCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${accountCollection.collectionName}`);
}
