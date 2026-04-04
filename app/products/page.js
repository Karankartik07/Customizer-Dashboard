"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FiMoreHorizontal, FiX, FiSettings, FiDatabase, FiImage, FiCheckCircle, FiMaximize2, FiChevronLeft, FiChevronRight, FiDownload, FiSliders } from "react-icons/fi";

const C = { wine:"#6d0f1f", dark:"#4d0a15", muted:"#7a5a64", cream:"#fdf8f4", bg:"#fdf3f3", border:"#f1d6d6", gray:"#e5e7eb", white:"#ffffff" };

/* ── Toggle ── */
const Toggle = ({ on, onChange }) => (
  <button onClick={onChange} role="switch" aria-checked={on}
    style={{ position:"relative", width:40, height:22, borderRadius:999, border:"none", cursor:"pointer", background:on?C.wine:C.gray, flexShrink:0, padding:0, transition:"background .25s" }}>
    <span style={{ position:"absolute", top:3, left:on?"calc(100% - 19px)":3, width:16, height:16, borderRadius:"50%", background:C.white, boxShadow:"0 1px 3px rgba(0,0,0,.2)", transition:"left .25s", display:"block" }} />
  </button>
);

/* ── Thumb placeholder ── */
const Thumb = () => (
  <div style={{ width:52, height:52, borderRadius:14, background:"#f4ebe8", border:`1px solid ${C.border}`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#e8d5cf"/>
      <circle cx="8.5" cy="8.5" r="2.5" fill="#c9a89e"/>
      <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#c9a89e" strokeWidth="1.5" fill="none"/>
    </svg>
  </div>
);

/* ── IconBtn ── */
const IconBtn = ({ children, onClick, style: s = {} }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width:34, height:34, borderRadius:10, border:`1px solid ${C.border}`, background:h?C.bg:C.cream, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.muted, ...s }}>
      {children}
    </button>
  );
};

/* ── MenuItem — own component so hooks are legal ── */
const MenuItem = ({ icon, label, onClick }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", border:"none", padding:"10px 16px", cursor:"pointer", fontSize:11, fontWeight:700, color:C.wine, background:h?C.cream:"transparent", transition:"background .15s" }}>
      <span style={{ opacity:.65, display:"flex" }}>{icon}</span>{label}
    </button>
  );
};

/* ── PageBtn ── */
const PageBtn = ({ children, active, onClick }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ minWidth:34, height:34, borderRadius:10, border:active?"none":`1px solid ${C.border}`, background:active?C.wine:h?C.bg:C.cream, color:active?C.white:C.muted, fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", padding:"0 4px", transition:"all .15s" }}>
      {children}
    </button>
  );
};

