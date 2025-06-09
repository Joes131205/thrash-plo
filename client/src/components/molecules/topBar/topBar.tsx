import React from "react";

type User = {
  name: string;
  role: string;
  avatar: string;
};

type TopbarProps = {
  user: User;
  hamburgerIcon: string;
  onToggleSidebar: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ user, hamburgerIcon, onToggleSidebar }) => {
  return (
    <>
      <style>
        {`
          .topbar-container {
            background-color: #ffffff;
            padding: 20px 30px;
            border: solid 1px #e3e3e3;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .topbar-hamburger {
            cursor: pointer;
          }

          .hamburger-icon {
            width: 22px;
          }

          .topbar-user {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            object-fit: cover;
            border-radius: 50%;
          }

          .user-name {
            font-size: 14px;
            font-weight: 600;
            color: #2e2e2e;
          }

          .user-role {
            font-size: 11px;
            font-weight: 400;
            color: #2e2e2e;
          }
        `}
      </style>

      <div className="topbar-container">
        <span className="topbar-hamburger" onClick={onToggleSidebar}>
          <img src={hamburgerIcon} alt="hamburger icon" className="hamburger-icon" />
        </span>

        <div className="topbar-user">
          <img src={user.avatar} alt="User" className="user-avatar" />
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
