import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import LogoutButton from '../../Features/Authentication/Components/Logout';

const VexaLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <rect width="72" height="72" rx="14" fill="#111116" />
    <polygon points="13,17 27,17 36,44 45,17 59,17 36,57" fill="#e8a930" />
    <polygon points="31,31 36,44 41,31 36,37" fill="#111116" />
    <circle cx="36" cy="57" r="5" fill="#f0eee8" />
  </svg>
);

const icons = {
  inbox: (
    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  collections: (
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  ),
  graph: (
    <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><circle cx="12" cy="12" r="2" /><line x1="7" y1="12" x2="10" y2="12" /><line x1="13" y1="12" x2="17" y2="6" /><line x1="13" y1="12" x2="17" y2="18" /></svg>
  ),
  resurface: (
    <svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M4.22 6.22l2.83 2.83M16.95 16.95l2.83 2.83M3 12h4M17 12h4M6.22 17.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
  ),
};

const NAV = [
  { id: 'inbox', label: 'Inbox', icon: icons.inbox, path: '/app/inbox' },
  { id: 'collections', label: 'Collections', icon: icons.collections, path: '/app/collections' },
  { id: 'graph', label: 'Knowledge Graph', icon: icons.graph, path: '/app/knowledgeGraph' },
  { id: 'resurfacing', label: 'Resurfacing', icon: icons.resurface, path: '/app/resurfacing' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">

      <div className="sidebar__brand">
        <VexaLogo size={28} />
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">Vexa</span>
          <span className="sidebar__brand-sub">Workspace</span>
        </div>
      </div>

      <div className="sidebar__body">
        <div className="sidebar__section-label">Navigate</div>
        {NAV.map(item => (
          <div
            key={item.id}
            className={`sidebar__nav-item${location.pathname === item.path ? ' sidebar__nav-item--active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">V</div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">My Brain</span>
            <span className="sidebar__user-role">Personal</span>
          </div>
        </div>

        <LogoutButton />
      </div>

    </aside>
  );
};

export default Sidebar;
