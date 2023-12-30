DROP TABLE courses;

-- 강의 테이블 생성
CREATE TABLE courses (
    course_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(255) NOT NULL,
    content VARCHAR(1024) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attach_file_path VARCHAR(256),
    attach_file_name VARCHAR(256),
    CONSTRAINT courses_pk_course_id PRIMARY KEY(course_id),
    CONSTRAINT courses_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
) -- courses 테이블에 데이터 삽입 (user_id가 15인 사용자를 기준으로)
INSERT INTO
    courses (
        title,
        category,
        content,
        user_id,
        attach_file_path,
        attach_file_name
    )
VALUES
    (
        '강의 제목',
        '강의 카테고리',
        '강의 내용',
        15,
        '/path/to/attach/file',
        'attach_file_name'
    );

-- 강의 댓글 테이블 생성
CREATE Table comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    course_id INT,
    user_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(1024) NOT NULL,
    CONSTRAINT comments_pk_comment_id PRIMARY KEY(comment_id),
    CONSTRAINT comments_course_id_fk FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT comments_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
) -- course_comments 테이블에 데이터 삽입 (course_id가 1, user_id가 15인 사용자를 기준으로)
INSERT INTO
    comments (course_id, user_id, content)
VALUES
    (1, 19, '강의 댓글 테스트!!');

-- 강의 즐겨찾기 테이블 생성
CREATE Table bookmark (
    bookmark_id INT NOT NULL AUTO_INCREMENT,
    course_id INT,
    user_id INT,
    status tinyint(1) NOT NULL,
    CONSTRAINT bookmark_pk_bookmark_id PRIMARY KEY(bookmark_id),
    CONSTRAINT bookmark_course_id_fk FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CONSTRAINT bookmark_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
)
ALTER TABLE
    bookmark
MODIFY
    status BOOLEAN NOT NULL;

ALTER TABLE
    courses
ADD
    COLUMN bookmark_count INT DEFAULT 0;

SELECT
    *
FROM
    bookmark;

SELECT
    courses.*
FROM
    bookmarks
    JOIN courses ON bookmarks.course_id = courses.course_id
WHERE
    bookmarks.user_id = 15;

INSERT INTO
    bookmark (user_id, course_id, status)
VALUES
    (15, 1, 1);

--제헌
-- 유저테이블 생성
-- Active: 1703034513814@@34.64.245.68@3306@learningmate
-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     email_code VARCHAR(20),
--     phone_number VARCHAR(50) NOT NULL UNIQUE,
--     password_hash VARCHAR(255) NOT NULL,
--     nickname VARCHAR(40) NOT NULL UNIQUE,
--     signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     profile_name VARCHAR(255),
--     profile_link VARCHAR(255),
-- );
-- ALTER TABLE
--     users
-- ADD
--     UNIQUE (email);
-- ;
-- select @@global.time_zone, @@session.time_zone;
--
--유저테이블 조회
-- SELECT
--     *
-- FROM
--     users