const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://kudasovaa:kudasovaa@contactcluster.ebwhj8u.mongodb.net/?retryWrites=true&w=majority";

    const contact = new MongoClient(uri);
    try {
        await contact.connect();
        /*
        await listDatabases(contact);
        */
        /*
        await createContact(contact, {
            "firstName": "TestFirstName1",
            "lastName": "TestLastName1",
            "email": "con"+(Math.floor(Math.random() * 100000) + 10000)+"@byui.edu",
            "favoriteColor": "TestColor1",
            "birthday": "01/01/20"
        });
        */
        /*
        await createMultipleContacts(contact, [
            {
                "firstName": "TestFirstName2",
                "lastName": "TestLastName2",
                "email": "con"+(Math.floor(Math.random() * 100000) + 10000)+"@byui.edu",
                "favoriteColor": "TestColor2",
                "birthday": "01/01/20"
            },
            {
                "firstName": "TestFirstName3",
                "lastName": "TestLastName3",
                "email": "con"+(Math.floor(Math.random() * 100000) + 10000)+"@byui.edu",
                "favoriteColor": "TestColor3",
                "birthday": "01/01/20"
            }
        ]);
        */
        /*
        await readOneContact(contact, { favoriteColor: "pink" });
        */
        /*
        await updateContact(contact, { favoriteColor: "pink" }, { favoriteColor: "red" });
        */
        /*
        await upsertContact(contact, { favoriteColor: "pink" }, { 
            firstName: "TestFirstName4",
            lastName: "TestLastName4",
            email: "con"+(Math.floor(Math.random() * 100000) + 10000)+"@byui.edu",
            favoriteColor: "blue",
            birthday: "01/01/20"
        });
        */
        /*
        await updateContacts(contact, { favoriteColor: "red" }, { favoriteColor: "blue" });
        */
        /*
        await deleteContact(contact, { favoriteColor: "green" });
        */

    } catch (e) {
        console.error(e);
    } finally {
        await contact.close();
    }

}

main().catch(console.error);

/* CREATE */
async function createContact(contact, newContact) {
    const result = await contact.db("cse341").collection("contact").insertOne(newContact);

    console.log(`New contact created with the following id: ${result.insertedId}`);
}
async function createMultipleContacts(contact, newContacts) {
    const result = await contact.db("cse341").collection("contact").insertMany(newContacts);

    console.log(`${result.insertedCount} new contacts created with the following id(s):`);
    console.log(result.insertedIds);
}
/* READ (find) */
async function readOneContact(contact, options) {
    const result = await contact.db("cse341").collection("contact").findOne(options);
    console.log("Options:")
    for (let o in options) {
        console.log(`- ${o}: ${options[o]}`)
    }
    if (result) {
        console.log(`Found a contact with the following options:`);
        console.log(result);
    } else {
        console.log(`No contacts found with the following options`);
    }
}
async function readContacts(contact, options) {

}
/* UPDATE */
async function updateContact(contact, options, newContact) {
    const result = await contact.db("cse341").collection("contact").updateOne(options, { $set: newContact});

    console.log(`${result.matchedCount} contact(s) matched the query criteria`);
    console.log(`${result.modifiedCount} contact(s) was/were updated`);
}
async function upsertContact(contact, options, newContact) {
    const result = await contact.db("cse341").collection("contact").updateOne(options, { $set: newContact}, {upsert: true});

    console.log(`${result.matchedCount} contact(s) matched the query criteria`);
    if (result.upsertedCount > 0) {
        console.log(`New contact created with the following id: ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} contact(s) was/were updated`);
    }
}
async function updateContacts(contact, options, newContact) {
    const result = await contact.db("cse341").collection("contact").updateMany(options, { $set: newContact});

    console.log(`${result.matchedCount} contact(s) matched the query criteria`);
    console.log(`${result.modifiedCount} contact(s) was/were updated`);
}
/* DELETE */
async function deleteContact(contact, options) {
    const result = await contact.db("cse341").collection("contact").deleteOne(options);

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}
async function deleteContacts(contact, options) {
    const result = await contact.db("cse341").collection("contact").deleteMany(options);

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function listDatabases(contact) {
    const dblist = await contact.db().admin().listDatabases();
    if (dblist) {
        dblist.databases.forEach(db => {
            console.log(`- ${db.name}`);
        });
    } else {
        console.log(`DB is empty`);
    }
}