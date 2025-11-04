import * as React from 'react';
import GoogleMapCard from '../components/GoogleMap';

type Stop = {
  id: number;
  name: string;
  eta: string;
  status: 'upcoming' | 'arrived' | 'missed';
};

const upcomingStops: Stop[] = [
  { id: 1, name: 'Cổng chính Trường Đại học Sài Gòn', eta: '07:05', status: 'arrived' },
  { id: 2, name: 'Ngã tư Lê Lợi', eta: '07:15', status: 'upcoming' },
  { id: 3, name: 'Cổng chính Trường Đại học Sài Gòn Cơ sở 2', eta: '07:25', status: 'upcoming' },
  { id: 4, name: 'Cổng chính Trường Đại học Sài Gòn Cơ sở 1', eta: '07:32', status: 'missed' },
];

export default function DriverDashboard() {
  const [doorLocked, setDoorLocked] = React.useState(true);
  const [attendanceChecked, setAttendanceChecked] = React.useState(false);

  const completedStops = upcomingStops.filter((stop) => stop.status === 'arrived').length;
  const totalStops = upcomingStops.length;

  return (
    <section className="driver-dashboard container">
      <header className="driver-header">
        <div>
          <p className="muted">Tuyến 06 • Bus Smart</p>
          <h2>Tài xế Trần Hữu Nghĩa</h2>
          <p>Xe 51F-123.45 • Lộ trình sáng • 12 học sinh trên xe</p>
        </div>
        <div className="driver-header__status">
          <span>Bắt đầu chuyến lúc</span>
          <strong>06:45</strong>
          <button type="button" className="cta secondary">
            Cập nhật trạng thái
          </button>
        </div>
      </header>

      <div className="driver-grid">
        <article className="driver-card">
          <h3>Tiến độ chuyến đi</h3>
          <p className="driver-progress__summary">
            {completedStops} / {totalStops} điểm đón đã hoàn thành
          </p>
          <div className="driver-progress__bar" aria-hidden>
            <div
              className="driver-progress__indicator"
              style={{ width: `${(completedStops / totalStops) * 100}%` }}
            />
          </div>
          <ul className="driver-stats">
            <li>
              <span className="muted">Thời gian còn lại</span>
              <strong>25 phút</strong>
            </li>
            <li>
              <span className="muted">Khoảng cách</span>
              <strong>8.5 km</strong>
            </li>
            <li>
              <span className="muted">Điểm đến tiếp theo</span>
              <strong>Ngã tư Lê Lợi</strong>
            </li>
          </ul>
        </article>

        <article className="driver-card">
          <h3>Điểm dừng sắp tới</h3>
          <ul className="driver-stops">
            {upcomingStops.map((stop) => (
              <li key={stop.id} data-status={stop.status}>
                <div>
                  <strong>{stop.name}</strong>
                  <span className="muted"> - {stop.eta}</span>
                </div>
                <span className="driver-stops__badge">
                  {stop.status === 'arrived' && 'Đã đón'}
                  {stop.status === 'upcoming' && 'Sắp tới'}
                  {stop.status === 'missed' && 'Chưa đến'}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="driver-card driver-card--actions">
          <h3>Thao tác nhanh</h3>
          <div className="driver-actions">
            <button
              type="button"
              className="driver-action"
              onClick={() => setDoorLocked((prev) => !prev)}
            >
              <span>{doorLocked ? '🔒' : '🔓'}</span>
              <div>
                <strong>Cửa xe </strong>
                <span className="muted">{doorLocked ? 'Đã khóa' : 'Đang mở'}</span>
              </div>
            </button>
            <button
              type="button"
              className="driver-action"
              onClick={() => setAttendanceChecked((prev) => !prev)}
            >
              <span>{attendanceChecked ? '✅' : '📝'}</span>
              <div>
                <strong>Điểm danh </strong>
                <span className="muted">
                  {attendanceChecked ? 'Đã hoàn thành' : 'Chưa thực hiện'}
                </span>
              </div>
            </button>
            <button type="button" className="driver-action">
              <span>📡</span>
              <div>
                <strong>Báo sự cố</strong>
                <span className="muted"> Thông báo ngay cho điều phối</span>
              </div>
            </button>
          </div>
        </article>

        <article className="driver-card driver-card--timeline">
          <h3>Nhật ký chuyến đi</h3>
          <ul>
            <li>
              <span className="timeline-dot timeline-dot--success" aria-hidden />
              <div>
                <strong>06:45</strong>
                <span className="muted"> Khởi hành tại bãi xe</span>
              </div>
            </li>
            <li>
              <span className="timeline-dot timeline-dot--success" aria-hidden />
              <div>
                <strong>07:05</strong>
                <span className="muted"> Đón học sinh tại 95 Trần Hưng Đạo</span>
              </div>
            </li>
            <li>
              <span className="timeline-dot timeline-dot--pending" aria-hidden />
              <div>
                <strong>07:15</strong>
                <span className="muted"> Đang di chuyển tới Ngã tư Lê Lợi</span>
              </div>
            </li>
          </ul>
        </article>
        <article className="driver-card driver-card--map">
          <GoogleMapCard
            title="Bản đồ chuyến đi"
            center={{ lat: 10.7862, lng: 106.695 }}
            zoom={14}
            height={420}
          />
        </article>
      </div>
    </section>
  );
}
