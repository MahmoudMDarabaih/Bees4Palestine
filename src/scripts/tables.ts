import pool from '../config/pool';
const createTables = async () => {
  const conn = await pool;

  const tables = [
    {
      name: 'Users',
      query: `
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          invitation_code VARCHAR(36) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          DOB DATE,
          stars INTEGER DEFAULT 0,
          profile_image_url TEXT,
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
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name_en VARCHAR(255),
          name_ar VARCHAR(255),
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          image_URL TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `,
    },
    {
      name: 'Missions',
      query: `
        CREATE TABLE IF NOT EXISTS Missions (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          title JSON,
          mission_Link TEXT,
          description JSON,
          platform_id INTEGER,
          stars INTEGER,
          image_url TEXT,
          expires_at DATETIME,
          status ENUM('active', 'disabled', 'finished'),
          type ENUM('Strike', 'Support') NOT NULL,
          actions JSON,
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
          user_id INTEGER,
          mission_id INTEGER,
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
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER,   
          mission_url VARCHAR(255),
          title VARCHAR(255),
          platform_id INTEGER,
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
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          language VARCHAR(2),
          content TEXT,
          copy_count INTEGER,
          mission_id INTEGER,
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
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          content TEXT,
          title VARCHAR(255),
          comments JSON,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `,
    },
    {
      name: 'Comments',
      query: `
        CREATE TABLE IF NOT EXISTS Comments (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER,
          blog_id INTEGER NULL,
          mission_id INTEGER NULL,
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
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255),
          platform_id INTEGER,
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
           id INTEGER PRIMARY KEY AUTO_INCREMENT,
           created_by INTEGER,
           used_by INTEGER DEFAULT 0,
           code VARCHAR(36) UNIQUE,
           used_at DATETIME,
           is_used TINYINT(1) DEFAULT 0,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
  ];

  for (const table of tables) {
    await conn.execute(table.query);
    console.log(`${table.name} table created`);
  }

};

export default createTables;
