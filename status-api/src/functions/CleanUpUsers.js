const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

const tableName = "Users";
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableClient = TableClient.fromConnectionString(connectionString, tableName);

app.timer('CleanUpUsers', {
  schedule: '59 23 * * *', // Runs every day at 13:40 UTC
  handler: async () => {
    console.log("CleanUpUsers function triggered.");

    try {
      const usersToDelete = [];
      const entitiesIter = tableClient.listEntities();

      // Collect all users for deletion
      for await (const entity of entitiesIter) {
        usersToDelete.push(entity);
      }

      // Delete all users
      for (const user of usersToDelete) {
        await tableClient.deleteEntity(user.partitionKey, user.rowKey);
        console.log(`Deleted user with ID: ${user.rowKey}`);
      }

      console.log("All users have been deleted successfully.");
    } catch (error) {
      console.error("Error occurred during cleanup:", error.message);
    }
  }
});
