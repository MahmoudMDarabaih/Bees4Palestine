import connection from '../config/database';

const createTables = async () => {
    const conn = await connection;

    const tables = [
        {
            name: 'Users',
            query: `
        CREATE TABLE IF NOT EXISTS Users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          full_name VARCHAR(255),
          invitation_code VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255) NOT NULL,
          DOB DATE,
          stars INT DEFAULT 0,
          profile_image_url VARCHAR(255),
          country VARCHAR(255),
          role ENUM('admin', 'user') DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `,
        },
        {
            name: 'Platforms',
            query: `
        CREATE TABLE IF NOT EXISTS Platforms (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255),
          image_URL VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `,
        },
        {
            name: 'Missions',
            query: `
        CREATE TABLE IF NOT EXISTS Missions (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255),
          type ENUM('Strike', 'Support') NOT NULL,
          status ENUM('active', 'disabled', 'finished'),
          body TEXT,
          platform_id INT,
          stars INT,
          expires_at DATETIME,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (platform_id) REFERENCES Platforms(id)
        );
      `,
        },
        {
            name: 'UserMissionCompletion',
            query: `
        CREATE TABLE IF NOT EXISTS UserMissionCompletion (
          user_id INT,
          mission_id INT,
          status ENUM('Started', 'Completed', 'Canceled') DEFAULT 'Started' NOT NULL,
          completed_at DATETIME,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, mission_id),
          FOREIGN KEY (user_id) REFERENCES Users(id),
          FOREIGN KEY (mission_id) REFERENCES Missions(id)
        );
      `,
        },
        {
            name: 'ReportedMissions',
            query: `
        CREATE TABLE IF NOT EXISTS ReportedMissions (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT,   
          mission_URL VARCHAR(255),
          title VARCHAR(255),
          platform_id INT,
          type ENUM('Strike', 'Support') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES Users(id),
          FOREIGN KEY (platform_id) REFERENCES Platforms(id)
        );
      `,
        },
        {
            name: 'SuggestedComments',
            query: `
        CREATE TABLE IF NOT EXISTS SuggestedComments (
          id INT PRIMARY KEY AUTO_INCREMENT,
          language VARCHAR(2),
          content TEXT,
          mission_id INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (mission_id) REFERENCES Missions(id)
        );
      `,
        },
        {
            name: 'Blogs',
            query: `
        CREATE TABLE IF NOT EXISTS Blogs (
          id INT PRIMARY KEY AUTO_INCREMENT,
          content TEXT,
          title VARCHAR(255),
          image_URL VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `,
        },
        {
            name: 'Comments',
            query: `
        CREATE TABLE IF NOT EXISTS Comments (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT,
          mission_id INT NULL,
          blog_id INT NULL,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES Users(id),
          FOREIGN KEY (mission_id) REFERENCES Missions(id),
          FOREIGN KEY (blog_id) REFERENCES Blogs(id)
        );
      `,
        },
        {
            name: 'Actions',
            query: `
        CREATE TABLE IF NOT EXISTS Actions (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255),
          platform_id INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (platform_id) REFERENCES Platforms(id)

        );
      `,
        },
        {
            name: 'InvitationCodes',
            query: `
        CREATE TABLE IF NOT EXISTS InvitationCodes (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT,
          code VARCHAR(255),
          used_at DATETIME,
          is_used BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES Users(id)
        );
      `,
        },
    ];

    for (const table of tables) {
        await conn.execute(table.query);
        console.log(`${table.name} table created`);
    }

    await conn.end();
};

export default createTables;
