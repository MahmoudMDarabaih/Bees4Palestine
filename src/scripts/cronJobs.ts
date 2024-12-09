import cron from 'node-cron';
import { Pool } from 'mysql2/promise';
import db from '../config/pool';

const removeExpiredCodes = async (): Promise<void> => {
    try {
        const [result] = await db.query(
            `DELETE FROM InvitationCodes
             WHERE is_used = false
               AND created_at < NOW() - INTERVAL 1 DAY`
        );
        console.log(`Expired invitation codes removed: ${result}`);
    } catch (error) {
        console.error('Error removing expired codes:', error);
    }
};

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running cleanup of expired invitation codes...');
    removeExpiredCodes();
});

export default removeExpiredCodes;
