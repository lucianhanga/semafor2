const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
});

// Register other functions
require('./functions/UpdateUsers');
require('./functions/UpdateState');
require('./functions/CleanUpUsers'); // Register the new cleanup function
