import dotenv from 'dotenv';
dotenv.config();
import removeExpiredCodes from './scripts/cronJobs';
removeExpiredCodes();
import createTables from './scripts/tables';
import app from './app';

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        // await createTables();  // create the tables in the DB.
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error setting up the database:', error);
        process.exit(1); // Exit if tables couldn't be created
    }
})();
