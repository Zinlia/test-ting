"use client"

import React, {useEffect, useState, useRef} from 'react';

// * Import CSS file, you can use CSS module if you want
// ! Change your CSS inside this file
import styles from './page.module.css'

interface Kols {
	KolID: number;
	UserProfileID: number;
	Language: string;
	Education: string;
	ExpectedSalary: number;
	ExpectedSalaryEnable: boolean;
	ChannelSettingTypeID: number;
	IDFrontURL: string;
	IDBackURL: string;
	PortraitURL: string;
	RewardID: number;
	PaymentMethodID: number;
	TestimonialsID: number;
	VerificationStatus: boolean;
	Enabled: boolean;
	ActiveDate: Date;
	Active: boolean;
	CreatedBy: string;
	CreatedDate: Date;
	ModifiedBy: string;
	ModifiedDate: Date;
	IsRemove: boolean;
	IsOnBoarding: boolean;
	Code: string;
	PortraitRightURL: string;
	PortraitLeftURL: string;
	LivenessStatus: boolean;
}

const Page = () => {
  const [kols, setKols] = useState<Kols[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:8081/kols?pageIndex=1&pageSize=100')
      .then(r => {
        if(!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json()
      })
      .then(d => { 
        setKols(d.KolInformation ?? []);
        setTotal(d.totalCount);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const scroll = (dir: 'left' | 'right') =>
    listRef.current?.scrollBy({ left: dir === 'left' ? -440 : 440, behavior: 'smooth' });

    return (
        <div className={styles.wrap}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.header}>KOL List</h1>
          <p className={styles.sub}>{total} KOLs total</p>
        </div>
        <div className={styles.btns}>
          <button className={styles.btn} onClick={() => scroll('left')}>&#8592;</button>
          <button className={styles.btn} onClick={() => scroll('right')}>&#8594;</button>
        </div>
      </div>

      <div className={styles.list} ref={listRef}>
        
        {/* Fetching Error */}
        {error && <p className={styles.error}>Failed to load: {error}</p>}
        {/* No Data */}
        {kols.length === 0 && <p className={styles.empty}>No KOLs found.</p>}
        
        {!error && kols.map(k => (
          <div className={styles.card} key={k.KolID}>

            {/* Avatar */}
            <div className={styles.avatar}>{k.Code.slice(-3)}</div>

            {/* Badges */}
            <div className={styles.badges}>
              <span className={styles.bLang}>{k.Language.toUpperCase()}</span>
              <span className={k.VerificationStatus ? styles.bVerified : styles.bPending}>
                {k.VerificationStatus}
              </span>
              <span className={k.LivenessStatus ? styles.bPassed : styles.bFailed}>
                {k.LivenessStatus}
              </span>
              {k.Enabled    && <span className={styles.bEnabled}>Enabled</span>}
              {k.Active     && <span className={styles.bActive}>Active</span>}
              {k.IsOnBoarding && <span className={styles.bOnboard}>Onboarding</span>}
              {k.IsRemove   && <span className={styles.bRemoved}>Removed</span>}
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Info rows */}
            <div className={styles.rows}>
              <div className={styles.row}><span className={styles.label}>Code</span><span>{k.Code}</span></div>
              <div className={styles.row}><span className={styles.label}>KOL ID</span><span>{k.KolID}</span></div>
              <div className={styles.row}><span className={styles.label}>Profile ID</span><span>{k.UserProfileID}</span></div>
              <div className={styles.row}><span className={styles.label}>Language</span><span>{k.Language}</span></div>
              <div className={styles.row}><span className={styles.label}>Education</span><span className={styles.ellipsis} title={k.Education}>{k.Education}</span></div>
              <div className={styles.row}><span className={styles.label}>Salary</span>
                <span>{k.ExpectedSalaryEnable ? `$${k.ExpectedSalary.toLocaleString()}` : 'Not disclosed'}</span>
              </div>
              <div className={styles.row}><span className={styles.label}>Channel ID</span><span>{k.ChannelSettingTypeID}</span></div>
              <div className={styles.row}><span className={styles.label}>Reward ID</span><span>{k.RewardID}</span></div>
              <div className={styles.row}><span className={styles.label}>Payment ID</span><span>{k.PaymentMethodID}</span></div>
              <div className={styles.row}><span className={styles.label}>Testimonial ID</span><span>{k.TestimonialsID}</span></div>
              <div className={styles.row}><span className={styles.label}>Active Date</span><span>{new Date(k.ActiveDate).toLocaleDateString()}</span></div>
              <div className={styles.row}><span className={styles.label}>Created By</span><span>{k.CreatedBy}</span></div>
              <div className={styles.row}><span className={styles.label}>Created</span><span>{new Date(k.CreatedDate).toLocaleDateString()}</span></div>
              <div className={styles.row}><span className={styles.label}>Modified By</span><span>{k.ModifiedBy}</span></div>
              <div className={styles.row}><span className={styles.label}>Modified</span><span>{new Date(k.ModifiedDate).toLocaleDateString()}</span></div>
            </div>

            {/* Portrait URLs */}
            <div className={styles.divider} />
            <div className={styles.rows}>
              <div className={styles.row}><span className={styles.label}>Portrait</span>
                <a className={styles.link} href={k.PortraitURL} target="_blank" rel="noreferrer">View</a>
              </div>
              <div className={styles.row}><span className={styles.label}>ID Front</span>
                <a className={styles.link} href={k.IDFrontURL} target="_blank" rel="noreferrer">View</a>
              </div>
              <div className={styles.row}><span className={styles.label}>ID Back</span>
                <a className={styles.link} href={k.IDBackURL} target="_blank" rel="noreferrer">View</a>
              </div>
              <div className={styles.row}><span className={styles.label}>Portrait R</span>
                <a className={styles.link} href={k.PortraitRightURL} target="_blank" rel="noreferrer">View</a>
              </div>
              <div className={styles.row}><span className={styles.label}>Portrait L</span>
                <a className={styles.link} href={k.PortraitLeftURL} target="_blank" rel="noreferrer">View</a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;