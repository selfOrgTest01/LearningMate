const db = require('../src/database');

const sql = {
  participant: `SELECT
  cr.meet_id,
  cr.channel_id,
  mp.participant_id,
  u.nickname
FROM
  chat_room cr
JOIN
  meet_participants mp ON cr.meet_id = mp.meet_id
JOIN
  users u ON mp.user_id = u.user_id
WHERE
  cr.meet_id = 19
  AND mp.status = 1
  AND mp.manager = 1;`, // 모임에 참여 승인 받은 사람들

  chatRoom: `
  JOIN
    meet_participants mp ON cr.meet_id = mp.meet_id
  JOIN
    chat_history ch ON cr.channel_id = ch.channel_id
  JOIN
    users u ON mp.user_id = u.user_id
  WHERE
    mp.manager = TRUE
    AND mp.status = TRUE
    AND cr.description = '공지사항'
  ORDER BY
    ch.sent_time;`    // meet_id별로 입장하면 보여질 내용
};
