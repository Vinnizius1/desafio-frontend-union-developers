import { useState } from 'react';
import { User } from '../../types/user';
import styles from './UserTabs.module.scss';

export type TabKey = 'info' | 'location' | 'login';

export interface UserTabsProps {
  user: User;
}

export function UserTabs({ user }: UserTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('info');

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return 'N/A';
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return isoDate;
    }
  };

  return (
    <div className={styles.tabsContainer}>
      {/* Tab List Header */}
      <div className={styles.tabList} role="tablist" aria-label="Informações do usuário">
        <button
          type="button"
          role="tab"
          id="tab-info"
          aria-selected={activeTab === 'info'}
          aria-controls="panel-info"
          className={`${styles.tabButton} ${activeTab === 'info' ? styles.active : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>

        <button
          type="button"
          role="tab"
          id="tab-location"
          aria-selected={activeTab === 'location'}
          aria-controls="panel-location"
          className={`${styles.tabButton} ${activeTab === 'location' ? styles.active : ''}`}
          onClick={() => setActiveTab('location')}
        >
          Location
        </button>

        <button
          type="button"
          role="tab"
          id="tab-login"
          aria-selected={activeTab === 'login'}
          aria-controls="panel-login"
          className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'info' && (
        <div
          id="panel-info"
          role="tabpanel"
          aria-labelledby="tab-info"
          className={styles.tabPanel}
        >
          <div className={styles.infoRow}>
            <label>First Name</label>
            <span>{user.name.first}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Last Name</label>
            <span>{user.name.last}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Title</label>
            <span>{user.name.title}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Date</label>
            <span>{formatDate(user.dob?.date)}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Age</label>
            <span>{user.dob?.age}</span>
          </div>
        </div>
      )}

      {activeTab === 'location' && (
        <div
          id="panel-location"
          role="tabpanel"
          aria-labelledby="tab-location"
          className={styles.tabPanel}
        >
          <div className={styles.infoRow}>
            <label>Street</label>
            <span>{user.location.street.name}, nº {user.location.street.number}</span>
          </div>

          <div className={styles.infoRow}>
            <label>City</label>
            <span>{user.location.city}</span>
          </div>

          <div className={styles.infoRow}>
            <label>State</label>
            <span>{user.location.state}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Country</label>
            <span>{user.location.country} ({user.nat})</span>
          </div>

          <div className={styles.infoRow}>
            <label>Postcode</label>
            <span>{String(user.location.postcode)}</span>
          </div>
        </div>
      )}

      {activeTab === 'login' && (
        <div
          id="panel-login"
          role="tabpanel"
          aria-labelledby="tab-login"
          className={styles.tabPanel}
        >
          <div className={styles.infoRow}>
            <label>Email</label>
            <span>{user.email}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Phone</label>
            <span>{user.phone}</span>
          </div>

          <div className={styles.infoRow}>
            <label>Cell</label>
            <span>{user.cell}</span>
          </div>

          <div className={styles.infoRow}>
            <label>ID Type / Value</label>
            <span>{user.id.name || 'ID'}: {user.id.value || 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
