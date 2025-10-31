import type { Route } from "./+types/home";
import { MiniDrawer } from "~/components/khoi/Drawer";

import * as React from "react";
import stylesHref from "../styles/home.css?url";
import { NavLink } from "react-router";
import DriverDashboard from "~/components/DriverDashboard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bus Smart 1.0" },
    { name: "description", content: "Welcome to Bus Smart 1.0!" },
  ];
}

export const links = () => [{ rel: "stylesheet", href: stylesHref }];

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const year = new Date().getFullYear();

  const scrollToFeatures = React.useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header>
        <div className="container nav">
          {/* <a className="brand" href="#">
            <span className="brand-logo">◎</span>
            <span>Bus Smart 1.0</span>
          </a> */}
          <a className="brand" href="#">
            <img
              src="/buslogo.ico"
              alt="Bus Smart Logo"
              className="brand-logo"
              style={{ width: "28px", height: "28px", borderRadius: "6px" }}
            />
            <span>Bus Smart 1.0.0</span>
          </a>

          <nav aria-label="Primary">
            <ul>
              <li><a href="#features">Tính năng</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#contact">Liên hệ</a></li>
            </ul>
          </nav>

          <button
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            Menu ▾
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="container" style={{ padding: ".5rem 1rem 1rem" }}>
            <nav aria-label="Mobile">
              <a href="#features" style={{ display: "block", padding: ".5rem 0" }}>Features</a>
              <a href="#about" style={{ display: "block", padding: ".5rem 0" }}>About</a>
              <a href="#contact" style={{ display: "block", padding: ".5rem 0" }}>Contact</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="hero container">
          <h1>Bus Smart 1.0</h1>
          <h1>Bằng Nguyễn, Vũ, Phúc Khôi - Group 06</h1>
          <p>
            A Bus smart web app.
          </p>
          <button className="cta" onClick={scrollToFeatures}>
            Dùng thử →
          </button>
          <h1><br />Chọn vai trò của bạn</h1>
        </section>

        <section id="features" className="container">
          <div className="grid">
            <button className="card card-select">
              <h3>Học sinh / Phụ huynh</h3>
              <p className="muted">
                Theo dõi lịch trình xe, vị trí xe theo thời gian thực và nhận thông báo an toàn.
              </p>
            </button>

            <button className="card card-select">
              <NavLink to="/TaiXe" end>
                <h3>Tài xế</h3>
                <p className="muted">
                  Nhận lộ trình hằng ngày, quản lý điểm đón trả và cập nhật trạng thái chuyến đi.
                </p>
              </NavLink>
            </button>

            <button className="card card-select">
              <h3>Quản lý</h3>
              <p className="muted">
                Quản lý tuyến xe, tài xế, học sinh và giám sát hoạt động vận hành.
              </p>
            </button>
          </div>
        </section>

        <DriverDashboard />

        <section id="about" className="container">
          <h2><b><br />About</b></h2>
          <p className="muted">
            <b>Smart Bus Web App giúp kết nối học sinh, phụ huynh, tài xế và nhà trường trong một hệ thống quản lý xe buýt thông minh.</b>
            <br />
            Theo dõi lộ trình theo thời gian thực, đảm bảo an toàn và tối ưu vận hành dễ dàng trên một nền tảng duy nhất.
          </p>
        </section>

        <section id="contact" className="container">
          <h2><b>Contact</b></h2>
          <p className="muted">
            Liên hệ nhóm 6 qua link dưới
          </p>
          <p>
            <a href="mailto:you@example.com" className="cta" style={{ display: "inline-flex", textDecoration: "none" }}>
              Email me
            </a>
          </p>
        </section>
      </main>

      <footer>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <small className="muted">© <span>{year}</span> Bus Smart. All rights reserved, Bancie.</small>
          <div style={{ display: "flex", gap: ".75rem" }}>
            <a href="#" aria-label="Twitter">Facebook</a>
            <span aria-hidden>·</span>
            <a href="#" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}
