-- Bộ đếm sự kiện game theo ngày (giờ Việt Nam). Chỉ số tổng hợp: không cookie, không IP, không user-agent, không ID người chơi.
CREATE TABLE IF NOT EXISTS ev_daily (
  day TEXT NOT NULL,            -- YYYY-MM-DD theo Asia/Ho_Chi_Minh
  e   TEXT NOT NULL,            -- start | finish | zalo | replay
  p   TEXT NOT NULL DEFAULT '', -- sgp | gp | '' (không rõ)
  n   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, e, p)
);