/* ══════════════════════════════════════════ */
export default function ProductsPage() {
  const [menu,  setMenu]  = useState(null);
  const [modal, setModal] = useState(false);
  const [type,  setType]  = useState("2D");
  const [page,  setPage]  = useState(1);
  const menuRef = useRef(null);
  const router = useRouter(); // Initialize router

  const [opts, setOpts] = useState({ aiEditor:true, imageEdit:true, textEdit:true, colors:false, clipart:false });
  const [rows, setRows] = useState([
    { id:"01", name:"Midnight Velvet Blazer",    sub:"BESPOKE COLLECTION", sku:"AT-MVB-2024-X", on:true  },
    { id:"02", name:"Oxford Wool Trousers",       sub:"DAILY LUXURY",       sku:"AT-OWT-1888-M", on:true  },
    { id:"03", name:"Hand-Stitched Brogues",      sub:"FOOTWEAR ARTISAN",   sku:"AT-HSB-4491-L", on:false },
    { id:"04", name:"Silk Paisley Pocket Square", sub:"ACCESSORIES",        sku:"AT-PPS-0092-U", on:true  },
  ]);

  useEffect(() => {
    const h = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggleRow = id => setRows(p => p.map(r => r.id === id ? { ...r, on: !r.on } : r));
  const toggleOpt = key => setOpts(p => ({ ...p, [key]: !p[key] }));

  const TH = ({ ch, align = "left", pl = 14 }) => (
    <th style={{ fontSize:10, fontWeight:700, color:C.muted, opacity:.4, letterSpacing:"0.14em", textTransform:"uppercase", padding:`0 14px 14px`, paddingLeft:pl, textAlign:align, whiteSpace:"nowrap" }}>{ch}</th>
  );

  const toggleOpts = [
    { key:"aiEditor", label:"AI Editor" }, { key:"imageEdit", label:"Image Edit" },
    { key:"textEdit", label:"Text Edit" }, { key:"colors",    label:"Colors"     },
    { key:"clipart",  label:"Clipart"   },
  ];

  return (
    <div style={{ background:C.cream, minHeight:"100vh",  boxSizing:"border-box" }}>

      {/* HEADER */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
        <div>
          <h2 style={{ margin:0, fontSize:"clamp(18px,3vw,22px)", fontWeight:700, color:C.wine }}>Products List</h2>
          <p style={{ margin:"6px 0 0", fontSize:13, color:C.muted, fontWeight:500, opacity:.8 }}>Manage and create your bespoke inventory collections.</p>
        </div>
        <div style={{ display:"flex", background:C.cream, padding:5, borderRadius:999, border:`1px solid ${C.border}`, gap:2 }}>
          {["2D MODEL","3D MODELS"].map(lbl => {
            const val = lbl === "2D MODEL" ? "2D" : "3D", active = type === val;
            return (
              <button key={lbl} onClick={() => setType(val)}
                style={{ padding:"7px clamp(12px,2vw,20px)", fontSize:10, fontWeight:700, letterSpacing:"0.12em", borderRadius:999, cursor:"pointer", transition:"all .2s", background:active?C.white:"transparent", border:active?`1px solid ${C.border}`:"1px solid transparent", color:active?C.wine:C.muted, boxShadow:active?"0 1px 4px rgba(109,15,31,.1)":"none" }}>
                {lbl}
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLE CARD */}
      <div style={{ background:C.white, borderRadius:28, border:`1px solid ${C.bg}`, boxShadow:"0 1px 8px rgba(109,15,31,.04)", overflow:"hidden" }}>

        {/* toolbar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 24px 14px", borderBottom:`1px solid ${C.bg}`, flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:17, height:17, borderRadius:4, border:`2px solid ${C.border}` }} />
            <span style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase" }}>Bulk Select</span>
            <span style={{ fontSize:11, color:C.muted, opacity:.5, marginLeft:6 }}>Showing 15 of 36 products</span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <IconBtn><FiSliders size={14}/></IconBtn>
            <IconBtn><FiDownload size={14}/></IconBtn>
          </div>
        </div>

        {/* table */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:560 }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${C.bg}` }}>
                <TH ch="S.No" pl={28}/><TH ch="Image"/><TH ch="Product Name"/><TH ch="SKU"/><TH ch="Status" align="center"/><TH ch="Actions" align="right"/>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} style={{ borderBottom:i<rows.length-1?`1px solid ${C.bg}`:"none" }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(253,248,244,.45)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"18px 14px 18px 28px", fontSize:13, fontWeight:600, color:C.muted, opacity:.35 }}>{r.id}</td>
                  <td style={{ padding:"18px 14px" }}><Thumb /></td>
                  <td style={{ padding:"18px 14px" }}>
                    <p style={{ margin:0, fontSize:14, fontWeight:700, color:C.wine }}>{r.name}</p>
                    <p style={{ margin:"7px 0 0", fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.12em", opacity:.5 }}>{r.sub}</p>
                  </td>
                  <td style={{ padding:"18px 14px" }}>
                    <span style={{ background:C.cream, border:`1px solid ${C.border}`, borderRadius:7, padding:"4px 9px", fontSize:10, fontWeight:700, color:C.muted, whiteSpace:"nowrap" }}>{r.sku}</span>
                  </td>
                  <td style={{ padding:"18px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                      <Toggle on={r.on} onChange={() => toggleRow(r.id)} />
                      <span style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", minWidth:38 }}>{r.on?"Unhide":"Hide"}</span>
                    </div>
                  </td>
                  <td style={{ padding:"18px 28px 18px 14px", textAlign:"right", position:"relative" }}>
                    <button onClick={() => setMenu(menu === r.id ? null : r.id)}
                      style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted, padding:6, borderRadius:8, display:"inline-flex", alignItems:"center" }}>
                      <FiMoreHorizontal size={20}/>
                    </button>
                    {menu === r.id && (
                      <div ref={menuRef} style={{ position:"absolute", right:52, top:12, zIndex:200, background:C.white, border:`1px solid ${C.border}`, borderRadius:18, boxShadow:"0 8px 32px rgba(109,15,31,.13)", padding:"6px 0", minWidth:186 }}>
                        <MenuItem icon={<FiSettings size={13}/>}  label="Edit Tab Settings" onClick={() => { setModal(true); setMenu(null); }} />
<MenuItem 
      icon={<FiDatabase size={13}/>}  
      label="Customize Data"    
      onClick={() => {
        setMenu(null);
        // Navigates to: /products/[productId]
        // This will open your productId/page.js (The Variant Cards)
        router.push(`/products/${r.id}`); 
      }} 
    />
                       <MenuItem icon={<FiImage size={13}/>}     label="Customize Image"   onClick={() => setMenu(null)} />
                        <MenuItem icon={<FiMaximize2 size={13}/>} label="Set Width & Height" onClick={() => setMenu(null)} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 28px", borderTop:`1px solid ${C.bg}`, flexWrap:"wrap", gap:12 }}>
          <span style={{ fontSize:12, color:C.muted, fontWeight:500 }}>Showing <b style={{ color:C.wine }}>1–4</b> of <b style={{ color:C.wine }}>128</b> products</span>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <PageBtn onClick={() => setPage(p => Math.max(1, p-1))}><FiChevronLeft size={14}/></PageBtn>
            {[1,2,3,"…",12].map((p,i) => (
              <PageBtn key={i} active={p === page} onClick={() => typeof p === "number" && setPage(p)}>{p}</PageBtn>
            ))}
            <PageBtn onClick={() => setPage(p => Math.min(12, p+1))}><FiChevronRight size={14}/></PageBtn>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(false)}
          style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(92,23,40,.10)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"clamp(12px,4vw,32px)" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:C.white, borderRadius:24, border:`1px solid ${C.border}`, boxShadow:"0 24px 64px rgba(109,15,31,.16)", padding:"clamp(24px,5vw,36px)", width:"100%", maxWidth:500, position:"relative", boxSizing:"border-box" }}>

            <button onClick={() => setModal(false)}
              style={{ position:"absolute", top:24, right:24, background:"transparent", border:"none", cursor:"pointer", color:C.muted, display:"flex" }}>
              <FiX size={22}/>
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:C.bg, color:C.wine, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FiSettings size={17}/></div>
              <h3 style={{ margin:0, fontSize:"clamp(15px,3vw,18px)", fontWeight:700, color:C.wine }}>Edit Product Settings</h3>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
              <span style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.18em", textTransform:"uppercase", opacity:.6 }}>Product Type</span>
              <div style={{ display:"flex", background:"rgba(244,235,232,.5)", padding:4, borderRadius:14, border:"1px solid rgba(241,214,214,.5)", gap:2 }}>
                {["2D","3D"].map(t => {
                  const active = type === t;
                  return (
                    <button key={t} onClick={() => setType(t)}
                      style={{ padding:"8px clamp(16px,3vw,26px)", fontSize:11, fontWeight:800, borderRadius:11, border:"none", cursor:"pointer", transition:"all .2s", background:active?C.wine:"transparent", color:active?C.white:C.muted, boxShadow:active?"0 2px 8px rgba(109,15,31,.22)":"none" }}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* toggle rows: toggle LEFT, label RIGHT */}
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:28 }}>
              {toggleOpts.map(({ key, label }) => {
                const on = opts[key];
                return (
                  <div key={key} onClick={() => toggleOpt(key)}
                    style={{ display:"flex", alignItems:"center", gap:14, background:on?"rgba(253,248,244,.9)":"rgba(253,248,244,.4)", border:`1px solid ${on?"rgba(241,214,214,.7)":"rgba(241,214,214,.25)"}`, borderRadius:14, padding:"14px 18px", cursor:"pointer", transition:"all .2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = C.cream}
                    onMouseLeave={e => e.currentTarget.style.background = on ? "rgba(253,248,244,.9)" : "rgba(253,248,244,.4)"}>
                    <Toggle on={on} onChange={e => { e?.stopPropagation?.(); toggleOpt(key); }} />
                    <span style={{ fontSize:12, fontWeight:800, color:on?C.wine:C.muted, opacity:on?1:.5 }}>{label}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={() => setModal(false)}
              onMouseEnter={e => e.currentTarget.style.background = C.dark}
              onMouseLeave={e => e.currentTarget.style.background = C.wine}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              style={{ width:"100%", background:C.wine, color:C.white, border:"none", borderRadius:14, padding:"clamp(13px,2vw,16px) 24px", fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 8px 24px rgba(109,15,31,.25)", transition:"background .2s, transform .1s" }}>
              <FiCheckCircle size={16}/> Update Product Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}